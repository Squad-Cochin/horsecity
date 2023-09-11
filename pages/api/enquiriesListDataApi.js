///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for getting ENQUIRY LIST API data                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection
export default async function enquiriesListDataApi(id) {
	try{   
    const apiUrl = API_CONFIG.ENQUIRIES_LIST_DATA_API + id;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(apiUrl, {
        headers: {
          "Authorization": `Bearer ${apiTocken}`,
        },
    });
    return response.data.data.enquiries
  }
  catch{
          
  }
}



