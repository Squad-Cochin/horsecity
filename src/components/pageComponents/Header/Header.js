// { This component displays the moonstride logo on the homepage ,so we can reuse this component }

import { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
// import carticon from "../../../../public/images/carticon"

import Styles from "./Header.module.scss";

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
  <header className={Styles["topbar"]}>
  <Container>
    <Link to={"/listing"}>
      {/* The logo image will be displayed here */}
      <Image src={process.env.PUBLIC_URL + "/images/icon-36x36.png"} alt="Moonstride Logo" />
    </Link>
    <div className={`${Styles.cartIcon}`}>
      <Image src={process.env.PUBLIC_URL + "/images/favourateicon.svg"} alt="favourate Icon" width={"25px"} /> 
      <p className="faviconCount">{notificationCount}</p> 
      <Image src={process.env.PUBLIC_URL + "/images/carticon.svg"} alt="Cart Icon" width={"25px"} />
      <p className={`${Styles.cartCount}`}>{notificationCount}</p> 
    </div>
  </Container>
  </header>
  );
};

export default Header;


// src={process.env.PUBLIC_URL + '/images/icon-36x36.png'}