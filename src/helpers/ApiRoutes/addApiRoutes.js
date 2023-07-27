// import axios from "axios";
import axios from "axios";
import * as url from "../url_helper";


    /**Add new service provider */
    export async function addNewProvider(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_SP_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }

     /**Add new discounts */
    export async function addNewDiscounts(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_DISCOUNTS_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }

    /**Add new Taxation */
    export async function addNewTaxation(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_TAXATION_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }

    /**Add new Customer */
    export async function addNewCustomer(data){
        try {
            console.log(data)
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_CUSTOMER_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
      }
    
    /**Add new vehicle */
    export async function addNewVehicle(data){
        try {
            console.log("dd1",data)
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_VEHICLES_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response11",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }   
      
    export async function addNewImage(data, id){
        try {
            console.log("dd1",data)
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_VEHICLES_IMAGES_ADD_URL}/${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response11",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }
      
    /**Add new driver */
    export async function addNewDriver(data){
        try {
            console.log("dd1",data)
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_DRIVERS_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response11",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }
    
    export async function assignNewSP(dId, spId){
        try{
            let reqObj = {
                "driver_id": dId,
                "serviceProvider_id": spId
            }
            const response = await axios.post(`${url.POST_ASSIGN_DRIVERS}`, reqObj);
            return response;
        } catch {
            let errObj = {
                code : 500 , 
                message : "Server error !"
            }
            return errObj;
        }
    }

     /**Add new monthly report */
    export async function addNewMonthlyReport(data){
        try {
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
    }   
      
     /**Add new discounts */
    export async function addNewLanguage(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_LANGUAGES_ADD_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }
    
     /**Add new discounts */
     export async function addNewQuotaion(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_ADD_QUOTATION_URL}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response",response)
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }

    /**
     * Adding amount to the invoice
     */

    export async function addAmount(id, data)
    {
        try
        {
            console.log(`Invoice id at the time of adding the payment data in the table`, id);
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data)
            {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_ADD_AMOUNT_URL}/${id}`, formData,
            {
                headers: 
                {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response from the add amount: ",response)
            return response;            
        }
        catch (error)
        {
            let errObj =
            {
                code : 500 , 
                error : "Failed !"
            }
            return errObj;        
        }
    };