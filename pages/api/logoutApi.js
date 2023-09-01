
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function logoutApi(id) {
    
	try{   
        const apiUrl = API_CONFIG.LOGOUT_API + id;
        const apiTocken = API_CONFIG.API_TOKEN;
        // console.log("logout", apiUrl, apiTocken)
        const response = await axios.get(apiUrl, {
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        // console.log("logout",response.data)
        return response.data
    }
    catch{
           
    }
}



