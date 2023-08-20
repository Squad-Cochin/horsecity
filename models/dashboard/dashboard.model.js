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
                                        COALESCE((SELECT COUNT(sp.id) FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.role_Id = r.id AND r.name = 'SERVICE PROVIDER' ), 0) AS total_providers,
                                        COALESCE((SELECT COUNT(id) FROM ${constants.tableName.customers}), 0) AS total_customers,
                                        COALESCE((SELECT COUNT(id) FROM ${constants.tableName.vehicles}), 0) AS total_vehicles,
                                        COALESCE((SELECT COUNT(id) FROM ${constants.tableName.drivers}), 0) AS total_drivers,
                                        COALESCE((SELECT COUNT(id) FROM ${constants.tableName.enquiries}), 0) AS total_enquiries,
                                        COALESCE((SELECT COUNT(id) FROM ${constants.tableName.quotations}), 0) AS total_quotations,
                                        COALESCE((SELECT SUM(final_amount) FROM ${constants.tableName.invoices}), 0) AS total_revenue`;
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
                    else
                    {
                        console.log('I think the role name which we got is not present in the database at the time of dashboard');
                        resolve('err');
                    }
                });
            });
        }
        catch (error)
        {
            console.log(`Error from the try catch block. It is code for getting the data for the invoice page`);            
        }        
    };

    static async getmonthlysalesreport(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log('Check Role Data At The time of fetching monthly sales report: ', checkRole);
                con.query(checkRole, async (err, result) =>
                {
                    // console.log(`Roles at the time of the get all of fetching monthly sales report: `, result);
                    if(err)
                    {
                        console.log('Error while checking the role at the time of fetching monthly sales report');
                        resolve('err') 
                    }
                    else
                    {
                        var report =
                        {
                            "months" : [],
                            "revenue" : []
                        };

                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            // let query = `   SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, MONTHNAME(created_at) AS month_name, SUM(final_amount) AS total_final_amount
                            //                 FROM ${constants.tableName.invoices}
                            //                 GROUP BY YEAR(created_at), MONTH(created_at), MONTHNAME(created_at)
                            //                 ORDER BY YEAR(created_at), MONTH(created_at)`;

                            let query = `   SELECT YEAR(created_at) AS year, 
                                            MONTH(created_at) AS month, 
                                            MONTHNAME(created_at) AS month_name, 
                                            SUM(final_amount) AS total_final_amount
                                            FROM invoices
                                            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
                                            GROUP BY YEAR(created_at), MONTH(created_at), MONTHNAME(created_at)
                                            ORDER BY YEAR(created_at), MONTH(created_at)`;
                            
                            console.log(`Dashboard query at the time of admin: `, query);

                            con.query(query, (err, result) =>
                            {
                                if(err)
                                {
                                    console.log('Error while fetching the dashboard data');
                                    resolve('err') 
                                }
                                else
                                {
                                    // console.log(result);
                                    if(result.length === 0)
                                    {
                                        resolve({revenue: result});
                                    }
                                    else
                                    {
                                        resolve({revenue: result})
                                    }                                         
                                }
                            });
                        }
                        else if(result[0].role_id === constants.Roles.service_provider)
                        {
                            let Query = `   SELECT
                                            YEAR(i.created_at) AS year,
                                            MONTH(i.created_at) AS month,
                                            SUM(i.final_amount) AS total_final_amount
                                            FROM ${constants.tableName.invoices} i
                                            JOIN
                                                ${constants.tableName.roles} r ON i.service_provider_id = r.id AND r.name = 'SERVICE PROVIDER' AND r.id = ${Id}
                                            GROUP BY
                                                YEAR(i.created_at),
                                                MONTH(i.created_at)
                                            ORDER BY
                                                YEAR(i.created_at),
                                                MONTH(i.created_at)`;
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
                                        resolve({revenue: result});
                                    }
                                    else
                                    {
                                        resolve({revenue: result})
                                    }
                                }
                            });
                        }
                        else
                        {
                            console.log('I think the role name which we got is not present in the database at the time of dashboard');
                            resolve('err');
                        }
                    }
                });                               
            });            
        }
        catch (error)
        {
            console.log(`Error from the try catch block of the getmonthlysalesreport models in the dashboard.model.js file.`);            
        }
    };

};