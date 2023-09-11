///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for REGISTER NEW CUSTOMER API                                      //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function registrationApi(data) { 
	try{   
    const registrationApiApi = API_CONFIG.NEW_REGISTRATION_API;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.post(registrationApiApi, data ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response.data
  }
  catch{
          
  }
}



