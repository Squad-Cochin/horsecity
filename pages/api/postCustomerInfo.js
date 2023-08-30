
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function postCustomerInfo(data,id) {
    
	try{   
        const formData = new FormData();
        // Append the object data to the FormData instance
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const editCustomerInfo = API_CONFIG.POST_CUSTOMER_INFORMATION_API;
        console.log("Post",data);
        const apiToken = API_CONFIG.API_TOKEN;

        const response = await axios.put(`${editCustomerInfo}/${id}`,formData,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        console.log("RRRR",response.data);

        return response.data
    }
    catch{
           
    }
}
