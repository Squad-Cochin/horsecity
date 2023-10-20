////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //                                                                             
//     This is the controller file. We will call the model file functions from here and through this we will  //
//     be sending it to the front end side.                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const cms = require(`../../models/cms/cms.model`);
const defaults = require(`../../utils/default`); // Default elements are stored in this file
const objectConvertor = require(`../../utils/objectConvertor`);

exports.getOneCMSDetails = async(req, res) =>
{
    let data = await cms.getoneCMSdetail(req.params.url);
    let resObject = await objectConvertor.customizeGetOneCMSResponseObject(data);
    await defaults.universalResponseFunction(200, true, defaults.responseMessage.getAll, resObject, res);
}

// The below function is for adding the information for the `About` Page.
exports.addCMSDetail = async (req, res, next) =>
{ 
    let data = await cms.addCMSdetail(
        req.url, 
        req.body, 
        req.files.image, 
        req.params.id
        );
    if (data === 'unauthorised') 
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.restacc, 0, res);
    } 
    else if (data === 'err') 
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    } 
    else if (data === 'INVALIDFORMAT') 
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.invalididproofimageformat, 0, res);
    } 
    else if (data.length !== 0) 
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.insert, 0, res);
    }
};

exports.editCMSDetail = async (req, res, next) =>
{
    let data = await cms.editCMSdetail(req.body, req.files && req.files.image !== undefined ? req.files.image : null , req.params.id );
    if (data === 'unauthorised') 
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.restacc, 0, res);
    } 
    else if (data === 'err') 
    {
        await defaults.universalResponseFunction(500, false, defaults.responseMessage.universalError, 0, res);
    } 
    else if (data === 'INVALIDFORMAT') 
    {
        await defaults.universalResponseFunction(400, false, defaults.responseMessage.invalididproofimageformat, 0, res);
    } 
    else if (data.length !== 0) 
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.edit, 0, res);
    }
};

exports.updateStatus = async (req, res) =>
{
    const data = await cms.updatestatus(req.params?.id); 
    if(data)
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.statusChanged, 0, res);
    }   
};

exports.removeCMS = async (req, res) =>
{
    const data = await cms.removecms(req.params?.id); 
    if(data)
    {
        await defaults.universalResponseFunction(200, true, defaults.responseMessage.removesuccess, 0, res);
    }   
};