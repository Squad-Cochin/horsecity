///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting INACTIVE BOOKING LIST API data                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function inactiveBookingListApi(id) { 
	try{   
    const apiUrl = API_CONFIG.API_BASE_URL + API_CONFIG.INACTIVE_BOOKING_LIST_DATA_API + id;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response?.data?.data
  }
  catch{
          
  }
}



