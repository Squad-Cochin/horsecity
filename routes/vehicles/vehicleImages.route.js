//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the vehicleImages.route.file . Where all the routes of the vehicleImages.controller.js is        //
//     written. If anyone want to use any function of the vehicleImages.controller.js file from the frontend.   //
//     Then they have to use the routes which are listed in this file.                                          //                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const vehicleImageController = require('../../controllers/vehicles/vehiclesImage.controller'); // For fetching the controller export functions reference. We will instantiate to the variable
const checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`);
const constants = require('../../utils/constants');
const url = require(`../../utils/url_helper`);
const { verifyToken } = require('../../middlewares/requestValidator');
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');


module.exports = (app) =>
{
    // Below route is for adding the image for a  vehicle
    app.post(`${url.vehicle_images.POST_ADD_IMAGE_PARTICULAR_VEHICLE}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles),
    checkInput.isVehicleImageUploaded,
    checkInput.isVehicleImageTitleAdded,
    vehicleImageController.addImages);

    // the below route is for gettting all the images of a  vehicle
    app.get(`${url.vehicle_images.GET_ALL_IMAGES_VEHICLE}`,
    verifyToken, 
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleImageController.allImages);

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