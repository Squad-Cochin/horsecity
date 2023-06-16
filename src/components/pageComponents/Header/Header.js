// { This component displays the moonstride logo on the homepage ,so we can reuse this component }

import { useState ,useEffect} from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, Link, json } from "react-router-dom";
// import carticon from "../../../../public/images/carticon"

import Styles from "./Header.module.scss";

const Header = (props) => {
  // const [notificationCount, setNotificationCount] = useState(0);
  // const [wcount,setWcount] =useState("")
  // const [storedata,setStoredata] =useState("")
  // const [cartData, setCartData] =useState("")
  // const [cartCount, setCartCount] = useState("")
  //   useEffect(() => {
  //     const storedData = JSON.parse(localStorage.getItem('wishlisted')) || [];
  //     const cartStore = JSON.parse(localStorage.getItem("cart")) || [];
  //       setStoredata(storedData)
  //       setWcount(storedData.length)
  //       setCartData(cartStore)
  //       setCartCount(cartStore.length)
  //   },[]);
    const cartCount = props.cart.length
    console.log(cartCount);
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
      <p className="faviconCount">{wishlistCount}</p> 
      <Image src={process.env.PUBLIC_URL + "/images/carticon.svg"} alt="Cart Icon" width={"25px"} />
      <p className={`${Styles.cartCount}`}>{cartCount}</p> 
      </div>

  </Container> 
  </header>
  );
};

export default Header;


// src={process.env.PUBLIC_URL + '/images/icon-36x36.png'}