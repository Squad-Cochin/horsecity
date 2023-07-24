/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs')

module.exports = class drivers
{
    constructor(){}

    static async getall(pageNumber, pageSize)
    {
        try
        {
            const data = await commonfetching.getAllDataOfDriverAndCustomer(constants.tableName.drivers, pageNumber, pageSize);
            // console.log('Data', data);
            const count = await commonoperation.totalCount(constants.tableName.drivers)
            // console.log('Total Data', count[0]['count(t.id)']);
            if(data.length === 0)
            {
                return ({totalCount : count[0]['count(t.id)'], drivers : data});
            }
            else
            {
                return ({totalCount : count[0]['count(t.id)'], drivers : data});
            }                     
        }
        catch(error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getAll". Which is designed to fetch all the data of drivers.');                    
        }
    };

    static async getone(Id)
    {
        try
        {
            const data = await commonfetching.dataOnCondition(constants.tableName.drivers, Id, 'id');
            // console.log('Data', data);
            if(data.length === 0)
            {
                return data
            }
            else
            {
                let dob = data[0].date_of_birth;                
                data[0].date_of_birth = time.formatDateToDDMMYYYY(data[0].date_of_birth); 
                data[0].updated_at = `${time.formatDateToDDMMYYYY(data[0].updated_at)}`;
                data[0].created_at = `${time.formatDateToDDMMYYYY(data[0].created_at)}`;
                data[0].profile_image = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.profilephoto}${data[0].profile_image}`;
                data[0].licence_img = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.licence}${data[0].licence_img}`;
                // console.log('Dob: ', dob);
                // console.log('Driver licence image link: ', data[0].licence_img);
                // console.log("Driver profile image link: ", data[0].profile_image);
                return data;
            }            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getone". Which is designed to fetch particular data of the drivers.');            
        }
    }

    static async adddriver(name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                // console.log(uploadprofile_image);
                let uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                // console.log(uploadprofile_image);
                let insQuery = `INSERT INTO ${constants.tableName.drivers}(name, email, contact_no, emergency_contact_no, date_of_birth, profile_image, licence_no , licence_img , description, created_at) VALUES('${name}', '${email}', '${contact_no}', '${emergency_contact_no}', '${date_of_birth}', '${uploadprofile_image}', '${licence_no}', '${uploadlicence_img}', '${description}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                // console.log(insQuery);
                con.query(insQuery, (err, result) =>
                {
                    // console.log(result);
                    if(result.affectedRows > 0)
                    {
                        console.log('Driver data added successfully');
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "addcustomer". Which is designed to add particular data of the drivewr.');            
        }
    }


    static async updatestatus(Id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.drivers, Id);
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "updatestatus". Which is designed for changing the status of the driver.');            
        }
    };

    static async removedriver(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(constants.tableName.drivers, Id);
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "removedriver". Which is designed to remove particular driver.');            
        }
    };

    static async editdriver(id, name, email, contact_no, emergency_contact_no, date_of_birth, licence_no, description, profile_image, licence_img)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadprofile_image = await commonoperation.fileUploadTwo(profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                // console.log(uploadprofile_image);
                let uploadlicence_img = await commonoperation.fileUploadTwo(licence_img, constants.attachmentLocation.driver.upload.licence);
                // console.log(uploadprofile_image);
                let upQuery = `UPDATE ${constants.tableName.drivers} d SET d.name = '${name}', d.email = '${email}', d.contact_no = '${contact_no}', d.emergency_contact_no = '${emergency_contact_no}', d.date_of_birth = '${date_of_birth}', d.licence_no = '${licence_no}', d.description = '${description}', d.licence_img  = '${uploadlicence_img}', d.profile_image = '${uploadprofile_image}', d.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' WHERE d.id = '${id}'`;
                // console.log(upQuery);
                con.query(upQuery, (err, result) =>
                {
                    // console.log(result);
                    if(result.affectedRows > 0)
                    {
                        console.log('Driver data updated successfully');
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "editdriver". Which is designed to edit particular data of the driver.');            
        }
    }

    static async assignserviceprovider(dId, sId)
    {
        try
        {
            return await new Promise(async(resolve, reject)=>
            {
                let insQuery = `INSERT INTO assign_drivers(service_provider_id, driver_id, created_at) VALUES(${sId}, ${dId}, ${time.getFormattedUTCTime(constants.timeOffSet.UAE)})`;
                console.log(`Insert Query While Assigning Driver To A Service Provider: `, insQuery);
                con.query(insQuery, (err, result) =>
                {
                    if(result.affectedRows > 0)
                    {
                        resolve(result);
                    }
                    else
                    {
                        console.log(err);
                        resolve('err')
                    }

                });
            });            
        }
        catch (error)
        {
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "assignserviceprovider". Which is designed to assigne the driver to service provider.');            
        }
    }







};