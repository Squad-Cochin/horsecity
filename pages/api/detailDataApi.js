
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function DetailsDataApi(id) {
    
	try{   
        const detailsDataApi = API_CONFIG.DETAILS_DATA_API;
        const apiTocken = API_CONFIG.API_TOKEN;
        console.log("listingDetails", detailsDataApi,apiTocken,id)
        const response = await axios.get(`${detailsDataApi}/${id}` ,{
            headers: {
              "Authorization": `Bearer ${apiTocken}`, 
            },
        });
        
        return response.data.data
    }
    catch{
           
    }
}



export  async function addbooking(body,cuid) {
    
	try{   
        const addBookingApi = API_CONFIG.ADD_BOOKING_API;
        const apiToken = API_CONFIG.API_TOKEN;
        console.log("listingDetails", addBookingApi,apiToken)
        const response = await axios.post(`${addBookingApi}/${cuid}` ,body,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        
        return response.data.data
    }
    catch{
           
    }
}


