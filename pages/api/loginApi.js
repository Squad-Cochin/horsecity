///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                             File using for LOGIN API                                              //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function loginApi(data) { 
	try{   
    const loginAPI = API_CONFIG.API_BASE_URL + API_CONFIG.LOGIN_API;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.post(loginAPI, data ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response?.data
  }
  catch{
          
  }
}



