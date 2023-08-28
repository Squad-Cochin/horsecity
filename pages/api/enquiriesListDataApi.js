
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function enquiriesListDataApi(id) {
    
	try{   
        const apiUrl = API_CONFIG.ENQUIRIES_LIST_DATA_API + id;
        const apiTocken = API_CONFIG.API_TOKEN;
        console.log("enqlistData", apiUrl, apiTocken)
        const response = await axios.get(apiUrl, {
            headers: {
              "Authorization": `Bearer ${apiTocken}`,
            },
        });
        console.log("enqlistDataRR",response.data)
        return response.data.data.enquiries
    }
    catch{
           
    }
}



