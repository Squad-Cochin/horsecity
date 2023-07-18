const driverController = require('../../controllers/drivers/driver.controller');


module.exports = function(app)
{
    // Below route is for getting data of all the drivers
    app.get(`/${process.env.apiToken}/getAll/drivers`, driverController.getAll);

    // Below route is for getting data of any particular driver
    app.get(`/${process.env.apiToken}/getOne/driver`, driverController.getOne);

    // Below route is for adding the driver data
    app.post(`/${process.env.apiToken}/add/driver`, driverController.addDriver);
}