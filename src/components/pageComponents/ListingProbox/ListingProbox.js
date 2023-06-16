//{ On the component that displays the homepage, 
// this component displays all destination images, along with descriptions, booking amounts, and more }

import React, { useState ,useEffect} from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { Image } from "react-bootstrap";
// This component is designed for reusing buttons
import ButtonType from "../../elementComponents/Button/Button";

import Styles from "./ListingProbox.module.scss";

const ListingProbox = (props) => {
  const [active, setActive] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart,setCart] =useState([])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('wishlisted')) || [];
    setWishlist(storedData);
  }, []);


  const handleClick = (item) => {
   
      let storedData = JSON.parse(localStorage.getItem('wishlisted')) || [];
      if (storedData.includes(item.id)) {
        storedData = storedData.filter((id) => id !== item.id);
      } else {
        storedData.push(item.id);
      }

    localStorage.setItem('wishlisted', JSON.stringify(storedData));
    setWishlist(storedData);
  }

  const addToCart = (item) => {
    let storedData = JSON.parse(localStorage.getItem('cart')) || [];
  
    const isItemExists = storedData.some((storedItem) => storedItem.id === item.id);

    if (isItemExists) {
      console.log("Item already exists in the cart.");
    } else {
      if (Array.isArray(storedData)) {
        storedData.push(item);
        localStorage.setItem('cart', JSON.stringify(storedData));
      } else {
        let array = [item];
        localStorage.setItem('cart', JSON.stringify(array));
      }
      console.log("Item added to the cart.");
    }
  };
  
  
  return (
    <>

      {props.boxData[0].vehicle.map((item) => (
        <div className={Styles.list_probox} id={item.id} key={item.id}>
          <Row className="g-3">
            <Col className="d-flex align-items-center" lg={{ span: 3, order: 1 }} xs={{ span: 5, order: 1 }}>
              <div className={`position-relative ${Styles['imagebox']}`}>
                <Image src={item.picture} className={Styles[`image`]} alt="Activity Image" />
                <span className={`${Styles.favourite_list} ${active === (true && item.id) ? Styles.activeFavouritelist : ""}`} onClick={() => { setActive(!active); handleClick(item); }}   >
                  <svg
                    height="20px"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
             
                  >
                    <path
                      d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
                      fill={wishlist.includes(item.id) ? "red" : null}
                    />

                  </svg>
                </span>
              </div>
            </Col>
            <Col lg={{ span: 6, order: 2 }} xs={{ span: 12, order: 3 }}>
              <h2 className="header-type1">
                {item.name}
              </h2>
              <div className={Styles.probox_type}>{item.vehicleType}</div>
              <div className={Styles.probox_time}>{item.company}</div>
              <div className={Styles.probox_text}>
                {item.description}
              </div>

              <Link to={`/detail/${item.id}`}>
                <span className="link-type1">More details</span>
              </Link>
            </Col>
            <Col
              lg={{ span: 3, order: 3 }}
              xs={{ span: 7, order: 2 }}
              className="text-end"
            >
              <div className={Styles.price_section}>
        
                <div className={Styles.price}>{props.boxData[0].currency} {item.price}</div>

                <div className={Styles.btn_bar}>
                  <ButtonType className="btntype2" name={'Add to cart'} onClick={()=>addToCart(item)}  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )
      )}
    </>
  );
};

export default ListingProbox;
