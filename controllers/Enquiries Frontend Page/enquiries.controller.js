////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the enquiries controller file. Logics are written in model file and data we are showing in     //
//     the response. It will be fetched from the model file. But how the data will be displayed in the        //
//     response it will done from here. The calling of the models are done from the controller files.         //                                        //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var enquiriesModel = require('../../models/Enquiries Front Page/enquiries.model'); // The model from where the logic is intantiate are written in enquiries model
const time = require('../../utils/helper/date'); // All the time related formating are written in this file

/**
 * The below function is for creating new enquiry. This is for NEXT JS front end 
 */
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
        req.body.description,
        time.changeDateToSQLFormat(req.body.pickup_date)
        );
    if(data === 'err') 
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: `Booking failed !`,
        });
    }
    if(data === 'inserted')
    {
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : 'Successfully Booked !'
        });
    }
};

/**
 * The below function is for fetching all enquiries of a particular customer on the basis of customer id. 
 * This is for NEXT JS front end 
 */
exports.getParticularCustomerAllEnquiries = async (req, res, next) =>
{
    const data = await enquiriesModel.getparticularcustomerallenquiries(req.body.page, req.body.limit, req.params.id);
    if(data === 'err')
    {
        return res.status(200).json
        ({
            code: 400,
            status: false,
            message: `Unable to fetch enquiry data for customer.`,
        });
    }
    else if (data.length === 0)
    {
        return res.status(200).json
        ({
            code: 200,
            status: true,
            message: `No enquiry found for this customer.`,
            data : []
        });
    }
    else
    {
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : `Successfully fetched all enquiries for customer.`,
            data : data
        });
    }
};