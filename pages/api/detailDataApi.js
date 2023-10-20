///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                File using for getting DETAILS PAGE API data and ADD ENQUIRY API                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';
import API_CONFIG from "../../config";

// Function for api connection(DETAILS DATA)
export default async function DetailsDataApi(id) {
	try{   
    const detailsDataApi = API_CONFIG.API_BASE_URL + API_CONFIG.DETAILS_DATA_API;
    const apiTocken = API_CONFIG.API_TOKEN;
    const response = await axios.get(`${detailsDataApi}/${id}` ,{
        headers: {
          "Authorization": `Bearer ${apiTocken}`, 
        },
    });
    return response?.data?.data
  }
  catch{
  }
}


// Function for api connection(ADD ENQUIRY)
export  async function addbooking(body,cuid) {   
	try{   
        const addBookingApi = API_CONFIG.API_BASE_URL + API_CONFIG.ADD_BOOKING_API;
        const apiToken = API_CONFIG.API_TOKEN;
        const response = await axios.post(`${addBookingApi}/${cuid}` ,body,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        return response?.data  
    }
    catch{
           
    }
}


