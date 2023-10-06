
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