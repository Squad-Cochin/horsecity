// import axios from "axios";
import axios from "axios";
import * as url from "../url_helper";


    /**Add new service provider */
    export async function addNewProvider(data){
        try {
            const sendData = async () => {
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

                // Handle the API response
                } catch (error) {
                    // Handle any errors
                    console.error(error);
                }
            };
            
            // Call the function to send the data
            let responseData = await sendData();
            return responseData
        } catch (error) {
            return { code : 500 , error : "Faild !"}
        }
    }

    /**Add new language */
    export async function addNewLanguage(){
        try {
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
    }

    /**Add new discounts */
    export async function addNewDiscounts(){
        try {
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
      }

  /**Add new Taxation */
  export async function addNewTaxation(){
    try {
        // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
        // return { data };
    } catch (error) {
        return { error : "Faild !"}
    }
  }

    /**Add new Customer */
    export async function addNewCustomer(data){
        try {
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
      }
    
    /**Add new vehicle */
    export async function addNewVehicle(data){
        try {
            console.log("vech",data)
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
      }   
      
    /**Add new driver */
    export async function addNewDriver(data){
        try {
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
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
           /**Add new quataion */
    export async function addNewQuataion(data){
        try {
            console.log("qut", data)
            // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
            // return { data };
        } catch (error) {
            return { error : "Faild !"}
        }
      }  