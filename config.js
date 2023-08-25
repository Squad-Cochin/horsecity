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
console.log(process.env.NEXT_PUBLIC_API_KEY)
const API_CONFIG = {
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
}
console.log(API_CONFIG) 

module.exports = API_CONFIG;