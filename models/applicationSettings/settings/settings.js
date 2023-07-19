const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
const commonfetching = require('../../../utils/helper/commonfetching');
const commonoperation = require('../../../utils/helper/commonoperation');
const con = require('../../../configs/db.configs')



module.exports = class settings
{


    static async updateSettings(reqBody,files,id)
    {
        return new Promise(async(resolve,rejuct)=>
        {
            try{
                // let uploadAttachment = await commonoperation.fileUpload(files[0], constants.attachmentLocation.serviceProvider.licenceImage);
            const { application_title,contact_address,email,phone, country_code,logo,loginpage_logo,loginpage_bg_image,favicon,licence_number,invoice_prefix,quotation_prefix, language_id, taxation_id,
                currency_id } = reqBody ;
             let updateQuery = `UPDATE ${constants.tableName.application_settings} AS apps
                   JOIN ${constants.tableName.languages} AS lg ON apps.language_id = lg.id
                   JOIN ${constants.tableName.currencies} AS cr ON apps.currency_id = cr.id
                   JOIN ${constants.tableName.taxations} AS tx ON apps.tax_id = tx.id
                   SET
                      apps.application_title = '${application_title}',
                      apps.contact_address = '${contact_address}',
                      apps.email = '${email}',
                      apps.phone = '${phone}',
                      apps.country_code = '${country_code}',
                      apps.logo = '${logo}',
                      apps.loginpage_logo = '${loginpage_logo}',
                      apps.loginpage_bg_image = '${loginpage_bg_image}',
                      apps.favicon = '${favicon}',
                      apps.licence_number = '${licence_number}',
                      apps.invoice_prefix = '${invoice_prefix}',
                      apps.quotation_prefix = '${quotation_prefix}',
                      lg.name = 'UAE ${l}',
                      tx.name = 'VAT',
                      cr.name = 'UAE Dirham'
                      WHERE apps.id = '${id}'`;

            }catch(err){

            }
        })
    }

    static async getSettingsData(id)
    {
        return new Promise((resolve,rejuct)=>
        {
            try{

       
                let selQuery = `SELECT  apps.application_title,
                apps.contact_address,
                apps.email,
                apps.phone,
                apps.country_code,
                apps.logo,
                apps.loginpage_logo,
                apps.loginpage_bg_image,
                apps.favicon,
                apps.licence_number,
                apps.invoice_prefix,
                apps.quotation_prefix,
                lg.name AS language_name,
                tx.name AS taxation_name,
                cr.name AS currency_name
                FROM ${constants.tableName.application_settings} apps
                JOIN ${constants.tableName.languages} lg ON apps.language_id = lg.id
                JOIN ${constants.tableName.currencies} cr ON apps.currency_id = cr.id
                JOIN ${constants.tableName.taxations} tx ON apps.tax_id = tx.id
                WHERE apps.id = '${id}'`;

            con.query(selQuery,async(err,data)=>{
                console.log(data);
                if(data?.length != 0){
                    resolve({settingsPageData : data})
                }else{
                    resolve({settingsPageData : "NOTFOUND"})
                }
            })


        }catch(err){
            console.log("Error while selecting settings data in the database");
        }

        })
    }

}