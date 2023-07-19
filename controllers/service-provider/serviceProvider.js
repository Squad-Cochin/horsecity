
const serviceProvider = require('../../models/service-provider/service-provider.modal')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

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
    let addNewProvider = await serviceProvider.addNewServiceProviders(req.body,req.files.licence_image);
    console.log("addNew",addNewProvider);
   if(addNewProvider){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Successfully added service providers",
    });
   }
}



/**For add new service provider  */
exports.updateStatus = async(req,res)=>
{

    const sprovider = await commonoperation.updateUserStatus(constants.tableName.service_providers,req.params.id);
    // console.log("addNew",data);
    if(sprovider.length === 0)
    {

        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.statuserror
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.statusChanged
        });
    }
}


/**For change status service provider  */
exports.removeServiceProvider = async(req,res)=>
{

    const sprovider = await commonoperation.removeUser(constants.tableName.service_providers,req.params.id);

    if(sprovider.length === 0)
    {

        return res.status(200).send
        ({
            code : 400,
            status : true,
            message : constants.responseMessage.removeerror
        });
    }
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.removesuccess
        });
    }
}


exports.getOneServiceProvider = async(req,res)=>
{
    let getOneSProvider = await serviceProvider.getOneServiceProvider(req.params.id);
    console.log(getOneSProvider);
   if(getOneSProvider?.serviceProvider == 'NotFound'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr,

    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: false,
        message: constants.responseMessage.getOne,
        data : getOneSProvider
    });
   }
}