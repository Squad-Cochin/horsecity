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
                // console.log('Came inside');
                let dob = data[0].date_of_birth;
                // console.log('Dob: ', dob);
                data[0].date_of_birth = convertDate(dob); 
                let driverProfileImage = data[0].profile_image;
                data[0].profile_image = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.profilephoto}${driverProfileImage}`;
                console.log("Driver profile image link: ", data[0].profile_image);
                let driverlicenceImage = data[0].licence_img;
                data[0].licence_img = `${process.env.PORT_SP}${constants.attachmentLocation.driver.view.licence}${driverlicenceImage}`;
                console.log('Driver licence image link: ', data[0].licence_img);      
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
            console.log('Data', data);
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

};


function convertDate(originalDateStr) {
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
  
    const parts = originalDateStr.split(' ');
    const day = parts[2];
    const month = months[parts[1]];
    const year = parts[3];
  
    return `${day}-${month}-${year}`;
  }