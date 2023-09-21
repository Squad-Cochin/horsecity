const serviceProvider = require('../../models/service-provider/service-provider.modal')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');

/**The below controller for geting all service provider basis of page & limit */
exports.getAllServiceProviders = async(req,res)=>
{
    let getAllSProviders = await serviceProvider.getAllServiceProviders(req.body,req.params.id);

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

/**For adding new service provider  */
exports.addNewServiceProvider = async(req,res)=>
{
   
    let addNewProvider = await serviceProvider.addNewServiceProviders(req.body,req.files.licence_image);
    if(addNewProvider.status == 'INVALIDFORMAT'){
        return res.status(200).send({
            code: 400,
            success: false,
            message: "We're sorry, but the image format of service provider licence image you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g JPG, PNG)."
        });
        
    }else{
        return res.status(200).send
        ({
            code: 200,
            success: true,
            message:  constants.responseMessage.insert
        });
   }
}

/**For update service provider  */
exports.updateServiceProvider = async(req,res)=>
{
    let updateSProvider = await serviceProvider.updateServiceProvider(req.body,req.files,req.params.id);


   if(updateSProvider.status == 'INVALIDFORMAT'){
    return res.status(200).send({
        code: 400,
        success: false,
        message: constants.responseMessage.imageFormat
    });
    
}else if(updateSProvider.status == 'FAILD'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.erroredit,
     
    });
}else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.edit,
    });
}
}


/**For updating servoceprovider status  */
exports.updateStatus = async(req,res)=>
{

    const sprovider = await commonoperation.updateUserStatus(constants.tableName.service_providers,req.params.id);
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


/**The below function is for showing removing service provider */
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

// The below function is for showing the detail of a single service provider
exports.getOneServiceProvider = async(req,res)=>
{
    let getOneSProvider = await serviceProvider.getOneServiceProvider(req.params.id);
   if(getOneSProvider?.serviceProvider == 'NOTFOUND'){
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
        success: true,
        message: constants.responseMessage.getAll,
        data : getOneSProvider
    });
   }
}

// the below function is for fetching the name of all the service provider
exports.getNameServiceProviders = async(req,res)=>
{    
    let getAllSProvidersUsername = await serviceProvider.getNameServiceProviders();

   if(getAllSProvidersUsername){

    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllSProvidersUsername
    });
   }
}


/**For getting particlar service provider vehicle */
exports.getSpVehicles = async(req,res)=>
{
    let getSpVehicles = await serviceProvider.getSpVehicles(req.params.id);
  
   if(getSpVehicles?.vehicles == 'NOTFOUND'){
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
        success: true,
        message: constants.responseMessage.getAll,
        data : getSpVehicles
    });
   }
}


/**For getting particlar service provider driver */
exports.getSpDrivers = async(req,res)=>
{
    let getSpDrivers = await serviceProvider.getSpDrivers(req.params.id);
  
   if(getSpDrivers?.drivers == 'NOTFOUND'){
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
        success: true,
        message: constants.responseMessage.getAll,
        data : getSpDrivers
    });
   }
}


/**For getting role list */
exports.getRoleList = async(req,res)=>
{
    let roleItems = await serviceProvider.getRoleList();
  
   if(roleItems){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data :roleItems

    });
   }else if(roleItems == 'ERRR'){
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.universalError,
    });
   }
}
