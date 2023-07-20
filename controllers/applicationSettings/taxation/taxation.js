
const tax = require('../../../models/applicationSettings/taxation/taxation')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');

/**For gitting all data  */
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

/**For add new taxation  */
exports.addNewTaxation = async(req,res)=>
{
    // console.log("1",req.body);
    let addNewTaxation = await tax.addNewTaxation(req.body);
    // console.log("addNew",addNewTaxation);
   if(addNewTaxation){
    return res.status(200).send
    ({
        code: 201,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}

/**For update service provider  */
exports.updateTaxation = async(req,res)=>
{
    let updateSProvider = await tax.updateTaxation(req.body,req.params.id);

        if(updateSProvider.status == 'FAILD'){
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


// /**For add new service provider  */
exports.updateStatus = async(req,res)=>
{

    const taxation = await commonoperation.updateUserStatus(constants.tableName.taxations,req.params.id);
    // console.log("addNew",data);
    console.log("status",taxation);
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


exports.getOneTaxation = async(req,res)=>
{
    let getOneTaxation = await tax.getOneTaxation(req.params.id);
    console.log(getOneTaxation);
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
        message: constants.responseMessage.getOne,
        data : getOneTaxation
    });
   }
}