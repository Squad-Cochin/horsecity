


/**Remove service provider */
export async function removeSProvider(provider_id){
    try {
        alert(`Service provider ${provider_id} delete request reached.`)
    } catch (error) {
        return { error : "Failed !"}
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