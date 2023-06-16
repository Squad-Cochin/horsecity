///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                           COMPONENT FOR SHOWING CART ITEMS                                //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { IoMdTrash } from "react-icons/io";
// import { AiFillCaretRight } from "react-icons/Ai";


// import loadingimage from "../../../../public/moonstride-loader.svg"
// import Image from "next/image";
// import { Image } from "react-bootstrap";
// *Slide bar css page 
import Styles from "./SidebarBookingItems.module.scss";

// IMPORT FUNCTION FOR API COMMUNNICATION
// import { pushCartData } from "../../../api/tourPackages"

// FUNCTION FOR CART COMPONENT
const SidebarBooking = (props) => {
    console.log("prop", props.cart);
    // const [cartLoader, setCartLoader] = useState(false);

    // FUNCTION FOR DELETE ITEM FROM CART
    const deleteFromCart = (id) => {
        let cartStore = JSON.parse(localStorage.getItem("cart")) || [];
        if (Array.isArray(cartStore)) {
            cartStore = cartStore.filter((value, index) => value.id !== id)
            localStorage.setItem('cart', JSON.stringify(cartStore));
            props.setCart(cartStore)
        }
    }

    const addProduct = async () => {
        // setCartLoader(true);
        // let searchData = JSON.parse(sessionStorage.getItem('searchdata')) || {};
        // const cartAdded =  await pushCartData(props.cartData , searchData);
        // if(cartAdded){
        //     sessionStorage.setItem('cart', JSON.stringify([]));
        //     props.setcartdata([])
        // }
        // setCartLoader(false);
        alert("add product")
    }

    // function Loader()
    // {
    //     return( 
    //         <aside>
    //             <div className={Styles.sidebar_booking_section}>
    //             <Image src="" width="250" height="250" alt="Loader Image"/>
    //             </div>
    //         </aside>

    //     )
    // }


    // if(cartLoader){
    //     return(
    //         <Loader></Loader>
    //     )
    // }
    // else{
    const cartCount = props.cart.length
    return (
        <aside>
            <div className={Styles.sidebar_booking_section}>
                <div className={Styles.sidebar_box}>
                    <h2 className={Styles.booking_title}>Your cart({cartCount})</h2>
                    {props.cart.map((item, index) => {
                        return (
                            <div className={Styles.booked_trip} key={item.id}>
                                <h1 className={Styles.booking_product_title}>{item.name}</h1>
                                <div className={Styles.booking_details}>

                                    <div className={Styles.Details_value}> <span> 1. Booking Type: {item.vehicleType} </span></div>
                                    <div className={Styles.Details_value}> <span> 2. Prize: AED {item.price}</span></div>
                                    <div className={Styles.Details_value}> <span> 3. Provider: {item.company}</span></div>

                                </div>
                                <button className={Styles.trash} onClick={() => deleteFromCart(item.id)}><IoMdTrash /></button>
                            </div>
                        )

                    })}
                    <button className={Styles.btntype1} onClick={addProduct}> Confirm</button>
                </div>
            </div>
        </aside>
    );
    // }
};

SidebarBooking.defaultProps = {
    cartData: []
}

export default SidebarBooking;

