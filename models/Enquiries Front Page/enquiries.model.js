


const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs');

module.exports = class enquiries
{
    static async createnewenquiry(Id, vehicle_Id, service_provider_Id, pickup_Location, drop_Location, trip_Type, pickup_Country, drop_Country, horse, description)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                let insQuery = `INSERT INTO ${constants.tableName.enquiries}(customer_id, vehicle_id, serviceprovider_id, pickup_location, drop_location, trip_type, pickup_country, drop_country, no_of_horse, description, status, created_at) VALUES(
                ${Id}, ${vehicle_Id}, ${service_provider_Id}, '${pickup_Location}', '${drop_Location}', '${trip_Type}', '${pickup_Country}', '${drop_Country}', '${horse}', '${description}', '${constants.enquiry_status.notconfirmed}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' )`;
                // console.log(`Insert into enquiries table query: `, insQuery);
                con.query(insQuery, (err, result) =>
                {
                    // console.log(`Result when we enter into the enquiry table: `, result);
                    if(err)
                    {
                        console.log(`Error while execting the inserting into the enquiry table`);
                        resolve(`err`);
                    }
                    else
                    {
                        if(result.affectedRows > 0)
                        {
                            console.log('Enquiry data added successfully');
                            resolve('inserted');
                        }
                        else
                        {
                            console.log(`Error from the result section of the insert into the enquiry table`);
                            resolve('err')
                        }
                    }
                });
            });
        }
        catch (error)
        {
            console.log('Error while creating a new enquiry from the customer end.', error);           
        }
    };

    static async getparticularcustomerallenquiries(pageNumber, pageSize,Id)
    {
        try
        {
            return await new Promise(async (resolve, reject) =>
            {
                const offset = (pageNumber - 1) * pageSize;
                let selQuery = `SELECT * FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${Id} LIMIT ${pageSize} OFFSET ${offset}`;
                // console.log(selQuery);
                con.query(selQuery, (err, result) =>
                {
                    // console.log(result);
                    if(err)
                    {
                        console.log(`Error while execting the fetching of all the enquiries of a particular customers.`);
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
                                    console.log(`Error while execting the fetching of all the enquiries of a particular customers.`);
                                    resolve(`err`);
                                }
                                else
                                {
                                    console.log(result2);
                                    if(result2.length > 0)
                                    {
                                        console.log(`Enquiry count is successfully done for a particular customer`);
                                        console.log('Enquiry data is fetched successfully for a particular customer');
                                        resolve({totalCount : result2[0]['COUNT(e.id)'], enquiries : result});
                                    }
                                    else
                                    {
                                        console.log(`Error while enquiry count for a particular customer`);
                                        console.log(`Enquiry data is fetched successfully for a particular customer`);
                                        resolve({totalCount : result2[0]['COUNT(e.id)'], enquiries : result});                                     
                                    }
                                }
                            });
                        }
                        else
                        {
                            console.log(`Error from the result section of the fetching all the enquiried of a particular customer.`);
                            resolve(resolve({totalCount : 0, enquiries : []} ));
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

