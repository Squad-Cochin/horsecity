const customerController = require('../../controllers/customers/customer.controller');

module.exports = function(app)
{
    // Below route is for getting data of all the customers
    app.get(`/${process.env.apiToken}/getAll/customers`, customerController.getAll);
    
    // Below route is for getting data of any particular customer
    app.get(`/${process.env.apiToken}/getOne/customer`, customerController.getOne);

    // Below route is for adding the customer data
    app.post(`/${process.env.apiToken}/add/customer`, customerController.addCustomer);

    
}
