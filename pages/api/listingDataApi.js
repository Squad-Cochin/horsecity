///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting LISTING PAGE API data                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function listingDataApi(searchData) {
	try{   
    const listingDataApi = API_CONFIG.API_BASE_URL + API_CONFIG.LISTING_DATA_API;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.post(listingDataApi, searchData ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response?.data?.data
  }
  catch{
          
  }
}



