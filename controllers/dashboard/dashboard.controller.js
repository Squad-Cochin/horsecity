////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//      This is the dasboard controller file. We are having 2 dashboard. One is for the CUSTOMER and other    //
//      one is for the ADMIN OR SERVICE PROVIDER.                                                             //
//      This file is for the ADMIN OR SERVICE PROVIDER dashboard.                                             //
//      The logic of the code is mainlly written in the models. But how the data will be presented it will    //
//      done  from here. The calling of the models are done from the controller files.                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const dashboardData = require(`../../models/dashboard/dashboard.model`); // The model from where the logic is intantiate are written in dashboard model
const constant = require('../../utils/constants');

// The below will fetching the total counts for admin and service providers
/**
 * This are the data we will get from the this controller
        "total_providers": ,
        "total_customers": ,
        "total_vehicles": ,
        "total_drivers": ,
        "total_enquiries": ,
        "total_quotations": ,
        "total_revenue": 
 */
exports.getDashboardDataForParticularProvider = async (req, res, next) =>
{
    const data = await dashboardData.getdashboarddataforparticularprovider(req.params.id)
    if(data === 'err')
    {
        res.status(200).send
        ({
            code : 500,
            status : false,
            message: constant.responseMessage.universalError
        });
    }
    else
    {
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : data
        });
    }
};

// This below controller function will be used for fetching the data of monthly sales report
exports.getMontlySalesReport = async (req, res, next) =>
{
    const data = await dashboardData.getmonthlysalesreport(req.params.id);
    if(data === 'err')
    {
        res.status(200).send
        ({
            code : 500,
            status : false,
            message: constant.responseMessage.universalError
        });
    }
    else
    {
        // console.log(`Monthly sales report data fetched successfully`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : data
        });
    }
}

// The below controller function will be used for fetching all the quoation breakdown (ALL, CONFIMED, NOTCONFIRMED) data for the dashboard
exports.getDashboardQuotationStatus = async (req, res, next) =>
{
    const data = await dashboardData.getdashboardquotationstatus(req.params.id);
    if(data === 'err')
    {
        res.status(200).send
        ({
            code : 500,
            status : false,
            message: constant.responseMessage.universalError
        });
    }
    else
    {
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : data
        });
    }
};

// The below controller function will be used for fetching latest five enquires data for the dashboard
exports.getLatestEnquiries = async (req, res) =>
{
    const data = await dashboardData.getlatestenquiries(req.params.id);
    if(data === 'err')
    {
        res.status(200).send
        ({
            code : 500,
            status : false,
            message: constant.responseMessage.universalError
        });
    }
    else
    {
        // console.log(`Latest enquiries data for the dashboard fetched successfully `);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message: constant.responseMessage.getAll,
            data : data
        });
    }
};