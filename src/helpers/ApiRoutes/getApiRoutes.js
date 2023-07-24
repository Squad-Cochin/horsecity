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
        return errorObj.data
    }
}

export async function getSPSingleData(spId){
    try {
        const { data } = await axios.get(`${url.GET_SP_SINGLE_DATA_URL}/${spId}`);
        return(data)
    } catch (error) {
        return null
    }
}

export async function getSPUserName(){
    try {
        console.log("urr",url.GET_SP_USER_NAME)
        const { data } = await axios.get(`${url.GET_SP_USER_NAME}`);
        console.log(data)
        return(data)
    } catch (error) {
        return {
            "serviceProviders": []
        }
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
        console.log("ddd",data)
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
        return errorObj.data
    }
}

export async function getSingleCustomerData(cId){
    try {
        const { data } = await axios.get(`${url.GET_CUSTOMER_SINGLE_DATA_URL}/${cId}`);
        return(data)
    } catch (error) {
        return null
    }
}

export async function getVehiclesData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_VEHICLES_ALL_DATA_URL}`,reqObj);
        return(data.vehicles)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
}
  
export async function getSingleVechileData(vId){
    try {
        console.log(url.GET_VEHICLES_SINGLE_DATA_URL+"/"+vId)
        const { data } = await axios.get(`${url.GET_VEHICLES_SINGLE_DATA_URL}/${vId}`);
        console.log(data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getTaxationsData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.POST_TAXATION_ALL_DATA_URL}`,reqObj);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }

  export async function getSettingsPageData(){

    try {
        let pageLimit = config.pageLimit;

        const { data } = await axios.get(`${url.POST_SETTINGS_ALL_DATA_URL}`);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }


export async function getSingleTaxationData(tId){
    try {
        const { data } = await axios.get(`${url.GET_TAXATION_SINGLE_DATA_URL}/${tId}`);
        console.log("DDD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getDiscountsPageData(pageNumber){


    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        let sId = 1
        const { data } = await axios.post(`${url.GET_DISCOUNTS_ALL_DATA_URL}`,reqObj);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }
  export async function getSingleDiscountData(dscId){
    try {
        const { data } = await axios.get(`${url.GET_DISCOUNTS_SINGLE_DATA_URL}/${dscId}`);
        console.log("DDD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getLanguagesNames(){

    try {
        const { data } = await axios.get(`${url.GET_LANGUAGES_ALL_DATA_URL}`);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }


  
export async function getCurrenciesNames(){

    try {
        const { data } = await axios.get(`${url.GET_CURRENCIES_ALL_DATA_URL}`);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }


  
export async function getTaxationsNames(){

    try {
        const { data } = await axios.get(`${url.GET_TAXATION_ALL_DATA_URL}`);
        console.log("ddd",data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data
    }
  }
