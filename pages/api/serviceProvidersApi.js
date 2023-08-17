
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function serviceProvidersApi() {
    
	try{   
        const serviceProviders = API_CONFIG.SERVICE_PROVIDER_API;
        const apiTocken = API_CONFIG.API_TOKEN;
        console.log("serviceProviderssss", serviceProviders, apiTocken)
        const response = await axios.get(serviceProviders, {
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        console.log("rr",response.data.data.serviceProviders)
        return response.data.data.serviceProviders
    }
    catch{
           
    }
}



