const vehicleImageController = require('../../controllers/vehicles/vehiclesImage.controller');

module.export = (app) =>
{
    // Below route is for adding the image for a particular vehicle
    app.post(`/${process.env.apiToken}/addImage/vehicle/:id`, vehicleImageController.addImage);

    // the below route is for gettting all the images of a particular vehicle
    app.get(`/${process.env.apiToken}/allImages/vehicle/:id`, vehicleImageController.allImages);

    // The below route is for updating the status of the particular vehicle image.
    app.put(`/${process.env.apiToken}/updateStatus/vehicle/image/:id`, vehicleImageController.updateStatus);

    // The below route is for deleting or removing particular vehicle image.
    app.put(`/${process.env.apiToken}/removeImage/vehicle/image/:id`, vehicleImageController.removeImage);
};