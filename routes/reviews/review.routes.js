var reviewController = require(`../../controllers//reviews/reviews.controller`);
const { verifyToken } = require("../../middlewares/requestValidator");
var checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams");
const constants = require("../../utils/constants");



module.exports = function (app)
{
    app.post(`/${process.env.apiToken}/getAll/reviews/:id`,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.getAllDataBody,
    reviewController.getAllReviews);

    app.post(`/add/review`,
    verifyToken,
    checkInput.isIdEntered('booking_id', constants.tableName.bookings, 'Booking'),
    reviewController.addNewReview);
    
    app.put(`/${process.env.apiToken}/update/status/reviews/:id`,
    isValidIdInTheParams(constants.tableName.reviews),
    reviewController.updateStatus);

    app.get(`/customer/getOne/vehicle/more/details/:id`, 
    verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles),
    reviewController.getVehicleMoreRevewsForCustomerPage);

};