
/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is Enquiries model file. Where all the logic of the enquirie part is written.    //
//   The file's function will be used in the front of the customer. NEXTJS                 //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection

module.exports = class enquiries
{
    // The below model function is used creating new enquiries. This is for the frontend of the customer(NEXTJS)
    static async createnewenquiry(Id, vehicle_Id, service_provider_Id, pickup_Location, drop_Location, trip_Type, pickup_Country, drop_Country, horse, description,pickup_date)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                if (new Date(pickup_date) < new Date())
                {
                    resolve(`err`);
                }
                else
                {
                    let insQuery = `INSERT INTO ${constants.tableName.enquiries}(customer_id, vehicle_id, serviceprovider_id, pickup_location, drop_location, trip_type, pickup_country, drop_country, no_of_horse,pickup_date, description, status, created_at) VALUES(
                    ${Id}, ${vehicle_Id}, ${service_provider_Id}, '${pickup_Location}', '${drop_Location}', '${trip_Type}', '${pickup_Country}', '${drop_Country}', '${horse}','${pickup_date}', '${description}', '${constants.enquiry_status.notconfirmed}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' )`;
                    con.query(insQuery, (err, result) =>
                    {
                        if(err)
                        {
                            resolve(`err`);
                        }
                        else
                        {
                            if(result.affectedRows > 0)
                            {
                                resolve('inserted');
                            }
                            else
                            {
                                resolve('err')
                            }
                        }
                    });
                }
            });
        }
        catch (error)
        {
            console.log('Error while creating a new enquiry from the customer end.', error);           
        }
    };

    // The below model function is used for fetching all the enquiries of a  customer on the basis of customer id in the params. This is for the frontend of the customer(NEXTJS)
    static async getparticularcustomerallenquiries(pageNumber, pageSize,Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                const offset = (pageNumber - 1) * pageSize;
                let selQuery = `SELECT * FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id} LIMIT ${pageSize} OFFSET ${offset}`;
                con.query(selQuery, (err, result) =>
                {
                    if(err)
                    {
                        resolve(`err`);
                    }
                    else
                    {
                        if(result.length > 0)
                        {
                            let countQuery = `SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id}`
                            con.query(countQuery, (err, result2) =>
                            {
                                if(err)
                                {
                                    resolve(`err`);
                                }
                                else
                                {
                                    if(result2.length > 0)
                                    {
                                        resolve({totalCount : result2[0]['COUNT(e.id)'], enquiries : result});
                                    }
                                    else
                                    {
                                        resolve({totalCount : result2[0]['COUNT(e.id)'], enquiries : result});                                     
                                    }
                                }
                            });
                        }
                        else
                        {
                            resolve({totalCount : 0, enquiries : []} );
                        }
                    }
                });
            });            
        }
        catch (error)
        {
            console.log('Error while fetching all enquiries of the customer from the customer end.', error);
        }
    };
};

