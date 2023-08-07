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

  /** get roughts */

export async function getSPAllData(pageNumber,userId){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        console.log("userid",userId);
        const { data } = await axios.post(`${url.GET_SP_ALL_DATA_URL}/${userId}`,reqObj);
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

export async function getVehiclesData(pageNumber, vId){
    try {
        
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_VEHICLES_ALL_DATA_URL}/${vId}`,reqObj);
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
        let pageLimit = config.pageLimit;
        let reqObj =
        {
            "page" : pageNumber,
            "limit" : pageLimit
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
}

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

export async function getQuotationData(pageNumber,userId){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.GET_QUOTATION_ALL_DATA_URL}/${userId}`,reqObj);
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

export async function getEnquiriesData(pageNumber,userId){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        console.log(reqObj)
        const { data } = await axios.post(`${url.GET_ENQUIRY_ALL_DATA_URL}/${userId}`,reqObj);
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

export async function getSendEmailButtonData(iId)
{
    try
    {
        const { data } = await axios.get(`${url.GET_SEND_EMAIL_BUTTON_DATA_OF_INVOICE}/${iId}`);
        // console.log("Send email button data: ",data)
        return(data)
    }
    catch (error)
    {
        return null        
    }
}

export async function startTrip(iId)
{
    try
    {
        console.log(`Invoice Id:`, iId);
        const data = await axios.get(`${url.GET_START_TRIP}/${iId}`);
        console.log("Booking started: ", data);
        return (data);
    } catch (error) {
        console.error("Error occurred:", error);
        let errObj = {
            code: error.response ? error.response.status : 500,
            error: error.message || "Failed!",
        };
        return errObj;
    }
}

export async function geBookingDataOnInvoiceId(iId)
{
    try
    {
        console.log(`Invoice Id:`, iId);
        const data = await axios.get(`${url.GET_BOOKING_DATA_FROM_INVOICE_ID}/${iId}`);
        console.log("Booking data on invoice id: ", data);
        return (data);
    } catch (error) {
        console.error("Error occurred:", error);
        let errObj = {
            code: error.response ? error.response.status : 500,
            error: error.message || "Failed!",
        };
        return errObj;
    }
}

export async function getTripDeatails(pageNumber,userId){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        console.log(reqObj)
        const { data } = await axios.post(`${url.GET_TRIP_ALL_DATA_URL}/${userId}`,reqObj);
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

export async function getLIstBreakDownVehicles(bkId){
    try {
        console.log(bkId);
        const { data } = await axios.get(`${url.GET_VEHICLE_BREAKDOWN_ALL_DATA_URL}/${bkId}`);
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



export async function getAccountsData(pageNumber){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = {
            "page" : pageNumber,
            "limit" : pageLimit
        }
        const { data } = await axios.post(`${url.POST_ACCOUNTS_ALL_DATA_URL}`,reqObj);
        console.log("QUOTATIONS",data);
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "serviceProvider": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getSingleAccountsData(id){
    try {

        
        const { data } = await axios.get(`${url.GET_ACCOUNTS_SINGLE_DATA_URL}/${id}`);
        console.log("SD",data)
        return(data)
    } catch (error) {
        // return null
    }
}



export async function getSeviceProviderReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_SERVICE_PROVIDER_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        let errorObj =  {
            "code": 500,
            "status": false,
            "message": "Server error",
            "data": {
                "totalCount": 0,
                "serviceProviders": []
            }
        }
        return errorObj.data
    }
}

export async function getCustomerReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_CUSTOMER_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getDriverReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_DRIVERS_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getVehicleReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_VEHICLES_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getEnquiryReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_ENQUIRIES_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getQuotationReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_QUOTATIONS_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getTripDetailsReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_TRIP_DETAILS_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getAccountsReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_ACCOUNTS_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}

export async function getInvoiceReport(pageNumber, val){
    try {
        let pageLimit = config.pageLimit;
        let reqObj = val;
        reqObj.page = pageNumber
        reqObj.limit = pageLimit
        console.log("reachapi",reqObj)
        const { data } = await axios.post(`${url.POST_INVOICE_REPORT_URL}`,reqObj);
        console.log(data)
        return(data)
    } catch (error) {
        // let errorObj =  {
        //     "code": 500,
        //     "status": false,
        //     "message": "Server error",
        //     "data": {
        //         "totalCount": 0,
        //         "vehicles": []
        //     }
        // }
        // return errorObj.data
    }
}