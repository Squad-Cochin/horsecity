
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function changePassword(body,id) {
    
	try{   

        const changePassword = API_CONFIG.CHANGE_PASSWORD_API;

        const apiToken = API_CONFIG.API_TOKEN;

        const response = await axios.post(`${changePassword}/${id}`,body,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });


        return response.data
    }
    catch{
           
    }
}
