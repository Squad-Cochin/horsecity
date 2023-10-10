///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                                     File using for ADD REVIEW api                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function addReviewApi(data) {
	try{   
    const apiUrl = API_CONFIG.API_BASE_URL + API_CONFIG.ADD_REVIEW;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.post(apiUrl, data ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response?.data
  }
  catch{
          
  }
}



