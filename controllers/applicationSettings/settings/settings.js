
const settings = require('../../../models/applicationSettings/settings/settings')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For gitting all data  */
exports.updateSettings = async(req,res)=>
{
console.log("here");
    let settingsPage = await settings.updateSettings(req.body,req.files);
    console.log("new",settingsPage);
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



/**For gitting all data  */
exports.getSettingsData = async(req,res)=>
{

    let settingsPage = await settings.getSettingsData();
    console.log("new",settingsPage);
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
        message: constants.responseMessage.getOne,
        data : settingsPage
     
    });
   }
}
