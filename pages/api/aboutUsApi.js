///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                              File using for getting CMS About us API data                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection(about page)
export default async function getAboutUsApi(url) {
	try{   
    const abotUsDataApi = API_CONFIG.API_BASE_URL + API_CONFIG.GET_ABOUT_US_DATA;
    const apiToken = API_CONFIG.API_TOKEN;
    const response = await axios.get(`${abotUsDataApi}${url}` ,{
        headers: {
          "Authorization": `Bearer ${apiToken}`, 
        },
    });
    return response?.data
  }
  catch{
          
  }
}
