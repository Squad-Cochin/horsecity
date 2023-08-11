


const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs')



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

};

