
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function registrationApi(data) { 
	try{   
        const registrationApiApi = API_CONFIG.NEW_REGISTRATION_API;
        const apiTocken = API_CONFIG.API_TOKEN;
        console.log("NEWREG", registrationApiApi, apiTocken, data)
        const response = await axios.post(registrationApiApi, data ,{
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        console.log("regData",response.data.code)
        return response.data
    }
    catch{
           
    }
}



