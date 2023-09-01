
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function loginApi(data) { 
	try{   
        const loginAPI = API_CONFIG.LOGIN_API;
        const apiTocken = API_CONFIG.API_TOKEN;
        // console.log("login", loginAPI, apiTocken, data)
        const response = await axios.post(loginAPI, data ,{
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        // console.log("loginData",response.data)
        return response.data
    }
    catch{
           
    }
}



