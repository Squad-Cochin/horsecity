///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting CUSTOMER INFO API data                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function getCustomerInfo(id) {
	try{   
        const getCustomerInfo = API_CONFIG.API_BASE_URL + API_CONFIG.GET_CUSTOMER_INFORMATION_API;
        const apiToken = API_CONFIG.API_TOKEN;
        const response = await axios.get(`${getCustomerInfo}/${id}`,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        return response?.data?.data
    }
    catch{
           
    }
}
