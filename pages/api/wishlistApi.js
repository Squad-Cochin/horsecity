///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for switching item in WISHLIST LIST API                            //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function isWishlist(body) {
	try{   
    const wishlistApi = API_CONFIG.API_BASE_URL + API_CONFIG.WISHLIST_API;
    const apiToken = API_CONFIG.API_TOKEN;
    const response = await axios.post(`${wishlistApi}`,body,{
        headers: {
          "Authorization": `Bearer ${apiToken}`, 
        },
    });
    return response.data
  }
  catch{
          
  }
}
