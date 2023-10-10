
const tax = require('../../../models/applicationSettings/taxation/taxation.model')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data basisi of page and limit  */
exports.getAllTaxations = async(req,res)=>
{
    let getAllTaxations = await tax.getAllTaxations(req.body);

   if(getAllTaxations){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllTaxations
    });
   }
}

/**For gitting active taxation details */
exports.getTaxationsNames = async(req,res)=>
{
    let getAllTaxations = await tax.getTaxationsNames();

   if(getAllTaxations){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllTaxations
    });
   }
}


/**For add new taxation  */
exports.addNewTaxation = async(req,res)=>
{
    
    let addNewTaxation = await tax.addNewTaxation(req.body);
   if(addNewTaxation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}

/**For updating taxation  */
exports.updateTaxation = async(req,res)=>
{
    let updateTaxation = await tax.updateTaxation(req.body,req.params.id);

        if(updateTaxation.status == 'FAILD'){
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


// /**For changing status taxations  */
exports.updateStatus = async(req,res)=>
{

    const taxation = await commonoperation.updateUserStatus(constants.tableName.taxations,req.params.id);

    if(taxation.length === 0)
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


// /**For remove taxation  */
exports.removeTaxation = async(req,res)=>
{

    const taxation = await commonoperation.removeUser(constants.tableName.taxations,req.params.id);

    if(taxation.length === 0)
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

/**For getting data of any particular tax details */
exports.getOneTaxation = async(req,res)=>
{
    let getOneTaxation = await tax.getOneTaxation(req.params.id);
   if(getOneTaxation?.taxation == 'NOTFOUND'){
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
        data : getOneTaxation
    });
   }
}