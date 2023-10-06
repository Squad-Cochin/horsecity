
var review = require(`../../models/reviews/reviews.model`)
var constants = require(`../../utils/constants`);

exports.getAllReviews = async (req, res, next) =>
{
    let data = await review.getallreviews(req.body.page, req.body.limit, req.params.id)
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(data === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : data
        });
    }
}

exports.addNewReview = async (req, res, next) =>
{
    let data = await review.addnewreview(req.body.booking_id, req.body.rating, req.body.review);
    if(data === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
        });
    }
    else if(data == 'invalid')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Ratings must be between 1 to 5.`
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.insert,
        });
    }

};

exports.updateStatus= async (req, res) =>
{
    const reviews = await review.updatestatus(req.params.id);
    if(reviews === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    else if(reviews === 'updatedfailed')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.statusChanged
        });
    }
}

/**
 * The below function is for getting all the reviews of a particular vehicle details on the customer side 
 */
exports.getVehicleMoreRevewsForCustomerPage = async (req, res, next) =>
{
    // We need to add the vehicle id in the params
    // The below line is for going to the model function to implement the code for removing vehicle logic.
    const reviews = await review.getvehiclemorereviewsforcustomerpage(req.params.id);
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(reviews === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
            data : []
        });
    }
    // If the vehicle review data is not present, then this else if block of code will be executed. It will never come into play. But for safety purpose it is written because we are already checking the param id in the middleware 
    else if(reviews.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.getNoData,
            data : []
        });
    }
    else
    {
        // Everythings went well and vehicle review data is available then this else block of code will executed.
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : reviews
        });
    }
};