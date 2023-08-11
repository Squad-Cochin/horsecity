const con = require("../../configs/db.configs");
const timeCalculate = require('../../utils/helper/date'); // This variable will have the date file data.
const commonoperation = require('../../utils/helper/commonoperation');
const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const mail = require('../../utils/mailer')


require('dotenv').config()


module.exports = class listing
{

/**for displaying listing page data */
static async listingPageData  (body) 
{
    return new Promise(async (resolve, reject) => {
        try {


        } catch (err) {
            resolve(false)
            console.log('Error while adding quotation', err);
        }
    })
}


}






