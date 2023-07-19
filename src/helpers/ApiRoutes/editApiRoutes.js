
import axios from "axios";
import * as url from "../url_helper";

/**Update previous service provider */
export async function updateSProvider(){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
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
export async function updateTaxation(){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous customer */
export async function updateCustomer(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}

/**Update previous vehicle */
export async function updateVehicle(data){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
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

