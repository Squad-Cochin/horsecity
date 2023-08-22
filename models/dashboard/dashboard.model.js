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
                                      COALESCE((SELECT COUNT(ad.id) FROM ${constants.tableName.assign_drivers} ad WHERE ad.service_provider_id = ${Id} AND ad.deleted_at IS NULL), 0) AS total_drivers,
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
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM ${constants.tableName.service_providers} sp, ${constants.tableName.roles} r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
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
                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            // let query = `   SELECT YEAR(created_at) AS year, MONTH(created_at) AS month, MONTHNAME(created_at) AS month_name, SUM(final_amount) AS total_final_amount
                            //                 FROM ${constants.tableName.invoices}
                            //                 GROUP BY YEAR(created_at), MONTH(created_at), MONTHNAME(created_at)
                            //                 ORDER BY YEAR(created_at), MONTH(created_at)`;
                            let query = `   SELECT
                                            YEAR(created_at) AS year, 
                                            MONTH(created_at) AS month, 
                                            LEFT(MONTHNAME(created_at), 3) AS month_name, 
                                            SUM(final_amount) AS total_final_amount
                                            FROM ${constants.tableName.invoices}
                                            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
                                            GROUP BY YEAR(created_at), MONTH(created_at), LEFT(MONTHNAME(created_at), 3)
                                            ORDER BY YEAR(created_at), MONTH(created_at)`;
                            
                            // console.log(`Dashboard query at the time of admin: `, query);

                            con.query(query, async(err, result) =>
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
                                        let revenue = custoizeMonthlySalesReport(result);
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
                                        let revenue = custoizeMonthlySalesReport(result);
                                        resolve({revenue})
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

    static async getdashboardquotationstatus(Id)
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
                                    console.log('Error while fetching quotation for the dahboard');
                                    resolve('err') 
                                }
                                else
                                {
                                    // console.log(result);
                                    if(result.length === 0)
                                    {
                                        resolve({result});
                                    }
                                    else
                                    {
                                        let quoatationData = customizeQuotationStatusReport(result);
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
                            FROM ${constants.tableName.quotations} q WHERE q.serviceprovider_id = ${Id}`;
                            // console.log('Query: ', Query);
                            con.query(Query, async (err, result) =>
                            {
                                if(err)
                                {
                                    console.log('Error while fetching quotation for the dahboard');
                                    resolve('err') 
                                }
                                else
                                {
                                    // console.log(result);
                                    if(result.length === 0)
                                    {
                                        resolve({result});
                                    }
                                    else
                                    {
                                        let quoatationData = customizeQuotationStatusReport(result);
                                        resolve(quoatationData)
                                    }                                         
                                }
                            });
                        }
                        else
                        {
                            console.log('I think the role name which we got is not present in the database at the time of getting quotaion data');
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

    static async getlatestenquiries(Id)
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
                        if(result[0].role_id === constants.Roles.admin || result[0].role_id === constants.Roles.super_admin)
                        {
                            let query = `SELECT e.id, c.user_name, c.name, DATE_FORMAT(e.created_at, '%d %b, %Y') AS date, e.pickup_location, e.no_of_horse, e.drop_location, e.status
                                        FROM enquiries e, customers c
                                        WHERE e.status <> 'NOTCONFIRMED' AND e.customer_id = c.id
                                        ORDER BY e.created_at DESC
                                        LIMIT 5`;
                                        // console.log(`Query: `, query);
                                        con.query(query, async(err, result) =>
                                        {
                                            if(err)
                                            {
                                                console.log('Error while fetching latest enquiry for the dahboard', err);

                                                resolve('err') 
                                            }
                                            else
                                            {
                                                // console.log(result);
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
                            let query = `SELECT e.id, c.user_name, c.name, DATE_FORMAT(e.created_at, '%d %b, %Y') AS date, e.pickup_location, e.no_of_horse, e.drop_location, e.status
                            FROM enquiries e, customers c
                            WHERE e.status <> 'NOTCONFIRMED' AND e.customer_id = c.id AND e.serviceprovider_id = ${Id}
                            ORDER BY e.created_at DESC
                            LIMIT 5`;
                            con.query(query, async(err, result) =>
                            {
                                if(err)
                                {
                                    console.log('Error while fetching latest enquiry for the dahboard', err);
                                    resolve('err') 
                                }
                                else
                                {
                                    // console.log(result);
                                    if(result.length === 0)
                                    {
                                        resolve(result);
                                    }
                                    else
                                    {
                                        resolve(result);
                                        // let quoatationData = customizeQuotationStatusReport(result);
                                        // resolve(quoatationData)
                                    }                                         
                                }
                            });
                        }
                        else
                        {
                            console.log('I think the role name which we got is not present in the database at the time of getting quotaion data');
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


const custoizeMonthlySalesReport = (salesData) =>
{
    var monthlySalesData =
    {
        series: [
            {
                name: "Revenue",
                type: "column",
                data: salesData.map(item => parseFloat(item.total_final_amount)),
            },
        ],
      
        options:
        {
            chart:
            {
                stacked: false,
                toolbar: 
                {
                    show: false,
                },
            },
          stroke: {
            width: [0, 0.5, 1],
            curve: "smooth",
            dashArray: [0, 8, 5],
          },
          plotOptions: {
            bar: {
              columnWidth: "18%",
            },
          },
          colors: ["#0ab39c", "rgba(212, 218, 221, 0.18)", "rgb(251, 77, 83)"],
      
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
      
        //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          markers:
          {
            size: 0,
          },
          legend:
          {
            offsetY: 11,
          },
          xaxis:
          {
            title:
            {
              text: "Months",
            },
            type: "category", // Changed type to "category" for month labels
            categories: salesData.map(item => item.month_name), // Use month names as categories
          },
      
          yaxis:
          {
            title:
            {
              text: "Revenue",
            },
          },
      
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " Total Invoice";
                }
                return y;
              },
            },
          },
      
          grid: {
            borderColor: "#f1f1f1",
          },
        },
    };
    
    return monthlySalesData ;
}

const customizeQuotationStatusReport = (data) =>
{
    var OrderStatusData = [
        {
            id: 1,
            title: "Confirmed",
            icon: "ri-checkbox-circle-line",
            color: "success",
            width: data[0].total_confirmed,
        },
        {
            id: 2,
            title: "Not Confirmed",
            icon: "ri-close-circle-line",
            color: "warning",
            width: data[0].total_not_confirmed,
        },
        {
            id: 3,
            title: "Total Quotations",
            icon: "ri-add-circle-line",
            color: "primary",
            width: data[0].total_quotations,
        },
    ]
    return OrderStatusData;
}