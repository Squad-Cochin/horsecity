
const lngModal = require('../../../models/applicationSettings/language/languages')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For gitting all data  */
exports.getLanguageNames = async(req,res)=>
{
    let getAllLanguages = await lngModal.getLanguageNames();

   if(getAllLanguages){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllLanguages
    });
   }
}


/**For gitting all data basisi of page and limit  */
exports.getAllLanguages = async(req,res)=>
{
    let getAllLanguages = await lngModal.getAllLanguages(req.body);

   if(getAllLanguages){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getAllLanguages
    });
   }
}


/**For update service provider  */
exports.updateLanguages = async(req,res)=>
{
    let updateTaxation = await lngModal.updateLanguage(req.body,req.params.id);

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


// /**For add new service provider  */
exports.updateStatus = async(req,res)=>
{

    const languages = await commonoperation.updateUserStatus(constants.tableName.languages,req.params.id);
    // console.log("addNew",data);
    console.log("status",taxation);
    if(languages.length === 0)
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
exports.removeLanguage = async(req,res)=>
{

    const language = await commonoperation.removeUser(constants.tableName.languages,req.params.id);

    if(language.length === 0)
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


exports.getOneLanguage = async(req,res)=>
{
    let getOneTaxation = await lngModal.getOneLanguage(req.params.id);
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


/**For update service provider  */
exports.updateLanguage = async(req,res)=>
{
    let updateTaxation = await lngModal.updateTaxation(req.body,req.params.id);

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

/**For add new languages  */
exports.addNewLanguage = async(req,res)=>
{
    // console.log("1",req.body);
    let addNewTaxation = await lngModal.addNewLanguage(req.body);
    // console.log("addNew",addNewTaxation);
   if(addNewTaxation){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}