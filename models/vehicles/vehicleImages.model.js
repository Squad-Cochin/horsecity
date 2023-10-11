/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is vehicle images model file. Where all the logic of the vehicle image           //
//   part is written.                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');// Constant elements are stored in this file
const commonoperation = require('../../utils/helper/commonoperation'); // helper file function. This file consist of functions Which is written universally for some common operations.
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection

module.exports = class vehicleImages
{
    constructor(){}

    /**
    * The below model function is for the Admin side page. 
    * The function is adding image to a  vehicle on the basis of vehicle id.
    */
    static async addimages(id, image, title)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadVehicleImage = await commonoperation.fileUploadTwo(image, constants.attachmentLocation.vehicle.upload.images);
                if(uploadVehicleImage === 'INVALIDFORMAT')
                {
                    resolve('INVALIDATTACHMENT')
                }
                else if(uploadVehicleImage === 'NOATTACHEMENT')
                {
                    resolve('NOATTACHEMENT')
                }
                else
                {
                    let insQuery = `INSERT INTO vehicles_images(vehicle_id, image, title, uploaded_at) VALUES(${id}, '${uploadVehicleImage}', '${title}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                    con.query(insQuery, (err, result) =>
                    {
                        result.length != 0 ? resolve(result) : resolve('err');
                    });
                }
            });
        }
        catch (error)
        {
            console.log('Error while add the vehicle images. In the vehicleImage.model.js');  
        }
    }

    /**
    * The below model function is for the Admin side page.
    * The function is updating the status of a  images of a vehicle on the basis of vehicle_image id in the params.
    */
    static async updatestatus(Id)
    {
        try 
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.vehicles_images, Id);
            return data.length === 0 ? data : data           
        }
        catch (error)
        {
            console.log('Error while changing the status of the  vehicle images. In the vehicleImage.model.js');  
        }

    }

    /**
    * The below model function is for the Admin side page.
    * The function is updating or adding the deleted_at of a  vehicles_iamge on the basis of vehicles_image id in the params.
    * This will be considered as the vehicles_image is deleted
    */
    static async removeimage (Id)
    {
        try 
        {
            const data = await commonoperation.removeUser(constants.tableName.vehicles_images, Id);
            return data.length === 0 ? data : data;
        }
        catch (error)
        {
            console.log('Error while add the vehicle images. In the vehicleImage.model.js');  
        }
    }
};