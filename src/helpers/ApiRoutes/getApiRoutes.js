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

export async function getSPVehiclesData(spId){
    try {
        const { data } = await axios.get(`${url.GET_SP_VEHICLES_DATA_URL}/${spId}`);
        console.log("ddata",data)
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
        // let pageLimit = config.pageLimit;

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

export async function getInvoicesData(pageNumber)
{
    try 
    {
        // let pageLimit = config.pageLimit;
        let reqObj =
        {
            "page" : 1,
            "limit" : 1
        }
        const { data } = await axios.post(`${url.POST_INVOICE_ALL_DATA_URL}`, reqObj);
        console.log("Invoices: ",data);
        return(data)
    }
    catch (error) 
    {
        let errorObj =
        {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data":
            {
                "totalCount": 0,
                "serviceProvider": []
            }
        }
        return errorObj.data
    }
};

export async function getDriversData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_DRIVERS_ALL_DATA_URL}`,reqObj);
        console.log("drivers",data);
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

export async function getQuotationData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_QUOTATION_ALL_DATA_URL}`,reqObj);
        console.log("QUOTATIONS",data);
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

export async function getConfirmQut(id){
    try {
        console.log(url.GET_QUOTATION_SINGLE_DATA_URL + "/" + id)
        const { data } = await axios.get(`${url.GET_QUOTATION_SINGLE_DATA_URL}/${id}`);
        console.log("CQ",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getSingleDriverData(dId){
    try {
        const { data } = await axios.get(`${url.GET_DRIVERS_SINGLE_DATA_URL}/${dId}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getSingleQuotationData(id){
    try {
        const { data } = await axios.get(`${url.GET_QUOTATION_FULL_DATA_URL}/${id}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getSingleInvoiceData(iId){
    try
    {
        console.log(url.GET_INVOICE_SINGLE_DATA_URL+"/"+iId)
        const { data } = await axios.get(`${url.GET_INVOICE_SINGLE_DATA_URL}/${iId}`);
        console.log("Single Invoice:",data)
        return(data)
    } catch (error) {
        return null
    }
}


export async function getSPDriverData(dId){
    try {
        const { data } = await axios.get(`${url.GET_SP_DRIVER_DATA_URL}/${dId}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getDiscounts(){
    try {
        const { data } = await axios.get(`${url.GET_DISCOUNTS}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getAssignedProviders(aId){
    try {
        console.log("id",aId)
        const { data } = await axios.get(`${url.GET_ASSIGNED_DRIVERS}/${aId}`);
        console.log("AP",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getSingleInvoicePaymentHistroy(pId)
{
    try
    {
        console.log(`Invoice id for which payment detail is fetched: `, pId);
        const { data } = await axios.get(`${url.GET_INVOICE_SINGLE_INVOICE_PAYMENT_HISTROY}/${pId}`);
        console.log(`Single Invoice Payment Histroy: `, data);
        return(data);       
    }
    catch(error)
    {
        let errorObj =  
        {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": 
            {
                "totalCount": 0,
                "vehicles": []
            }
        }
        return errorObj.data      
    }
}


export async function getLanguagesPageData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        console.log(reqObj);
        const { data } = await axios.post(`${url.POST_LANGUAGES_ALL_DATA_URL}`,reqObj);
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

export async function getSingleLanguageData(tId){
    try {
        const { data } = await axios.get(`${url.GET_LANGUAGES_SINGLE_DATA_URL}/${tId}`);
        console.log("DDD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getVehicleImageData(id){
    try {
        console.log(url.GET_VEHICLES_IMAGES_DATA_URL)
        const { data } = await axios.get(`${url.GET_VEHICLES_IMAGES_DATA_URL}/${id}`);
        console.log("images",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getEnquiriesData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        console.log(reqObj)
        const { data } = await axios.post(`${url.GET_ENQUIRY_ALL_DATA_URL}`,reqObj);
        console.log(data)
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

export async function getSingleEnquiryData(dId){
    try {
        const { data } = await axios.get(`${url.GET_ENQUIRY_SINGLE_DATA_URL}/${dId}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        return null
    }
}

export async function getLatestPayementHistroy(iId){
    try
    {
        const { data } = await axios.get(`${url.GET_LATEST_PAYMENT_HISTROY_OF_INVOICE}/${iId}`);
        console.log("Latest Payment Histroy: ",data)
        return(data)
    }
    catch (error)
    {
        return null
    }
}

// export async function getLanguageFile(){
//     try {
//         const { data } = await axios.get(`${url.GET_LANGUAGES_FILE}`);
//         console.log("DDD",data)
//         return(data)
//     } catch (error) {
//         return null
//     }
// }