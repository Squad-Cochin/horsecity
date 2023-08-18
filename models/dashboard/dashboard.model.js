const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const con = require('../../configs/db.configs');



module.exports = class dashboard
{
    constructor(){}

    static async getdashboarddataforparticularcustomer(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log('Check Role Data At The time of dashboard data : ', checkRole);
                con.query(checkRole, async (err, result) =>
                {
                    // console.log(`Roles at the time of the get all of the Customers: `, result);
                    if(err)
                    {
                        console.log('Error while checking the role at the time of dashboard');
                        resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                    {
                        let query = `   SELECT
                                        (SELECT COUNT(id) FROM ${constants.tableName.customers}) AS total_customers,
                                        (SELECT COUNT(sp.id) FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.role_Id = r.id AND r.name = 'SERVICE PROVIDER' ) AS total_providers,
                                        (SELECT COUNT(id) FROM ${constants.tableName.vehicles}) AS total_vehicles,
                                        (SELECT COUNT(id) FROM ${constants.tableName.quotations}) AS total_quotations,
                                        (SELECT SUM(final_amount) FROM ${constants.tableName.invoices}) AS total_revenue`;
                        // console.log(`Dashboard query at the time of admin: `,query);
                        con.query(query, (err, result) =>
                        {
                            if(err)
                            {
                                console.log('Error while fetching the dashboard data');
                                resolve('err') 
                            }
                            else
                            {
                                if(result.length === 0)
                                {
                                    resolve({counts: result});
                                }
                                else
                                {
                                    resolve({counts: result})
                                }                                         
                            }
                        });
                    }
                    else if(result[0].role_id === constants.Roles.service_provider)
                    {
                        let Query = ` SELECT 
                                      COALESCE((SELECT COUNT(v.id) FROM ${constants.tableName.vehicles} v WHERE v.service_provider_id = ${Id}), 0) AS total_vehicles,
                                      COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.serviceprovider_id = ${Id}), 0) AS total_enquiries,
                                      COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.serviceprovider_id = ${Id}), 0) AS total_quotations,
                                      COALESCE((SELECT SUM(i.final_amount) FROM ${constants.tableName.invoices} i WHERE i.service_provider_id = ${Id}), 0) AS total_revenue
                                   `;
                        // console.log(`Dashboard query at the time of service provider : `,Query);
                        con.query(Query, (err, result) =>
                        {
                            if(err)
                            {
                                console.log('Error while fetching the dashboard data');
                                resolve('err') 
                            }
                            else
                            {
                                if(result.length === 0)
                                {
                                    resolve({counts: result});
                                }
                                else
                                {
                                    resolve({counts: result})
                                }
                            }
                        });
                    }
                });
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block. It is code for getting the data for the invoice page`);            
        }
        
    };

};