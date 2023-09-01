
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function dashboardDataApi(id) {
    
	try{   
        const apiUrl = API_CONFIG.DASHBOARD_DATA_API + id;
        const apiTocken = API_CONFIG.API_TOKEN;
        // console.log("dashboardDataApi", apiUrl, apiTocken)
        const response = await axios.get(apiUrl, {
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        // console.log("dashboardDataApi",response.data)
        return response.data.data
    }
    catch{
           
    }
}



