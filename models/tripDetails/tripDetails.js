const con = require("../../configs/db.configs"); 
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
require('dotenv').config()


exports.getAllTripDetails = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {  
            console.log("hello");     
            const {page, limit} = requestBody;
       
            const offset = (page - 1) * limit; 

            const selQuery = `SELECT bk.id AS booking_id,bk.inv_id  AS invoice_id, sp.name AS service_provider,dvr.name AS driver_name,vh.vehicle_number ,bk.pickup_location, bk.drop_location,bk.pickup_date  AS trip_starting_date,bk.drop_date  AS trip_ending_date, bk.booking_status  AS trip_status 
            FROM ${constants.tableName.bookings} AS bk
            JOIN ${constants.tableName.vehicles} vh ON bk.vehicle_id  = vh.id
            JOIN ${constants.tableName.customers} cu ON bk.customer_id   = cu.id
            JOIN ${constants.tableName.drivers} dvr ON bk.driver_id   = dvr.id
            JOIN ${constants.tableName.service_providers} sp ON bk.service_provider_id  = sp.id
            WHERE bk.deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset} `;
            con.query(selQuery,(err,data)=>{
            console.log(err);
                if(!err){ 

                    const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.bookings}
                                            WHERE deleted_at IS NULL`
                    // resolve(result);
                    con.query(totalCountQuery,(err,result)=>{
                        if(!err){
                            const count = result[0]['count(*)'];  
                            console.log(data[0]);
                            for (let i = 0; i < data.length; i++) {
            
                                data[i].trip_starting_date = `${time.formatDateToDDMMYYYY(
                                    data[i].trip_starting_date
                                  )}`;
                                  data[i].trip_ending_date = `${time.formatDateToDDMMYYYY(
                                    data[i].trip_ending_date
                                  )}`;
                              }
                          
                            resolve({totalCount : count, tripDetails : data})
                        }
                })
            }})
          
        }catch(err){
            console.log('Error while feching equiries', err);
        }


    })    
   
}




exports.addBreakDowns = (requestBody) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {  
           const { invoice_id, 	booking_id ,service_provider_id ,driver_id,	vehicle_id, pickup_location ,trip_status} = requestBody ;

           if(trip_status === constants.vehicles_breakouts_status.break_out ){
            /***This for selecting drop location  */
            let selQuery = `SELECT 	drop_location  FROM ${constants.tableName.bookings}
                            WHERE id  = '${booking_id}'`
            con.query(selQuery, async (err, data) => {

            if (data.length != 0) {
                let drop_location = data[0].drop_location 
                /**For adding new brak downs */
                let insQuery = `INSERT INTO ${constants.tableName.vehicles_breakouts} (booking_id, invoice_id, service_provider_id, vehicle_id, driver_id, pickup_location, drop_location, created_at)
                VALUES ('${booking_id}', '${invoice_id}', '${service_provider_id}', '${vehicle_id}', '${driver_id}', '${pickup_location}', '${drop_location}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                
            con.query(insQuery, async (err, data) => { 
                console.log("insert", err);
                if (!err) {
                    /** After inserting we updating trip status the status */
                    let updateQuery = `UPDATE ${constants.tableName.bookings}
                                       SET booking_status = '${constants.vehicles_breakouts_status.break_out}'
                                       WHERE id = '${booking_id}'`;

                                       con.query(updateQuery, async (err, data) => {
                                        console.log(err,data);
          
                                        if (data?.length != 0) {

                                            resolve(true)

                                        } else {
                                            resolve(false)
                                        }
                                    })

                } else {
                    resolve(false)
                }
            })
        } else {
            resolve(false)
        }
    })
           }else if(trip_status === constants.vehicles_breakouts_status.compleated){
            let updateQuery = `UPDATE ${constants.tableName.bookings} SET
            booking_status = '${constants.vehicles_breakouts_status.compleated}'
            WHERE id = '${booking_id}'`;

            con.query(updateQuery, async (err, data) => {

             if (data?.length != 0) {

                 resolve(true)

             } else {
                 resolve(false)
             }
         })

           }
            
          
        }catch(err){
            console.log('Error while feching equiries', err);
        }


    })    
   
}




exports.listBreakDowns = (bkId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {  
           let selQuery = `SELECT vb.id, vh.vehicle_number ,dvr.name AS driver_name, vb.pickup_location,vb.drop_location,sp.name AS service_provider
                           FROM ${constants.tableName.vehicles_breakouts} vb
                           JOIN ${constants.tableName.vehicles} vh ON vb.vehicle_id  = vh.id
                           JOIN ${constants.tableName.drivers} dvr ON vb.driver_id   = dvr.id
                           JOIN ${constants.tableName.service_providers} sp ON vb.service_provider_id  = sp.id
                           WHERE vb.booking_id = '${bkId}'`


                           con.query(selQuery, async (err, data) => {
                            if (data.length != 0) {
                                resolve({vehicles_breakouts : data})
                            } else {
                                resolve(false)
                            }
                        })
            
          
        }catch(err){
            console.log('Error while feching equiries', err);
        }


    })    
   
}



