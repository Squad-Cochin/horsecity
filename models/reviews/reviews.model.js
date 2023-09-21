
var constants = require(`../../utils/constants`);
var time = require(`../../utils/helper/date`);
var con = require(`../../configs/db.configs`);
var commonfetching = require (`../../utils/helper/commonfetching`);
var commonoperation = require(`../../utils/helper/commonoperation`);


module.exports = class reviews
{

    static async getallreviews(pageNumber, pageSize, Id)
    {
        const offset = (pageNumber - 1) * pageSize;
        let role = await commonoperation.checkRole(Id);
        if(role[0].role_id === constants.Roles.admin)
        {            
            let selQuery = `
                SELECT
                r.id,
                r.booking_id AS booking_id,
                c.name AS customer_name,
                c.email AS customer_email,
                v.vehicle_number AS vehicle_no,
                r.rating,
                r.review,
                r.status
                FROM ${constants.tableName.reviews} r
                INNER JOIN ${constants.tableName.bookings} b ON b.id = r.booking_id
                INNER JOIN ${constants.tableName.vehicles} v ON v.id = b.vehicle_id
                INNER JOIN ${constants.tableName.customers} c ON c.id = b.customer_id
                INNER JOIN ${constants.tableName.service_providers} sp ON sp.id = b.service_provider_id
                INNER JOIN ${constants.tableName.roles} rl ON sp.role_Id = rl.id
                LIMIT ${pageSize} OFFSET ${offset}
            `;
            let result = await commonoperation.queryAsync(selQuery);
            if(result)
            {
                let totalCount = `SELECT count(t.id) FROM ${constants.tableName.reviews} t`;
                let count = await commonoperation.queryAsync(totalCount);
                if(count)
                {
                    return({ totalCount: count[0]['count(t.id)'], reviews: result });
            
                }
                else
                {
                    return('err'); 
                }
            }
            else
            {
               return('err'); 
            }
        }
        else if(role[0].role_id === constants.Roles.service_provider)
        {
            let selQuery = `
                SELECT
                r.id,
                r.booking_id AS booking_id,
                c.name AS customer_name,
                c.email AS customer_email,
                v.vehicle_number AS vehicle_no,
                r.rating,
                r.review,
                r.status
                FROM ${constants.tableName.reviews} r
                INNER JOIN ${constants.tableName.bookings} b ON b.id = r.booking_id
                INNER JOIN ${constants.tableName.vehicles} v ON v.id = b.vehicle_id
                INNER JOIN ${constants.tableName.customers} c ON c.id = b.customer_id
                INNER JOIN ${constants.tableName.service_providers} sp ON sp.id = b.service_provider_id
                INNER JOIN ${constants.tableName.roles} rl ON sp.role_Id = rl.id
                WHERE sp.id = ${Id}
                AND rl.id = ${constants.Roles.service_provider}
                AND b.service_provider_id = ${Id}
                LIMIT ${pageSize} OFFSET ${offset}
            `;
            let result = await commonoperation.queryAsync(selQuery);
            if(result)
            {
                let totalCount =   `
                                        SELECT count(t.id) 
                                        FROM ${constants.tableName.reviews} t
                                        INNER JOIN ${constants.tableName.bookings} b ON b.id = t.booking_id
                                        WHERE b.service_provider_id = ${Id}
                                    `;
                let count = await commonoperation.queryAsync(totalCount);
                if(count)
                {
                    return({ totalCount: count[0]['count(t.id)'], reviews: result });
            
                }
                else
                {
                    return('err'); 
                }
            }
            else
            {
               return('err'); 
            }
        }
        else
        {
            return('err');
        }
    }

    static async addnewreview(Id, rating, review)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let selQuery = `INSERT INTO ${constants.tableName.reviews}(booking_id, rating, review, created_at) VALUES (${Id}, ${rating}, '${review}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                let result = await commonoperation.queryAsync(selQuery);
                if(result.affectedRows > 0)
                {
                    resolve('inserted');
                }
                else
                {
                    resolve('err')
                }
            });                                   
        }
        catch(error)
        {
            console.log(`Error from the 'addnewreview' model function.`, error);            
        }
    }

    static async updatestatus(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                const data = await commonfetching.dataOnCondition(constants.tableName.reviews, Id, 'id');
                if(data[0].status === constants.status.active)
                {
                    let UpdateQuery = ` UPDATE ${constants.tableName.reviews} r 
                                        SET r.status ='${constants.status.inactive}', 
                                        r.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                        WHERE r.id = '${Id}'`;
                    let result = await commonoperation.queryAsync(UpdateQuery);
                    if(result.affectedRows > 0)
                    {
                        resolve('updated');
                    }
                    else
                    {
                        resolve('updatedfailed');
                    }
                }
                else if(data[0].status === constants.status.inactive)
                {
                    let UpdateQuery = ` UPDATE ${constants.tableName.reviews} r 
                                        SET r.status ='${constants.status.active}', 
                                        r.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                        WHERE r.id = '${Id}'
                                    `;
                    let result = await commonoperation.queryAsync(UpdateQuery);
                    if(result.affectedRows > 0)
                    {
                        resolve('updated');
                    }
                    else
                    {
                        resolve('updatedfailed');
                    }
                }
                else
                {
                    resolve('err');  
                }
            })
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "updatestatus". Which is designed for changing the status of the driver.');            
        }
    };    
}