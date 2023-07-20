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
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "serviceProvider": []
            }
        }
        return errorObj
    }
}

export async function getSPSingleData(spId){
    try {
        const { data } = await axios.get(`${url.GET_SP_SINGLE_DATA_URL}/${spId}`);
        console.log("sps",data);
        return(data)
    } catch (error) {
        return null
    }
}

export async function getCustomersData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_CUSTOMER_ALL_DATA_URL}`,reqObj);
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "customers": []
            }
        }
        return errorObj
    }
}

export async function getSingleCustomerData(spId){
    try {
        const { data } = await axios.get(`${url.GET_SP_SINGLE_DATA_URL}/${spId}`);
        console.log("sps",data);
        return(data)
    } catch (error) {
        return null
    }
}