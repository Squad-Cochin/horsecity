
const lngModal = require('../../../models/applicationSettings/language/languages.model')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For getting list of active language   */
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



/**For add new languages  */
exports.addNewLanguage = async(req,res)=>
{

    let addNewLanguage = await lngModal.addNewLanguage(req.body,req.files);

   if(addNewLanguage.status == 'INVALIDFORMAT'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: 'Only JSON are allowed',
    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.insert,
    });
   }
}


/**For gitting all languges basis of page and limit  */
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
   }else{
    return res.status(200).send
    ({
        code: 500,
        success: false,
        message: constants.responseMessage.getNoData,
    });
   }
}


/**For update language  */
exports.updateLanguages = async(req,res)=>
{
    let updateLanguage = await lngModal.updateLanguage(req.body,req.files,req.params.id);

    if(updateLanguage.status == 'INVALIDFORMAT'){
        return res.status(400).send({
            code: 400,
            success: false,
            message: 'Only JSON file are allowed'
        });
        
    }else if(updateLanguage.status == 'FAILD'){
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


// /**For update language status  */
exports.updateStatus = async(req,res)=>
{

    const languages = await commonoperation.updateUserStatus(constants.tableName.languages,req.params.id);
    if(languages.length === 0)
    {

        return res.status(200).send
        ({
            code : 400,
            status : false,
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
            status : false,
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

/**Getting particular language */
exports.getOneLanguage = async(req,res)=>
{
    let getOneLanguage = await lngModal.getOneLanguage(req.params.id);

   if(getOneLanguage?.language == 'NOTFOUND'){
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
        data : getOneLanguage
    });
   }
}

