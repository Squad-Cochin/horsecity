const con = require("../../configs/db.configs");
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const mail = require('../../utils/mailer')


require('dotenv').config()


module.exports = class listing
{

/**for displaying listing page data */
static async listingPageData  (body) 
{
    return new Promise(async (resolve, reject) => {
        try {
        const { trip_type, number_of_horses, price_from, price_to, suppliers, sort, page, limit } = body;

        // Calculate the offset based on the current page and limit
        const offset = (page - 1) * limit;

        let gccType = '';
        if (trip_type && trip_type.includes('GCC')) {
            gccType = `AND vh.gcc_travel_allowed = '${constants.status.yes}'`
        }
        let filteredTripTypes = [];
        if (trip_type && Array.isArray(trip_type)) {
            filteredTripTypes = trip_type.filter(type => type !== "GCC");
        }
        // Filter conditions 
        let tripTypeFilter = ''; 
        if (filteredTripTypes.length != 0) {
            console.log(filteredTripTypes);
            const tripTypeFilterValues = filteredTripTypes.map(type => `'${type}'`).join(',');

            tripTypeFilter = `AND vh.vehicle_type IN (${tripTypeFilterValues})`;
            console.log("filter",tripTypeFilter);
        }

          

        let numberOfHorsesFilter = '';  
        if (number_of_horses) {
            numberOfHorsesFilter = `AND vh.no_of_horse = ${number_of_horses}`;
        }
        
        let priceFilter = '';
        if (price_from && price_to) {
            priceFilter = `AND vh.price BETWEEN ${price_from} AND ${price_to}`;
        }
        
        let suppliersFilter = '';
        if (suppliers) {
         
            suppliersFilter = `AND vh.service_provider_id IN (${suppliers.join(',')})`;
        }
        console.log(suppliersFilter);
        
        let sorted = '';
        if (sort === 'low') {
            sorted = 'ORDER BY vh.price ASC';
        } else if (sort === 'high') {
            sorted = 'ORDER BY vh.price DESC';
        }
        
        // Build the final SQL query
        let selQuery = `
        SELECT vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse,
        COALESCE(GROUP_CONCAT(vimg.image), "NOT FOUND") AS images
        FROM ${constants.tableName.vehicles} vh
        LEFT JOIN vehicles_images AS vimg ON vh.id = vimg.vehicle_id
        WHERE 1=1
        ${gccType}
        ${tripTypeFilter}
        ${numberOfHorsesFilter}
        ${priceFilter}
        ${suppliersFilter} AND vh.deleted_at IS NULL AND vh.status = '${constants.status.active}'
        GROUP BY vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse
        ${sorted}
        LIMIT ${+limit} OFFSET ${+offset};
    `;
    
        
        // console.log(selQuery); // Print the constructed query for debugging
        con.query(selQuery,(err,data)=>{

            if(!err){   
                for(let i = 0;i < data.length ;  i++){
           
                     if(data[i].images != "NOT FOUND" ){
                        const imagesArray = data[i].images.split(',');
               
                        for(let j =0 ; j < imagesArray.length;j++){
                                imagesArray[j] =  `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${imagesArray[j]}`;
                                data[i].images =   imagesArray
                        }
                     }
                }

                const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.vehicles} vh
                WHERE 1=1
                ${gccType}
                ${tripTypeFilter}
                ${numberOfHorsesFilter}
                ${priceFilter}
                ${suppliersFilter} AND vh.deleted_at IS NULL AND vh.status = '${constants.status.active}' `
                // // resolve(result);
                con.query(totalCountQuery,(err,result)=>{
                    console.log(err);
                    if(!err){
                        const count = result[0]['count(*)'];
                 resolve({totalCount: count,listing_data : data})
                }
            })
          }})
        } catch (err) {
            resolve(false)
            console.log('Error while adding quotation', err);
        }
    })
}







static async getUsernameServiceProvider ()
{
    return new Promise((resolve, reject) =>
    {
        try
        {       
            const selQuery = `
             SELECT sp.id, sp.user_name,
             COALESCE(COUNT(vh.id), 0) AS vehicle_count
        FROM service_providers AS sp
        LEFT JOIN ${constants.tableName.vehicles} AS vh ON vh.service_provider_id = sp.id
        JOIN ${constants.tableName.roles} AS rl ON sp.role_Id = rl.id
        WHERE sp.deleted_at IS NULL
        AND sp.status = '${constants.status.active}'
        AND rl.id <> '${constants.Roles.admin}' 
        AND rl.id <> '${constants.Roles.super_admin}'
        GROUP BY sp.id, sp.user_name;

        `;
        
            con.query(selQuery,(err,data)=>{
                if(!err){
                     resolve({serviceProviders : data})
              }})
        }catch(err){
            console.log('Error while feching service providers', err);
        }
    })    
}


}
