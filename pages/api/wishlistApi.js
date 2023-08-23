
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function isWishlist(body) {
    
	try{   

        const wishlistApi = API_CONFIG.WISHLIST_API;
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
