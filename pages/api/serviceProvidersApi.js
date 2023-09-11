///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting SERVICE PROVIDERS API                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function serviceProvidersApi() {
	try{   
    const serviceProviders = API_CONFIG.SERVICE_PROVIDER_API;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(serviceProviders, {
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response.data.data.serviceProviders
  }
  catch{
          
  }
}



