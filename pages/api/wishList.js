///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting WISHLIST LIST API data                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function WishlistData(body) {
	try{   
    const wishlistApi = API_CONFIG.API_BASE_URL + API_CONFIG.GET_WISHLIST_API;
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
