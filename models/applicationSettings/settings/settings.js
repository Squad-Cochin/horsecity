const constants = require('../../../utils/constants');
const time = require('../../../utils/helper/date');
const commonfetching = require('../../../utils/helper/commonfetching');
const commonoperation = require('../../../utils/helper/commonoperation');
const con = require('../../../configs/db.configs')



module.exports = class settings
{


    static async updateSettings(reqBody,files,id)
    {

    }

    static async getSettingsData(id)
    {
        return new Promise((resolve,rejuct)=>
        {
            try{
console.log("id",id);
       
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