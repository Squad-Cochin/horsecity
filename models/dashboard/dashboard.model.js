/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is dashboard model file. Where all the logic of the dashboard page  is written.  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection
const objectConvertor = require('../../utils/objectConvertor');

module.exports = class dashboard
{
    constructor(){}

    /**
     * The below model function is for fetching the counts for the SERVICE PROVIDER or ADMIN dashboard page.
     * This are the following counts we will show on the dashboard page.
        "total_providers": " ",
        "total_customers": " ",
        "total_vehicles": " ",
        "total_drivers": " ",
        "total_enquiries": " ",
        "total_quotations": " ",
        "total_revenue": " ",
     */
    static async getdashboarddataforparticularprovider(Id)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                    {
                        // let query = `   SELECT
                        //                 COALESCE((SELECT COUNT(sp.id) FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.role_Id = r.id AND r.name = 'SERVICE PROVIDER' ), 0) AS total_providers,
                        //                 COALESCE((SELECT COUNT(id) FROM ${constants.tableName.customers}), 0) AS total_customers,
                        //                 COALESCE((SELECT COUNT(id) FROM ${constants.tableName.vehicles}), 0) AS total_vehicles,
                        //                 COALESCE((SELECT COUNT(id) FROM ${constants.tableName.drivers}), 0) AS total_drivers,
                        //                 COALESCE((SELECT COUNT(id) FROM ${constants.tableName.enquiries}), 0) AS total_enquiries,
                        //                 COALESCE((SELECT COUNT(id) FROM ${constants.tableName.quotations}), 0) AS total_quotations,
                        //                 COALESCE((SELECT SUM(final_amount) FROM ${constants.tableName.invoices}), 0) AS total_revenue`;
                        let query = `   SELECT
                                        COALESCE((SELECT COUNT(sp.id) FROM ${constants.tableName.service_providers} sp, roles r WHERE sp.role_Id = r.id AND r.name = 'SERVICE PROVIDER' ), 0) AS total_providers,
                                        COALESCE((SELECT COUNT(c.id) FROM ${constants.tableName.customers} c where c.deleted_at IS NULL), 0) AS total_customers,
                                        COALESCE((SELECT COUNT(v.id) FROM ${constants.tableName.vehicles} v where v.deleted_at IS NULL), 0) AS total_vehicles,
                                        COALESCE((SELECT COUNT(d.id) FROM ${constants.tableName.drivers} d where d.deleted_at IS NULL), 0) AS total_drivers,
                                        COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e), 0) AS total_enquiries,
                                        COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q where q.deleted_at IS NULL), 0) AS total_quotations,
                                        COALESCE((SELECT SUM(i.final_amount) FROM ${constants.tableName.invoices} i WHERE i.deleted_at IS NULL AND i.status <> "INACTIVE"), 0) AS total_revenue
                                    `;
                        con.query(query, (err, result) =>
                        {
                            if(err)
                            {
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
                        // let Query = ` SELECT
                        //               COALESCE((SELECT COUNT(v.id) FROM ${constants.tableName.vehicles} v WHERE v.service_provider_id = ${Id}), 0) AS total_vehicles,
                        //               COALESCE((SELECT COUNT(ad.id) FROM ${constants.tableName.assign_drivers} ad WHERE ad.service_provider_id = ${Id} AND ad.deleted_at IS NULL), 0) AS total_drivers,
                        //               COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.serviceprovider_id = ${Id}), 0) AS total_enquiries,
                        //               COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.serviceprovider_id = ${Id}), 0) AS total_quotations,
                        //               COALESCE((SELECT SUM(i.final_amount) FROM ${constants.tableName.invoices} i WHERE i.service_provider_id = ${Id}), 0) AS total_revenue
                        //            `;

                    let Query = `   SELECT
                                    COALESCE((SELECT COUNT(v.id) FROM ${constants.tableName.vehicles} v WHERE v.service_provider_id = ${Id} AND v.deleted_at IS NULL), 0) AS total_vehicles,
                                    COALESCE((SELECT COUNT(ad.id) FROM ${constants.tableName.assign_drivers} ad WHERE ad.service_provider_id = ${Id} AND ad.deleted_at IS NULL), 0) AS total_drivers,
                                    COALESCE((SELECT COUNT(e.id) FROM ${constants.tableName.enquiries} e WHERE e.serviceprovider_id = ${Id}), 0) AS total_enquiries,
                                    COALESCE((SELECT COUNT(q.id) FROM ${constants.tableName.quotations} q WHERE q.serviceprovider_id = ${Id} AND q.deleted_at IS NULL), 0) AS total_quotations,
                                    COALESCE((SELECT SUM(i.final_amount) FROM ${constants.tableName.invoices} i WHERE i.service_provider_id = ${Id} AND i.deleted_at IS NULL AND i.status <> "${constants.status.inactive}"), 0) AS total_revenue
                                `;
                        con.query(Query, (err, result) =>
                        {
                            if(err)
                            {
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

    /**
     * The below model function is for fetching the data we need to show in the monthly sales report for the SERVICE PROVIDER or ADMIN dashboard page.
     */
    static async getmonthlysalesreport(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    else
                    {
                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            let query = `   SELECT
                                            YEAR(created_at) AS year, 
                                            MONTH(created_at) AS month, 
                                            LEFT(MONTHNAME(created_at), 3) AS month_name, 
                                            SUM(final_amount) AS total_final_amount
                                            FROM ${constants.tableName.invoices}
                                            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
                                            GROUP BY YEAR(created_at), MONTH(created_at), LEFT(MONTHNAME(created_at), 3)
                                            ORDER BY YEAR(created_at), MONTH(created_at)`;                            
                            con.query(query, async(err, result) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    if(result.length === 0)
                                    {
                                        let revenue = objectConvertor.customizeMonthlySalesReportForReactFrontEnd(result);
                                        resolve({revenue});
                                    }
                                    else
                                    {
                                        let revenue = objectConvertor.customizeMonthlySalesReportForReactFrontEnd(result);
                                        resolve({revenue})
                                    }                                         
                                }
                            });
                        }
                        else if(result[0].role_id === constants.Roles.service_provider)
                        {
                            let Query = `   SELECT
                                            YEAR(i.created_at) AS year,
                                            MONTH(i.created_at) AS month,
                                            LEFT(MONTHNAME(i.created_at), 3) AS month_name, 
                                            SUM(i.final_amount) AS total_final_amount
                                            FROM ${constants.tableName.invoices} i
                                            WHERE i.service_provider_id = ${Id}
                                            GROUP BY YEAR(i.created_at), MONTH(i.created_at)
                                            ORDER BY YEAR(i.created_at), MONTH(i.created_at)`;
                            con.query(Query, (err, result) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    if(result.length === 0)
                                    {
                                        let revenue = objectConvertor.customizeMonthlySalesReportForReactFrontEnd(result);
                                        resolve({revenue});
                                    }
                                    else
                                    {
                                        let revenue = objectConvertor.customizeMonthlySalesReportForReactFrontEnd(result);
                                        resolve({revenue})
                                    }
                                }
                            });
                        }
                        else
                        {
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

    /**
     * The below model function is for fetching all the quoation breakdown (ALL, CONFIMED, NOTCONFIRMED) data for the SERVICE PROVIDER or ADMIN dashboard page.
     */
    static async getdashboardquotationstatus(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    else
                    {
                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            let Query = `   SELECT
                                            COUNT(*) AS total_quotations,
                                            COALESCE(SUM(CASE WHEN status = '${constants.quotation_status.confirmed}' THEN 1 ELSE 0 END), 0) AS total_confirmed,
                                            COALESCE(SUM(CASE WHEN status = '${constants.quotation_status.notconfirmed}' THEN 1 ELSE 0 END), 0) AS total_not_confirmed
                                            FROM ${constants.tableName.quotations}`;
                            con.query(Query, async(err, result) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    if(result.length === 0)
                                    {
                                        resolve({result});
                                    }
                                    else
                                    {
                                        let quoatationData = objectConvertor.customizeQuotationStatusReportForReactFrontEnd(result);
                                        resolve(quoatationData)
                                    }                                         
                                }
                            });
                        }
                        else if(result[0].role_id === constants.Roles.service_provider)
                        {
                            let Query = `SELECT
                            COUNT(*) AS total_quotations,
                            COALESCE(SUM(CASE WHEN status = '${constants.quotation_status.confirmed}' THEN 1 ELSE 0 END), 0) AS total_confirmed,
                            COALESCE(SUM(CASE WHEN status = '${constants.quotation_status.notconfirmed}' THEN 1 ELSE 0 END), 0) AS total_not_confirmed
                            FROM ${constants.tableName.quotations} q 
                            WHERE q.serviceprovider_id = ${Id}`;
                            con.query(Query, async (err, result) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    if(result.length === 0)
                                    {
                                        resolve({result});
                                    }
                                    else
                                    {
                                        let quoatationData = objectConvertor.customizeQuotationStatusReportForReactFrontEnd(result);
                                        resolve(quoatationData)
                                    }                                         
                                }
                            });
                        }
                        else
                        {
                            resolve('err');
                        }
                    }
                });
            });
        }
        catch(error)
        {
            console.log(`Error from the try catch block of the getdashboardquotationstatus models in the dashboard.model.js file.`);            
        }
    }

    /**
     * The below model function is for fetching the latest 5 enquiries data for the SERVICE PROVIDER or ADMIN dashboard page.
     */
    static async getlatestenquiries(Id)
    {
        try
        {
            return await new Promise(async (resolve, reject)=>
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                con.query(checkRole, async (err, result) =>
                {
                    if(err)
                    {
                        resolve('err') 
                    }
                    else
                    {
                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            let query = `SELECT e.id, c.user_name, c.name, DATE_FORMAT(e.created_at, '%d %b, %Y') AS date, e.pickup_location, e.no_of_horse, e.drop_location, e.status
                                        FROM enquiries e, customers c
                                        WHERE e.customer_id = c.id
                                        ORDER BY e.created_at DESC
                                        LIMIT 5`;
                                        con.query(query, async(err, result) =>
                                        {
                                            if(err)
                                            {
                                                resolve('err') 
                                            }
                                            else
                                            {
                                                if(result.length === 0)
                                                {
                                                    resolve(result);
                                                }
                                                else
                                                {
                                                    resolve(result)
                                                    // let quoatationData = customizeQuotationStatusReport(result);
                                                    // resolve(quoatationData)
                                                }                                         
                                            }
                                        });
                                    
                        }
                        else if(result[0].role_id === constants.Roles.service_provider)
                        {
                            let query = `SELECT e.id, c.user_name, c.name, DATE_FORMAT(e.created_at, '%d %b, %Y') AS date, e.pickup_location, e.no_of_horse, e.drop_location, e.status FROM enquiries e, customers c WHERE e.serviceprovider_id = ${Id} AND e.customer_id = c.id ORDER BY e.created_at DESC LIMIT 5`;
                            con.query(query, async(err, result) =>
                            {
                                if(err)
                                {
                                    resolve('err') 
                                }
                                else
                                {
                                    if(result.length === 0)
                                    {
                                        resolve(result);
                                    }
                                    else
                                    {
                                        resolve(result);
                                    }                                         
                                }
                            });
                        }
                        else
                        {
                            resolve('err');
                        }
                    }
                });
            });
        }
        catch(error)
        {
            console.log(`Error from the try catch block of the getLatestEnquiries models in the dashboard.model.js file.`);
        }
    }
};

