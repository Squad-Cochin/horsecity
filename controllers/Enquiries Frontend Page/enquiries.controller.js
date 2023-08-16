

var enquiriesModel = require('../../models/Enquiries Front Page/enquiries.model');

exports.createNewEnquiry = async (req, res, next) =>
{
    const data = await enquiriesModel.createnewenquiry(
        req.params.id,
        // req.body.customer_id,
        req.body.vehicle_id,
        req.body.service_provider_id,
        req.body.pickup_location,
        req.body.drop_location,
        req.body.vehicle_type,
        req.body.pickup_country,
        req.body.drop_country,
        req.body.no_of_horse,
        req.body.description);

    if(data === 'err')
    {
        console.log('Error while inserting the enquiry data ');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: `Error while creating the enquiry from customer`,
        });
    }

    if(data === 'inserted')
    {
        console.log(`Customer enquiry added`);
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : 'Customer enquiry added'
        });
    }
};

exports.getParticularCustomerAllEnquiries = async (req, res, next) =>
{
    const data = await enquiriesModel.getparticularcustomerallenquiries(req.body.page, req.body.limit, req.params.id);
    if(data === 'err')
    {
        console.log('Error while fetching the enquiry data of a particular customer. ');
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: `Error while fetching the enquiry data of a particular customer.`,
        });
    }
    else if (data.length === 0)
    {
        console.log('No enquiry present of this particular customers. ');
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `No enquiry present of this particular customers.`,
            data : []
        });
    }
    else
    {
        console.log(`Particular customer all the enquiry fetched successfully.`);
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : 'Particular customer all the enquiry fetched successfully.',
            data : data
        });
    }
};