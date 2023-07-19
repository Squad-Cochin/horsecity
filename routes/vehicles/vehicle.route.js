const vehicleController = require('../../controllers/vehicles/vehicles.controller');


module.exports = (app) =>
{
    // The below route is for adding the new vehicle data.
    app.post(`/${process.env.apiToken}/addNew/vehicle`, vehicleController.addNew);
    
    // The below route is for getting all the vehicles data.
    app.get(`/${process.env.apiToken}/getAll/vehicles`, vehicleController.getAll);
    
    // the below route is for updating the status of the vehicle data.
    app.put(`/${process.env.apiToken}/updateStatus/vehicle/:id`, vehicleController.updateStatus);
    
    // The below route is for get individual vehicle data.
    app.get(`/${process.env.apiToken}/getOne/vehicle/:id`, vehicleController.getOne);

    // The below route is for updating particular vehicle data.
    app.put(`/${process.env.apiToken}/updateData/vehicle/:id`, vehicleController.updateData);

    // The below route is for getting all the images of a particular vehicle data.
    app.get(`/${process.env.apiToken}/getAllImages/vehicle/:id`, vehicleController.getAllImages);

    // The below route is for removing or deleting the particular vehicle data.
    app.put(`/${process.env.apiToken}/removeVehicle/:id`, vehicleController.removeVehicle);
};