////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the cms route file. Where all the routes of the cms.controller.js is written. If anyone want   //
//     to use any function of the customer.controller.js file from the frontend. Then they have to use the    //
//     routes which are listed in this file.                                                                  //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var url = require(`../../utils/url_helper`);
var defaults = require('../../utils/default');  // Constant elements are stored in this file
var cmscontroller = require(`../../controllers/cms/cms.controller`);
const { verifyToken } = require('../../middlewares/requestValidator');
const { isValidIdInTheParams } = require('../../middlewares/validateInput/checkRequestparams');
const { isAttachmentUploaded } = require('../../middlewares/validateInput/checkRequestBodyInput');

module.exports = (app) =>
{
    // The below line is for calling the add details page route. The route is in the url helper
    app.post(`${url.cms.POST_ADD_ABOUT_PAGE_DETAILS}`,
    verifyToken,
    isAttachmentUploaded(`image`, defaults.responseMessage.imagenotuploaded),
    cmscontroller.addCMSDetail);

    app.get(`${url.cms.GET_PARTICULAR_CMS_DATA}`,
    verifyToken,
    cmscontroller.getOneCMSDetails);

    app.put(`${url.cms.PUT_EDIT_CMS_DETAILS}`,
    verifyToken,
    isValidIdInTheParams(defaults.tableName.cms),
    cmscontroller.editCMSDetail);

    app.put(`${url.cms.PUT_UPDATE_CMS_STATUS}`,
    verifyToken,
    isValidIdInTheParams(defaults.tableName.cms),
    cmscontroller.updateStatus);

    app.put(`${url.cms.PUT_REMOVED_CMS_DATA}`,
    verifyToken,
    isValidIdInTheParams(defaults.tableName.cms),
    cmscontroller.removeCMS);

};