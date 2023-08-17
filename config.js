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
	// API_BASE_URL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`
}
console.log(API_CONFIG)

module.exports = API_CONFIG;