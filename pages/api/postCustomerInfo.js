///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for UPDATE CUSTOMER PROFILE API                                    //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function postCustomerInfo(data,id) {
	try{   
        const formData = new FormData();
        // Append the object data to the FormData instance
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const editCustomerInfo = API_CONFIG.POST_CUSTOMER_INFORMATION_API;
        const apiToken = API_CONFIG.API_TOKEN;
        const response = await axios.put(`${editCustomerInfo}/${id}`,formData,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        return response.data
    }
    catch{
           
    }
}
