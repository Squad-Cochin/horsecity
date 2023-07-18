/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is customer model file. Where all the logic of the customer program is written.  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const time = require('../../utils/helper/date');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const con = require('../../configs/db.configs')

module.exports = class customers
{
    constructor(){}

    static async getall(pageNumber, pageSize)
    {
        try
        {
            const data = await commonfetching.getAllDataOfDriverAndCustomer(constants.tableName.customers, pageNumber, pageSize);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch(error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getall". Which is designed to fetch all the data of customers.');                    
        }
    };

    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.userDataOnID(constants.tableName.customers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    };

    static async addcustomer(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, files)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadAttachment = await commonoperation.fileUpload(files, constants.attachmentLocation.customer.idProof);
                console.log(uploadAttachment);
                let insQuery = `INSERT INTO customers(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, id_proof_image, phone_verified, email_verified, expiry_at, created_at) VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', '${id_proof_no}', '${uploadAttachment}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                console.log(insQuery);
                con.query(insQuery, (err, result) =>
                {
                    console.log(result);
                    if(result.affectedRows > 0)
                    {
                        console.log('Customer data added successfully');
                        resolve(result);
                    }
                    else
                    {
                        resolve('err')
                    }
                });                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "addcustomer". Which is designed to add particular data of the customers.');            
        }
    };


    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.customers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    };

    static async removecustomer(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.customers, Id);
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    };

































    
};