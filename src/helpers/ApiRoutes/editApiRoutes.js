
import axios from "axios";
import * as url from "../url_helper";

/**Update previous service provider */
export async function updateSProvider(id, data){
  try {
      console.log("datas",id)
      const formData = new FormData();
      // Append the object data to the FormData instance
      for (const key in data) {
          formData.append(key, data[key]);
      }
      // Send the form data as a POST request using Axios
      const response = await axios.put(`${url.POST_SP_EDIT_URL}/${id}`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      });
      console.log("response",response)
      return response

      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}/${id}`, updateData);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous language */
export async function updateLanguage(){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous discounts */
export async function updateDiscounts(){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous taxation */
export async function updateTaxation(id, data){
  try {
    console.log("datas",id)
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
        formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(`${url.POST_TAXATION_EDIT_URL}/${id}`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    });
    console.log("response",response)
    return response
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous customer */
export async function updateCustomer(id,data){
  try {
    console.log(data)
    const formData = new FormData();
      // Append the object data to the FormData instance
      for (const key in data) {
          formData.append(key, data[key]);
      }
      // Send the form data as a POST request using Axios
      const response = await axios.put(`${url.POST_CUSTOMER_EDIT_URL}/${id}`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      });
      console.log("response",response)
      return response

  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous vehicle */
export async function updateVehicle(id, data){
  try {
    console.log("reach",data)
    const formData = new FormData();
      // Append the object data to the FormData instance
      for (const key in data) {
          formData.append(key, data[key]);
      }
      // Send the form data as a POST request using Axios
      const response = await axios.put(`${url.POST_VEHICLES_EDIT_URL}/${id}`, formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      });
      console.log("response",response)
      return response

  } catch (error) {
      return { error : "Faild !"}
  }
}


/**Update previous driver */
export async function updateDriver(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}


/**Update previous report */
export async function updateMonthlyReport(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}


/**Update previous report */
export async function updatTripData(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update quataion  */
export async function updatQuataion(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

export async function updatSettigsData(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

export async function updateSPStatus(id){
  try{
    const { data } = await axios.put(`${url.PUT_SP_UPDATE_STATUS}/${id}`);
    console.log("data",data)
    return data;
  } catch (error) {
    return { error : "Faild !"}
  }
}

export async function updateCustomerStatus(id){
  try{
    const { data } = await axios.put(`${url.PUT_CUSTOMER_UPDATE_STATUS}/${id}`);
    console.log("data",data)
    return data;
  } catch (error) {
    return { error : "Faild !"}
  }
}

export async function updateVechileStatus(id){
  try{
    console.log("data",id)
    const { data } = await axios.put(`${url.PUT_VEHICLES_UPDATE_STATUS}/${id}`);
    console.log("data",data)
    return data;
  } catch (error) {
    return { error : "Faild !"}
  }
}

export async function updateTaxationStatus(id){
  try{
    console.log("data",id)
    const { data } = await axios.put(`${url.PUT_TAXATION_UPDATE_STATUS}/${id}`);
    console.log("data",data)
    return data;
  } catch (error) {
    return { error : "Faild !"}
  }
}