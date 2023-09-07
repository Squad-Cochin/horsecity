/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is language model file. Where all the logic of the language program is written. //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../../configs/db.configs");
const timeCalculate = require("../../../utils/helper/date"); // This variable will have the date file data.
const commonoperation = require("../../../utils/helper/commonoperation");
const constants = require("../../../utils/constants");
const time = require("../../../utils/helper/date");
require("dotenv").config();



module.exports = class languages
{
  /**For getting list of active languages   */
  static async getLanguageNames() {
  return new Promise((resolve, reject) => {
    try {
      const selQuery = `SELECT lng.id, lng.name, lng.abbreviation
            FROM ${constants.tableName.languages} AS lng
            WHERE lng.deleted_at IS NULL AND lng.status = '${constants.status.active}'`;
      con.query(selQuery, (err, data) => {
        if (!err) {
          resolve({ languages: data });
        }
      });
    } catch (err) {
      console.log("Error while feching languages", err);
    }
  });
};
/**For gitting all languges basis of page and limit  */
static async getAllLanguages(requestBody){
  return new Promise((resolve, reject) => {
    try {
      const { page, limit } = requestBody;

      const offset = (page - 1) * limit;

      const selQuery = `SELECT id, name, abbreviation,status,created_at
            FROM ${constants.tableName.languages} 
            WHERE deleted_at IS NULL
            LIMIT ${+limit} OFFSET ${+offset}`;
      con.query(selQuery, (err, data) => {
        if (!err) {
          const totalCountQuery = `SELECT count(*) FROM ${constants.tableName.languages}  
                                             WHERE deleted_at IS NULL`;

          con.query(totalCountQuery, async (err, result) => {
            if (!err) {
              for (let i = 0; i < data.length; i++) {
                data[i].created_at = `${time.formatDateToDDMMYYYY(
                  data[i].created_at
                )}`;
              }
              const count = result[0]["count(*)"];
              resolve({ totalCount: count, languages: data });
            }
          });
        }
      });
    } catch (err) {
      console.log("Error while feching languages", err);
    }
  });
};


/**For add new languages  */
static async addNewLanguage(requestBody, file) {
  return new Promise(async (resolve, reject) => {
    try {
  
        requestBody.name = requestBody.name.toLowerCase().trim();
        requestBody.abbreviation = requestBody.abbreviation.toLowerCase().trim();
        const { name, abbreviation } = requestBody;

      let uploadLanguage = await commonoperation.fileNameUpload(file?.language_file);
      if(uploadLanguage.message == 'INVALIDFORMAT'){

        resolve({status : 'INVALIDFORMAT'});
      }else{
        let insQuery = `INSERT INTO ${constants.tableName.languages} (name, file,abbreviation, created_at)
        VALUES ('${name}','${uploadLanguage}','${abbreviation}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;

        con.query(insQuery, async (err, data) => {
        if (!err) {
        resolve(true);
        }
        });
      }

    } catch (err) {
      console.log("Error while adding languages", err);
    }
  });
};
/**For update language  */
static async updateLanguage  (requestBody, file,id)  {
  return new Promise(async (resolve, reject) => {
    try {
        let uploadLanguage = await commonoperation.fileNameUpload(file?.language_file);
        const invalidFormat = "INVALIDFORMAT";
        const invalidAttachment = 'INVALIDATTACHMENT';
    
        if(uploadLanguage.message == invalidFormat ){
            resolve({ status: invalidFormat });
        }else if(uploadLanguage.message == invalidAttachment || uploadLanguage){
            const { name, abbreviation } = requestBody;

            let updateQuery = `UPDATE ${constants.tableName.languages} SET 
            name = '${name}',
            abbreviation = '${abbreviation}',
            ${uploadLanguage.message === invalidAttachment ? '' : `file = '${uploadLanguage}',`} 
            updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
            WHERE id = '${id}'`;

            con.query(updateQuery,async(err,data)=>{
                if(data?.length != 0 ){
                    resolve({status : "SUCCESS"})
                }else{
                    resolve({status : "FAILD"})
                }
            })

        }
    } catch (err) {
      resolve({ status: "FAILD" });
      console.log("Error while updating service providers", err);
    }
  });
};

/**Getting particular language */
static async getOneLanguage  (id)  {
  return new Promise((resolve, reject) => {
    try {
      const selQuery = `SELECT id, name, abbreviation, file
            FROM ${constants.tableName.languages} 
            WHERE id = '${id}'`;

      con.query(selQuery, async (err, data) => {
        if (data?.length != 0) {
            
          resolve({ language: data });
        } else {
          resolve({ language: "NOTFOUND" });
        }
      });
    } catch (err) {
      resolve({ language: "NOTFOUND" });
      console.log("Error while getting one  taxation", err);
    }
  });
};
}
