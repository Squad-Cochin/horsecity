///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                          File using for CHANGE PASSWORD API                                       //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function changePassword(body, id) {
	try{   
    const changePassword = API_CONFIG.API_BASE_URL + API_CONFIG.CHANGE_PASSWORD_API;
    const apiToken = API_CONFIG.API_TOKEN;
    const response = await axios.post(`${changePassword}/${id}`, body, {
        headers: {
          "Authorization": `Bearer ${apiToken}`, 
        },
    });
    return response.data
  }
  catch{
          
  }
}
