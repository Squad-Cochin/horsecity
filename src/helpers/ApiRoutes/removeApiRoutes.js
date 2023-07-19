import axios from "axios";
import * as url from "../url_helper";


/**Remove service provider */
export async function removeSProvider(provider_id){
    try{
        console.log("pp",provider_id)
        const { data } = await axios.put(`${url.PUT_SP_REMOVE}/${provider_id}`);
        console.log("data",data)
        return data;
      } catch (error) {
        return { error : "Faild !"}
      }
}

/**Remove service provider */
export async function removeCustomer(customer_id){
    try {
        alert(`Customer ${customer_id} delete request reached.`)
    } catch (error) {
        return { error : "Failed !"}
    }
}

/**Remove service provider */
export async function removeVehicle(vehicle_id){
    try {
        alert(`Vehicle ${vehicle_id} delete request reached.`)
    } catch (error) {
        return { error : "Failed !"}
    }
}

/**Remove service provider */
export async function removeVehicleImage(vehicle_id,image_id){
    try {

        alert(`Vehicle ${vehicle_id} image ${image_id} delete request reached.`)
    } catch (error) {
        return { error : "Failed !"}
    }
}
/**Remove Driver provider */
export async function removeDriver(driver_id){
    try {
        alert(`Driver ${driver_id} delete request reached.`)
    } catch (error) {
        return { error : "Failed !"}
    }
}