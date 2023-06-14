// { This component displays the moonstride logo on the homepage ,so we can reuse this component }

import  { Container, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


import Styles from "./Header.module.scss";

const Header = () => { 
  return (
    <header className={Styles['topbar']}>
    
      <Container>
        <Link to={"/listing"}>

            {/* The logo image will be displayed here */}
            <Image src={process.env.PUBLIC_URL + '/images/icon-36x36.png'} alt="Moonstride Logo" />

        </Link>
      </Container>
    </header>
    
  );
};

export default Header;


// src={process.env.PUBLIC_URL + '/images/icon-36x36.png'}