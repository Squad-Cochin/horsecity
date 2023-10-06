
const settings = require('../../../models/applicationSettings/settings/settings')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For updating settings page */
exports.updateSettings = async(req,res)=>
{

    let settingsPage = await settings.updateSettings(req.body,req.files);

    if(settingsPage.status == 'INVALIDFORMAT'){
        return res.status(200).send({
            code: 400,
            success: false,
            message: constants.responseMessage.imageFormat
        });
        
    }else if(settingsPage.status == 'FAILD'){
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



/**For gitting settings page data */
exports.getSettingsData = async(req,res)=>
{

    let settingsPage = await settings.getSettingsData();
   if(settingsPage.settingsPageData == 'NOTFOUND'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr
     
    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : settingsPage
     
    });
   }
}


// Below route is for getting settings page language details
exports.getLngFile = async(req,res)=>
{

    let getLngFile = await settings.getLngFile();

   if(getLngFile.languagefile == 'NOTFOUND'){
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: constants.responseMessage.getOneErr
     
    });
   }else{
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.getAll,
        data : getLngFile
     
    });
   }
}
