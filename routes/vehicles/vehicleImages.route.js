//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
//     This is the vehicleImages.route.file . Where all the routes of the vehicleImages.controller.js is        //
//     written. If anyone want to use any function of the vehicleImages.controller.js file from the frontend.   //
//     Then they have to use the routes which are listed in this file.                                          //                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const vehicleImageController = require('../../controllers/vehicles/vehiclesImage.controller'); // For fetching the controller export functions reference. We will instantiate to the variable
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const checkInput = require(`../../middlewares/validateInput/checkRequestInputVehicles`);
const constants = require('../../utils/constants');

module.exports = (app) =>
{
    // Below route is for adding the image for a particular vehicle
    app.post(`/${process.env.apiToken}/addImage/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles),
    checkInput.isVehicleImageUploaded,
    checkInput.isVehicleImageTitleAdded,
    vehicleImageController.addImages);

    // the below route is for gettting all the images of a particular vehicle
    app.get(`/${process.env.apiToken}/allImages/vehicle/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles), 
    vehicleImageController.allImages);

    // The below route is for updating the status of the particular vehicle image.
    app.put(`/${process.env.apiToken}/updateStatus/vehicle/image/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles_images), 
    vehicleImageController.updateStatus);

    // The below route is for deleting or removing particular vehicle image.
    app.put(`/${process.env.apiToken}/removeImage/vehicle/image/:id`, 
    isValidIdInTheParams(constants.tableName.vehicles_images),
    vehicleImageController.removeImage);
};