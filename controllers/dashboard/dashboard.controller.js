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

exports.getMontlySalesReport = async (req, res, next) =>
{
    const data = await dashboardData.getmonthlysalesreport(req.params.id);
    if(data === 'err')
    {
        console.log(`Error while fetching the monthly sales report`);
        res.status(200).send
        ({
            code : 500,
            status : false,
            message : "Internal server error while fetching the monthly sales report"
        });
    }
    else
    {
        console.log(`Monthly sales report data fetched successfully`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Monthly sales data fetched successfully",
            data : data
        });
    }
}


exports.getDashboardQuotationStatus = async (req, res, next) =>
{
    const data = await dashboardData.getdashboardquotationstatus(req.params.id);
    if(data === 'err')
    {
        console.log(`Error while fetching the quotation data for the dashboard`);
        res.status(200).send
        ({
            code : 500,
            status : false,
            message : "Internal server error while fetching the quotation data for the dashboard"
        });
    }
    else
    {
        console.log(`Quotation data for the dashboard fetched successfully`);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Quotation data for the dashboard fetched successfully fetched successfully",
            data : data
        });
    }
};

exports.getLatestEnquiries = async (req, res) =>
{
    const data = await dashboardData.getlatestenquiries(req.params.id);
    if(data === 'err')
    {
        console.log(`Error while fetching the latest enquiries for the dashboard`);
        res.status(200).send
        ({
            code : 500,
            status : false,
            message : "Internal server error while fetching the latest enquiries data for the dashboard"
        });
    }
    else
    {
        console.log(`Latest enquiries data for the dashboard fetched successfully `);
        res.status(200).send
        ({
            code : 200,
            status : true,
            message : "Latest enquiries data for the dashboard fetched successfully ",
            data : data
        });
    }
};