// { This component displays the moonstride logo on the homepage ,so we can reuse this component }


import { Container, Image } from "react-bootstrap";
import { Link, } from "react-router-dom";
// import carticon from "../../../../public/images/carticon"

import Styles from "./Header.module.scss";

const Header = (props) => {
  //Cart count
  const cartCount = props.cart.length
  //Wishlist count
  const wishlistCount = props.wishlist.length
  return (
    <header className={Styles["topbar"]}>
      <Container>

        <Link to={"/listing"}>
          {/* The logo image will be displayed here */}
          <Image src={process.env.PUBLIC_URL + "/images/icon-36x36.png"} alt="Moonstride Logo" />
        </Link>
        <div className={`${Styles.cartIcon}`}>
          <Image src={process.env.PUBLIC_URL + "/images/favourateicon.svg"} alt="favourate Icon" width={"25px"} />
         <b> <p className={Styles.faviconCount}  data-testid="wishlist-count">{wishlistCount}</p></b>
          <Image src={process.env.PUBLIC_URL + "/images/carticon.svg"} alt="Cart Icon" width={"25px"} />
          <b>  <p className={`${Styles.cartCount}`} data-testid="cart-count">{cartCount}</p></b>
        </div>

      </Container>
    </header>
  );
};

export default Header;


// src={process.env.PUBLIC_URL + '/images/icon-36x36.png'}