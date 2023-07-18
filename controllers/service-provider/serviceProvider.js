
const serviceProvider = require('../../models/service-provider/service-provider.modal')


/**For gitting all data  */
exports.getAllServiceProviders = async(req,res)=>
{
    let getAllSProviders = await serviceProvider.getAllServiceProviders(req.body);

   if(getAllSProviders){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Successfully fetched service providers",
        data : getAllSProviders
    });
   }
}

/**For add new service provider  */
exports.addNewServiceProvider = async(req,res)=>
{
    let addNewProvider = await serviceProvider.addNewServiceProviders(req.body);
    console.log("addNew",addNewProvider);
//    if(addNewProvider){
//     return res.status(200).send
//     ({
//         code: 200,
//         success: true,
//         message: "Successfully fetched service providers",
//         data : getAllSProviders
//     });
//    }
}