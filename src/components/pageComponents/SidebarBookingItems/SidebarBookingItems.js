///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                           COMPONENT FOR SHOWING CART ITEMS                                //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { IoMdTrash } from "react-icons/io";
import Styles from "./SidebarBookingItems.module.scss";

// FUNCTION FOR CART COMPONENT
const SidebarBooking = (props) => {
    // Delete item from cart
    const deleteFromCart = (id) => {
        // Retrieve cart items from local storage or use an empty array if no items are stored
        let cartStore = JSON.parse(localStorage.getItem("cart")) || [];
        // Filter out the item with the given id from the cart
        if (Array.isArray(cartStore)) {
            cartStore = cartStore.filter((value, index) => value.id !== id);
            // Update the cart in local storage and the cart state variable using the provided setCart function
            localStorage.setItem('cart', JSON.stringify(cartStore));
            props.setCart(cartStore);
        }
    }

    const addProduct = async () => {
        // Add product to the cart (functionality not implemented, just an alert for demonstration)
        alert("add product")
    }

    const cartCount = props.cart.length;
    return (
        <aside>
            <div className={Styles.sidebar_booking_section}>
                <div className={Styles.sidebar_box}>
                    <h2 className={Styles.booking_title}>Your cart({cartCount})</h2>
                    {/* Render each item in the cart */}
                    {props.cart.map((item, index) => {
                        return (
                            <div className={Styles.booked_trip} key={item.id} data-testid="cart-item">
                                <h1 className={Styles.booking_product_title}>{item.name}</h1>
                                <div className={Styles.booking_details}>
                                    {/* Display item details */}
                                    <div className={Styles.Details_value}> <span> 1. Booking Type: {item.vehicleType} </span></div>
                                    <div className={Styles.Details_value}> <span> 2. Prize: AED {item.price}</span></div>
                                    <div className={Styles.Details_value}> <span> 3. Provider: {item.company}</span></div>
                                </div>
                                {/* Button to delete the item from the cart */}
                                <button className={Styles.trash} onClick={() => deleteFromCart(item.id)}    data-testid={`delete-button-${item.id}`} ><IoMdTrash /></button>
                            </div>
                        )
                    })}
                    {/* Button to confirm the cart */}
                    <button className={Styles.btntype1} onClick={addProduct}> Confirm</button>
                </div>
            </div>
        </aside>
    );
};

SidebarBooking.defaultProps = {
    cartData: []
}

export default SidebarBooking;

