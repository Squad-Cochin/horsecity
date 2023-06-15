///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                           COMPONENT FOR SHOWING CART ITEMS                                //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState }from "react";
import { BsCalendar3 } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { RiTimerLine } from "react-icons/ri";
import { ImTicket } from "react-icons/im";
import { IoMdTrash } from "react-icons/io";
// import loadingimage from "../../../../public/moonstride-loader.svg"
// import Image from "next/image";
import { Image } from "react-bootstrap";
// *Slide bar css page 
import Styles from "./SidebarBookingItems.module.scss";

// IMPORT FUNCTION FOR API COMMUNNICATION
// import { pushCartData } from "../../../api/tourPackages"

// FUNCTION FOR CART COMPONENT
const SidebarBooking = () => {

    const [cartLoader, setCartLoader] = useState(false);

    // FUNCTION FOR DELETE ITEM FROM CART
    const deleteFromCart = ()=>{
        // let sessionData = JSON.parse(sessionStorage.getItem('cart'));
        // if (sessionData && Array.isArray(sessionData)) {
        //     const updatedArray = sessionData.filter(item => item.orderId !== orderId);
        //     sessionData = updatedArray;
        //     sessionStorage.setItem('cart', JSON.stringify(sessionData));
        //     props.setcartdata(updatedArray)
        alert("deleted")
        // }
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

    function Loader(){
        return( 
            <aside>
                <div className={Styles.sidebar_booking_section}>
                <Image src="" width="250" height="250" alt="Loader Image"/>
                </div>
            </aside>
            
        )
    }
    
    let count = 1;
    // if(cartLoader){
    //     return(
    //         <Loader></Loader>
    //     )
    // }
    // else{
        return (
            <aside>
                <div className={Styles.sidebar_booking_section}>
                    <div className={Styles.sidebar_box}>
                        <h2 className={Styles.booking_title}>Your Booking({count})</h2>
                        {/* {props.cartData.map((item, index)=>{ */}
                            {/* return( */}
                                <div className={Styles.booked_trip} key={1}>
                                <h1 className={Styles.booking_product_title}>bat</h1>
                                <div className={Styles.booking_details}>
                                    <div className={Styles.Details_value}> <BsCalendar3 /> <span>2/10/2023</span></div>   
                                    <div className={Styles.Details_value}> <FiClock /> <span>1:00 hours</span></div>   
                                    <div className={Styles.Details_value}> <ImTicket /> 1 Tickets <span>(Adults: 2 Children: 2)</span></div>   
                                    <div className={Styles.Details_value}> <RiTimerLine /> 2:99</div>                
                                </div>
                                <button className={Styles.trash} onClick={()=> deleteFromCart()}><IoMdTrash /></button>
                            </div> 
                            {/* ) */}
                             
                        {/* })} */}
                            <button className={Styles.btntype1} onClick={addProduct}> Confirm</button>  
                    </div>
                </div>
            </aside>
        );
    // }
};

SidebarBooking.defaultProps = {
    cartData : []
}

export default SidebarBooking;

