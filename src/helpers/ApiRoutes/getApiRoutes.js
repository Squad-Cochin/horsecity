/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
//                                      Get api routes                                             //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Import Files
import axios from "axios";
import * as url from "../url_helper";
import config from "../../config";
// import { serviceProviders} from "../../CommonData/Data";

  /** get service provider details */
export async function getSPAllData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_SP_ALL_DATA_URL}`,reqObj);
        console.log(data);
        return(data)
    } catch (error) {
        return null
    }
// console.log("pp",pageNumber)
// if(serviceProviders){
//     return serviceProviders ;
// }
// return null ;
}