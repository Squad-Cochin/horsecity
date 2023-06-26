//{ On the component that displays the homepage, 
// this component displays all destination images, along with descriptions, booking amounts, and more }

import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { Image } from "react-bootstrap";
// This component is designed for reusing buttons
import ButtonType from "../../elementComponents/Button/Button";
import Styles from "./ListingProbox.module.scss";

const ListingProbox = (props) => {
  console.log(props.boxData);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Retrieve wishlisted items from local storage, or set an empty array if no items are stored
    const storedData = JSON.parse(localStorage.getItem('wishlisted')) || [];
    // Retrieve cart items from local storage, or set an empty array if no items are stored
    const cartStore = JSON.parse(localStorage.getItem("cart")) || [];
    // Update the wishlist and cart states with the retrieved data
    props.setWishlist(storedData);
    props.setCart(cartStore);
    // eslint-disable-next-line
  }, []);

  const handleClick = (item) => {
    let storedData = JSON.parse(localStorage.getItem('wishlisted')) || [];
    if (storedData.includes(item.id)) {
      // Remove item from the wishlist if it is already included
      storedData = storedData.filter((id) => id !== item.id);
    } else {
      // Add item to the wishlist if it is not included
      storedData.push(item.id);
    }
    // Store the updated wishlist in local storage
    localStorage.setItem('wishlisted', JSON.stringify(storedData));
    // Update the wishlist state with the updated data
    props.setWishlist(storedData);
  }

  const addToCart = (item) => {
    let storedData = JSON.parse(localStorage.getItem('cart')) || []
    // Check if the item already exists in the cart
    const isItemExists = storedData.some((storedItem) => storedItem.id === item.id);
    console.log(isItemExists)
    if (isItemExists) {
      console.log("Item already exists in the cart.");
    } else {
      // Add the item to the cart
      if (Array.isArray(storedData)) {
        storedData.push(item);
        localStorage.setItem('cart', JSON.stringify(storedData));
      } else {
        // Create a new array with the item if the cart is not an array
        let array = [item];
        localStorage.setItem('cart', JSON.stringify(array));
      }
      // Update the cart state with the updated data
      props.setCart(storedData)
      console.log("Item added to the cart.");
    }
    // props.setCart(storedData)
  };

  return (
    <>
      {/* Iterate over each item in the boxData array */}
      {props.boxData[0].vehicle.map((item) => (
        <div className={Styles.list_probox} id={item.id} key={item.id}>
          <Row className="g-3">
            <Col className="d-flex align-items-center" lg={{ span: 3, order: 1 }} xs={{ span: 5, order: 1 }}>
              <div className={`position-relative ${Styles['imagebox']}`}>
                <Image src={!item.picture ? tempValue.picture : item.picture } className={Styles[`image`]} alt="Activity Image" />
                <span className={`${Styles.favourite_list} ${active === (true && item.id) ? Styles.activeFavouritelist : ""}`} onClick={() => { setActive(!active); handleClick(item); }}  data-testid="favorite-icon">
                  <svg
                    height="20px"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
                      fill={props.wishlist.includes(item.id) ? "red" : null}
                    />
                  </svg>
                </span>
              </div>
            </Col>
            <Col lg={{ span: 6, order: 2 }} xs={{ span: 12, order: 3 }}>
              <h2 className="header-type1">
                {!item.name ? tempValue.name : item.name}
              </h2>
              <div className={Styles.probox_type}>{!item.vehicleType ? tempValue.vehicleType : item.vehicleType}</div>
              <div className={Styles.probox_time}>{!item.company ? tempValue.company : item.company}</div>
              <div className={Styles.probox_text}>
              {!item.description ? tempValue.desc : item.description}
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
                <div className={Styles.price}>{!props.boxData[0].currency ? tempValue.currency : props.boxData[0].currency} {!item.price ? tempValue.price : item.price}</div>
                <div className={Styles.btn_bar}>
                  {/* Render the ButtonType component with the "Add to cart" text and the addToCart function as the onClick handler */}
                  <ButtonType className="btntype2" name={'Add to cart'} onClick={() => addToCart(item)} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </>
  );
};

const tempValue =
{
  currency : "AED",
  price : "NA",
  vehicleType : "Company",
  company : "Horse City Corporation",
  name : "Company Vehicle",
  picture : "https://www.123rf.com/photo_131224058_car-for-carrying-horses-funny-horse-transport-carriage-for-horses.html",
  desc : "Consequat qui ut nostrud anim ea quis veniam excepteur aute mollit adipisicing nulla tempor. In ipsum sit exercitation deserunt cillum excepteur. Occaecat irure reprehenderit consectetur id nisi do reprehenderit et sunt nisi qui mollit Lorem exercitation."
}

export default ListingProbox;

