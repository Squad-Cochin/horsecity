
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function listingDataApi(searchData) {
    
	try{   
        const listingDataApi = API_CONFIG.LISTING_DATA_API;
        const apiTocken = API_CONFIG.API_TOKEN;
        console.log("listingDatasss", listingDataApi, apiTocken, searchData)
        // const response = await axios.post(listingDataApi, searchData ,{
        //     headers: {
        //       "Authorization": `Bearer ${apiTocken}`,
        //     },
        // });
        console.log("Ld",response.data.data.listing_data)
        return response.data.data.listing_data
    }
    catch{
           
    }
}



