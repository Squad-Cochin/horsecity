///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                              File using for getting ALL REVIEWS API data                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection(DETAILS DATA)
export default async function AllReviewsApi(id) {
	try{   
    const detailsDataApi = API_CONFIG.API_BASE_URL + API_CONFIG.ALL_REVIEWS;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(`${detailsDataApi}${id}` ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`, 
        },
    });
    return response?.data
  }
  catch{
          
  }
}
