const constants = require("../../../utils/constants");
const time = require("../../../utils/helper/date");
const commonfetching = require("../../../utils/helper/commonfetching");
const commonoperation = require("../../../utils/helper/commonoperation");
const con = require("../../../configs/db.configs");
require('dotenv').config()
module.exports = class settings {
  static async updateSettings(reqBody, files) {
    return new Promise(async (resolve, rejuct) => {
      try {
        const {
          application_title,
          contact_address,
          email,
          phone,
          country_code,
          licence_number,
          invoice_prefix,
          quotation_prefix,
          language_id,
          tax_id,
          currency_id,
          logo,loginpage_logo
        } = reqBody; 
    
    
            let validateLanguageQuery = `SELECT * FROM ${constants.tableName.languages} apps
                  WHERE apps.id = '${language_id}'`;
            con.query(validateLanguageQuery, async (err, data) => {
        
              if (data?.length != 0) {
                let validateCurrecyQuery = `SELECT * FROM ${constants.tableName.currencies} apps
                         WHERE apps.id = '${currency_id}'`;
                    
                con.query(validateCurrecyQuery, async (err, data) => {
                  if (data?.length != 0) {
                 
                    let validateTaxationQuery = `SELECT * FROM ${constants.tableName.taxations} apps
                          WHERE apps.id = '${tax_id}'`;
             

                    con.query(validateTaxationQuery, async (err, data) => {
                      if (data?.length != 0) {
                        let uploadLogo = await commonoperation.fileUpload(
                          files?.logo,
                          constants.attachmentLocation.applicationSettings
                          .settings.upload
                        );
                        let uploadLoginPageLogo =
                          await commonoperation.fileUpload(
                            files?.loginpage_logo,
                            constants.attachmentLocation.applicationSettings
                              .settings.upload
                          );
                
                        let uploadLoginPageBGimg =
                          await commonoperation.fileUpload(
                            files?.loginpage_bg_image,
                            constants.attachmentLocation.applicationSettings
                            .settings.upload
                          );
                        let uploadFavicon = await commonoperation.fileUpload(
                          files?.favicon,
                          constants.attachmentLocation.applicationSettings
                          .settings.upload
                        );

                        const invalidFormat = "INVALIDFORMAT";
                        const invalidAttachment = 'INVALIDATTACHMENT'
                        if (
                          uploadLogo.message == invalidFormat ||
                          uploadLoginPageLogo.message == invalidFormat ||
                          uploadLoginPageBGimg.message == invalidFormat ||
                          uploadFavicon.message == invalidFormat
                        ) {
                          resolve({ status: invalidFormat });
                        }else if(
                            uploadLogo.message == invalidAttachment ||
                            uploadLoginPageLogo.message == invalidAttachment ||
                            uploadLoginPageBGimg.message == invalidAttachment ||
                            uploadFavicon.message == invalidAttachment ||
                            uploadLogo ||
                            uploadLoginPageLogo ||
                            uploadLoginPageBGimg ||
                            uploadFavicon
                        ) {
                            console.log("dgfdg", logo,loginpage_logo);

                            const updateSettingsQuery = `
                            UPDATE ${constants.tableName.application_settings} AS apps
                            SET
                              apps.application_title = '${application_title}',
                              apps.contact_address = '${contact_address}',
                              apps.email = '${email}',
                              apps.phone = '${phone}',
                              apps.country_code = '${country_code}',
                              ${uploadLogo.message === invalidAttachment ? '' : `apps.logo = '${uploadLogo}',`}
                              ${uploadLoginPageLogo.message === invalidAttachment ? '' : `apps.loginpage_logo = '${uploadLoginPageLogo}',`}
                              ${uploadLoginPageBGimg.message === invalidAttachment ? '' : `apps.loginpage_bg_image = '${uploadLoginPageBGimg}',`}
                              ${uploadFavicon.message=== invalidAttachment ? '' : `apps.favicon = '${uploadFavicon}',`}
                              apps.licence_number = '${licence_number}',
                              apps.invoice_prefix = '${invoice_prefix}',
                              apps.quotation_prefix = '${quotation_prefix}',
                              apps.language_id = '${language_id}',
                              apps.currency_id = '${currency_id}',
                              apps.tax_id = '${tax_id}';
                          `;


                        //   let updateSettingsQuery = `UPDATE ${constants.tableName.application_settings} AS apps
                        //                               SET
                        //                                 apps.application_title = '${application_title}',
                        //                                 apps.contact_address = '${contact_address}',
                        //                                 apps.email = '${email}',
                        //                                 apps.phone = '${phone}',
                        //                                 apps.country_code = '${country_code}',
                        //                                 apps.logo = '${uploadLogo}',
                        //                                 apps.loginpage_logo = '${uploadLoginPageLogo}',
                        //                                 apps.loginpage_bg_image = '${uploadLoginPageBGimg}',
                        //                                 apps.favicon = '${uploadFavicon}',
                        //                                 apps.licence_number = '${licence_number}',
                        //                                 apps.invoice_prefix = '${invoice_prefix}',
                        //                                 apps.quotation_prefix = '${quotation_prefix}',
                        //                                 apps.language_id  = '${language_id}',
                        //                                 apps.currency_id  = '${currency_id}',
                        //                                 apps.tax_id   = '${tax_id}'
                        //                                 WHERE apps.id = '${id}'`;

                          con.query(updateSettingsQuery, (err, data) => {
                            console.log(data);
                            if (data?.length != 0) {
                              resolve({ status: "SUCCESS" });
                            } else {
                              console.log("1");
                              resolve({ status: "FAILD" });
                            }
                          });
                        }
                      } else {
                        console.log("22");
                        resolve({ status: "FAILD" });
                      }
                    });
                  } else {
                    console.log("2244");
                    resolve({ status: "FAILD" });
                  }
                });
              } else {
                console.log("2255");
                resolve({ status: "FAILD" });
              }
            });
  



      } catch (err) {
        console.log("Error while updating setting s page", err);
        resolve({ status: "FAILD" });

      }
    });
  }

  static async getSettingsData() {
    return new Promise((resolve, rejuct) => {   
      try { 
        let selQuery = `SELECT apps.id,
        apps.application_title,
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
 JOIN ${constants.tableName.taxations} tx ON apps.tax_id = tx.id;
 
                `;

        con.query(selQuery, async (err, data) => {
          console.log(data);
          if (data?.length != 0) {
            let logoImage = data[0].logo;
            let loginpage_logo = data[0].loginpage_logo
            let loginpage_bg_image = data[0].loginpage_bg_image
            let favicon = data[0].favicon
            data[0].logo = `${process.env.PORT_SH}${constants.attachmentLocation.applicationSettings.settings.view}${logoImage}`;
            data[0].loginpage_logo = `${process.env.PORT_SH}${constants.attachmentLocation.applicationSettings.settings.view}${loginpage_logo}`;
            data[0].loginpage_bg_image = `${process.env.PORT_SH}${constants.attachmentLocation.applicationSettings.settings.view}${loginpage_bg_image}`;
            data[0].favicon = `${process.env.PORT_SH}${constants.attachmentLocation.applicationSettings.settings.view}${favicon}`;
            resolve({ settingsPageData: data });
          } else {
            resolve({ settingsPageData: "NOTFOUND" });
          }
        });
      } catch (err) {
        console.log("Error while selecting settings data in the database");
      }
    });
  }
};
