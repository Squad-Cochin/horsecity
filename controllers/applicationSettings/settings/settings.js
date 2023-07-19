
const settings = require('../../../models/applicationSettings/settings/settings')
const constants = require('../../../utils/constants');
const commonoperation = require('../../../utils/helper/commonoperation');



/**For gitting all data  */
exports.updateSettings = async(req,res)=>
{
    let settingsPage = await settings.updateSettings(req.body,req.files,req.parms.id);
    console.log("new",settingsPage);
//    if(settingsPage){
//     return res.status(200).send
//     ({
//         code: 200,
//         success: true,
//         message: "Successfully fetched service providers",
//         data : getAllSProviders
//     });
//    }
}



/**For gitting all data  */
exports.getSettingsData = async(req,res)=>
{

    let settingsPage = await settings.getSettingsData(req.params?.id);
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
