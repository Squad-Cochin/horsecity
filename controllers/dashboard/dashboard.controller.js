const e = require("express");
const dashboardData = require(`../../models/dashboard/dashboard.model`);


exports.getDashboardDataForParticularCustomer = async (req, res, next) =>
{
    const data = await dashboardData.getdashboarddataforparticularcustomer(req.params.id)
    if(data === 'err')
    {
        console.log(`Error while fetching the data for the dashboard`);
        res.status(200).send
        ({
            code : 500,
            status : false,
            message : "Internal server error while fetching the dashbord data"
        });
    }
    else
    {
        console.log(`Dashboard data fetched successfully`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Dashboard data fetched successfully",
            data : data
        });
    }

};