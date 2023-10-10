var reviewController = require(`../../controllers//reviews/reviews.controller`);
var checkInput = require(`../../middlewares/validateInput/checkRequestBodyInput`);
const constants = require("../../utils/constants");
const url = require(`../../utils/url_helper`);
const { verifyToken } = require("../../middlewares/requestValidator");
const { isValidIdInTheParams } = require("../../middlewares/validateInput/checkRequestparams");


module.exports = function (app)
{
    app.post(`${url.reviews.POST_GETALL_REVIEWS}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.service_providers),
    checkInput.getAllDataBody,
    reviewController.getAllReviews);

    app.post(`${url.reviews.POST_ADD_REVIEWS}`,
    verifyToken,
    checkInput.isIdEntered('booking_id', constants.tableName.bookings, 'Booking'),
    reviewController.addNewReview);
    
    app.put(`${url.reviews.PUT_UPDATE_REVIEW_STATUS}`,
    verifyToken,
    isValidIdInTheParams(constants.tableName.reviews),
    reviewController.updateStatus);

    app.get(`${url.reviews.GET_PARTICUALR_VEHICLE_DATA_NEXTJS}`, 
    verifyToken,
    isValidIdInTheParams(constants.tableName.vehicles),
    reviewController.getVehicleMoreRevewsForCustomerPage);
};