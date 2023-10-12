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
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
                'Content-Type': 'multipart/form-data'
                }
            });
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
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
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
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
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
    export async function addNewCustomer(data, Id){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_CUSTOMER_ADD_URL}/${Id}`, formData, {
                headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
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
    export async function addNewVehicle(data, Id){
        try {
       
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_VEHICLES_ADD_URL}/${Id}`, formData, {
                headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }   
    /**Adding for image */
    export async function addNewImage(data, id){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_VEHICLES_IMAGES_ADD_URL}/${id}`, formData, {
                headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
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
    export async function addNewDriver(data, uId){
        try {

            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_DRIVERS_ADD_URL}/${uId}`, formData, {
                headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,      
                'Content-Type': 'multipart/form-data'
                }
            });
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Failed !"
            }
            return errObj;
        }
    }
    /**This function assign service provider to driver */
    export async function assignNewSP(dId, spId){
    try
    {
            let reqObj = {
                "driver_id": dId,
                "serviceProvider_id": spId
            }
            const response = await axios.post(`${url.POST_ASSIGN_DRIVERS}`, reqObj,{
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
                  },
            });
            return response;
        } catch {
            let errObj = {
                code : 500 , 
                message : "Server error !"
            }
            return errObj;
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
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
                'Content-Type': 'multipart/form-data'
                }
            });
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
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,     
                'Content-Type': 'multipart/form-data'
                }
            });
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }



     /**Adding amount on invoice */   
    export async function addAmount(id, amount)
{
    try
    {
        const formData = new FormData();
        // for (const key in data) {
        //     formData.append(key, data[key]);
        // }
        formData.append('totalRecievedAmount', amount);
        const response = await axios.post(`${url.POST_ADD_AMOUNT_URL}/${id}`, formData,
        {
            headers:
            {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
                'Content-Type': 'multipart/form-data'
            }
        });
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



/**Send email function for invoice page */
export async function sendEmail(id, email, subject)
{
    try
    {
        const formData = new FormData();
        formData.append('recepientEmail', email);
        formData.append('invoiceSubject', subject);
        const response = await axios.post(`${url.POST_SENT_INVOICE_ON_EMAIL}/${id}`, formData,
        {
            headers:
            {
                "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
                'Content-Type': 'multipart/form-data'
            }
        });
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
/**Send email function for quotation page */
export async function sendEmailFunction(id, data)
{
    try {
        const formData = new FormData();
        // Append the object data to the FormData instance
        for (const key in data) {
            formData.append(key, data[key]);
        }
        // Send the form data as a POST request using Axios
        const response = await axios.post(`${url.POST_SEND_QUT_EMAIL_URL}/${id}`, formData, {
            headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,    
            'Content-Type': 'multipart/form-data'
            }
        });
        return response
    } catch (error) {
        let errObj = {
            code : 500 , 
            error : "Faild !"
        }
        return errObj;
    }
};

    /**Add new breakdown */
    export async function updateTripStatus(data){
        try {
            const formData = new FormData();
            // Append the object data to the FormData instance
            for (const key in data) {
                formData.append(key, data[key]);
            }
            // Send the form data as a POST request using Axios
            const response = await axios.post(`${url.POST_VEHICLE_BREAKDOWN_DATA_URL}`, formData, {
                headers: {
               "Authorization": `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,     
                'Content-Type': 'multipart/form-data'
                }
            });
            return response
        } catch (error) {
            let errObj = {
                code : 500 , 
                error : "Faild !"
            }
            return errObj;
        }
    }