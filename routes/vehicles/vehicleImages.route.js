//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the vehicleImages.route.file . Where all the routes of the vehicleImages.controller.js is        //
//     written. If anyone want to use any function of the vehicleImages.controller.js file from the frontend.   //
//     Then they have to use the routes which are listed in this file.                                          //                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var url = require(`../../utils/url_helper`);
var constants = require('../../utils/constants');
var checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`);
var vehicleImageController = require('../../controllers/vehicles/vehiclesImage.controller'); // For fetching the controller export functions reference. We will instantiate to the variable

var { verifyToken } = require('../../middlewares/requestValidator');
var { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
var { isAttachmentUploaded, getAllDataBody } = require('../../middlewares/validateInput/checkRequestBodyInput');

module.exports = (app) =>
{
    // Below route is for adding the image for a  vehicle
    app.post(`${url.vehicle_images.POST_ADD_IMAGE_PARTICULAR_VEHICLE}:id`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles),
    isAttachmentUploaded(`image`, constants.responseMessage.vehicleimagenotpresent),
    checkInput.isVehicleImageTitleAdded,
    vehicleImageController.addImages);

    // The below route is for updating the status of the  vehicle image.
    app.put(`${url.vehicle_images.PUT_UPDATE_PARTICULAR_IMAGE_STATUS}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles_images), 
    vehicleImageController.updateStatus);

    // The below route is for deleting or removing  vehicle image.
    app.put(`${url.vehicle_images.PUT_REMOVE_PARTICULAR_IMAGE}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles_images),
    vehicleImageController.removeImage);
};