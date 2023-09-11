///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//              File using for getting ALL BOOKING LIST API data                                     //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function allBookingListApi(id) {
	try{   
    const apiUrl = API_CONFIG.ALL_BOOKING_LIST_DATA_API + id;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response.data.data
  }
  catch{
          
  }
}



