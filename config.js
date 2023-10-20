//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                        THIS FILE IS USE TO STORE THE ESSENTIAL DATA                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////


// import dotenv from 'dotenv';

// Dynamic environment file configuration
// dotenv.config({
//     path: `.env.${process.env.NODE_ENV}`
// });
// console.log(process.env.NEXT_PUBLIC_API_KEY)
const API_CONFIG = {
	API_BASE_URL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
	API_KEY: `${process.env.NEXT_PUBLIC_API_KEY}`,
	API_TOKEN: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
	SERVICE_PROVIDER_API : `${process.env.NEXT_PUBLIC_SERVICE_PROVIDER_API}`,
	LISTING_DATA_API : `${process.env.NEXT_PUBLIC_LISTING_DATA_API}`,
	DETAILS_DATA_API : `${process.env.NEXT_PUBLIC_DETAILS_DATA_API}`,
	ADD_BOOKING_API : `${process.env.NEXT_PUBLIC_ADD_ENQUIRY_API}`,
	NEW_REGISTRATION_API : `${process.env.NEXT_PUBLIC_NEW_REGISTRATION_API}`,
	LOGIN_API: `${process.env.NEXT_PUBLIC_LOGIN_API}`,
	WISHLIST_API: `${process.env.NEXT_PUBLIC_WISHLIST_ADD_OR_REMOVE_API}`,
	GET_WISHLIST_API: `${process.env.NEXT_PUBLIC_GET_WISHLIST_API}`,
	DASHBOARD_DATA_API: `${process.env.NEXT_PUBLIC_DASHBOARD_DATA_API}`,
	ENQUIRIES_LIST_DATA_API:`${process.env.NEXT_PUBLIC_ENQUIRIES_LIST_DATA_API}`,
	ALL_BOOKING_LIST_DATA_API:`${process.env.NEXT_PUBLIC_ALL_BOOKING_LIST_DATA_API}`,
	ACTIVE_BOOKING_LIST_DATA_API:`${process.env.NEXT_PUBLIC_ACTIVE_BOOKING_LIST_DATA_API}`,
	INACTIVE_BOOKING_LIST_DATA_API:`${process.env.NEXT_PUBLIC_INACTIVE_BOOKING_LIST_DATA_API}`,
	STARTED_BOOKING_LIST_DATA_API:`${process.env.NEXT_PUBLIC_STARTED_BOOKING_LIST_DATA_API}`,
	GET_CUSTOMER_INFORMATION_API : `${process.env.NEXT_PUBLIC_GET_CUSTOMER_INFORMATION}`,
	POST_CUSTOMER_INFORMATION_API : `${process.env.NEXT_PUBLIC_POST_CUSTOMER_INFORMATION}`,
	CHANGE_PASSWORD_API : `${process.env.NEXT_PUBLIC_CHANGE_PASSWORD}`,
	COMPLETED_BOOKING_LIST_DATA_API : `${process.env.NEXT_PUBLIC_COMPLETED_BOOKING_LIST_DATA_API}`,
	ADD_REVIEW : `${process.env.NEXT_PUBLIC_ADD_REVIEW}`,
	ALL_REVIEWS : `${process.env.NEXT_PUBLIC_ALL_REVIEWS}`,
	GET_ABOUT_US_DATA : `${process.env.NEXT_PUBLIC_ABOUT_US_DATA}`,
}
// console.log(API_CONFIG) 

module.exports = API_CONFIG;