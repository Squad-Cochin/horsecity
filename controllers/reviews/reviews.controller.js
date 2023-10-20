////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the review controller file. The logic of the code is mainlly written in the models. The        //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var review = require(`../../models/reviews/reviews.model`) // The model from where the logic is intantiate are written in invoice model
var defaults = require(`../../utils/default`); // Default elements are stored in this file

/**
 * The below function is for getting all the reviews details. Those reviews who deleted at feild are having
 * 'NULL' only those details will be shown or fetched.
 */
exports.getAllReviews = async (req, res, next) =>
{
    let data = await review.getallreviews(req.body.page, req.body.limit, req.params.id)
    // If any unwanted, unencounter, or unconventionaal error came then this else if block of code will be executed.
    if(data === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, data, res);
    }
}

/**
 * The below function is for the adding new review. We need number of input
 * from the end user to add the review. 
 */
exports.addNewReview = async (req, res, next) =>
{
    let data = await review.addnewreview(req.body.booking_id, req.body.rating, req.body.review);
    if(data === 'err')
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    else if(data == 'invalid')
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.invalidRating, 0, res);
    }
    else
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.reviewadded, 0, res);
    }
};

/**
 * The below function is for updating the status of the review.
 */
exports.updateStatus= async (req, res) =>
{
    const reviews = await review.updatestatus(req.params.id);
    if(reviews)
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.statusChanged, 0, res);
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
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    }
    // If the vehicle review data is not present, then this else if block of code will be executed. It will never come into play. But for safety purpose it is written because we are already checking the param id in the middleware 
    else if(reviews.length === 0)
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.getNoData, 0, res);
    }
    else
    {
        // Everythings went well and vehicle review data is available then this else block of code will executed.
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, reviews, res);
    }
};