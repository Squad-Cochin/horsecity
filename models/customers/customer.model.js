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
            const count = await commonoperation.totalCount(constants.tableName.customers)
            // console.log('Total Data', count[0]['count(t.id)']);
            if(data.length === 0)
            {
                return ({totalCount : count[0]['count(t.id)'], customer : data});
            }
            else
            {
                return ({totalCount : count[0]['count(t.id)'], customer : data});
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
            const data = await commonfetching.dataOnCondition(constants.tableName.customers, Id, 'id');
            // console.log('Data : ', data);
            if(data.length === 0)
            {                
                console.log('No data present on this Id');
                return ('nodata');
            }
            else if(data === 'err')
            {
                console.log(`Error while fethcing the vehicle data on the basis if Id. Model folder`);
                return ('err');
            }
            else
            {
                let dob = data[0].date_of_birth;
                // console.log('Dob: ', dob);
                data[0].date_of_birth = time.formatDateToDDMMYYYY(dob); 
                let idProofImage = data[0].id_proof_image;
                data[0].id_proof_image = `${process.env.PORT_SP}${constants.attachmentLocation.customer.view.idProof}${idProofImage}`;
                // console.log("Link: ", data[0].id_proof_image);
                return data;
            }     
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.', error);            
        }
    };

    
    static async addcustomer(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, files)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadAttachment = await commonoperation.fileUploadTwo(files, constants.attachmentLocation.customer.upload.idProof);
                if(uploadAttachment === 'INVALIDFORMAT')
                {
                    resolve('INVALIDFORMAT');
                }
                else if(uploadAttachment === 'ERR')
                {
                    resolve('err');
                }
                else if(uploadAttachment === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHEMENT');
                }
                else
                {
                    let insQuery = `INSERT INTO customers(name, email, user_name, password, contact_no, date_of_birth, id_proof_no, id_proof_image, phone_verified, email_verified, expiry_at, created_at) VALUES('${name}', '${email}', '${user_name}', '${await commonoperation.changePasswordToSQLHashing(password)}', '${contact_no}', '${date_of_birth}', '${id_proof_no}', '${uploadAttachment}', 'TRUE', 'TRUE', '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    // console.log('Customer insert query: ', insQuery);
                    con.query(insQuery, (err, result) =>
                    {
                        // console.log(result);
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
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "addcustomer". Which is designed to add particular data of the customers.');            
        }
    };

    static async editcustomer(id, name, email, userName, contact_no, date_of_birth, id_proof_no, id_proof_image)
    // static async editcustomer(id,requestBody, file)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                if(id_proof_image === null || id_proof_image === undefined)
                {
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }
                else
                {
                let uploadAttachment = await commonoperation.fileUploadTwo(id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                // if(uploadAttachment === 'INVALIDFORMAT')
                // {
                //     resolve('INVALIDFORMAT');
                // }
                // else if(uploadAttachment === 'ERR')
                // {
                //     resolve('err');
                // }
                // else if(uploadAttachment === 'NOATTACHEMENT')
                // {
                //     resolve('NOATTACHEMENT');
                // }
                // else
                // {
                    let upQuery = `UPDATE ${constants.tableName.customers} c SET c.name = '${name}', c.email = '${email}', c.user_name = '${userName}', c.contact_no = '${contact_no}', c.date_of_birth = '${date_of_birth}', c.id_proof_no = '${id_proof_no}', c.id_proof_image = '${uploadAttachment}', c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE c.id = '${id}'`;
                    // console.log(upQuery);
                    con.query(upQuery, (err, result) =>
                    {
                        // console.log(result);
                        if(result.affectedRows > 0)
                        {
                            console.log('Customer data updated successfully');
                            resolve(result);
                        }
                        else
                        {
                            console.log(err);
                            resolve('err')
                        }
                    });
                }                
            });            
        }
        catch (error)
        {
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "editcustomer". Which is designed to edit particular data of the customer.');            
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

