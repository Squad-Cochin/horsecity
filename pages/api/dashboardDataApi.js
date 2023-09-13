///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting DASHBOARD API data                                     //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////


import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function dashboardDataApi(id) {
	try{   
    const apiUrl = API_CONFIG.API_BASE_URL + API_CONFIG.DASHBOARD_DATA_API + id;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response.data.data
  }
  catch{
          
  }
}



