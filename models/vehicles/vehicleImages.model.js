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
    * This function is for fetching the list of all the images of a  vehicles on the basis of the vehicle id.
    */
    static async allimages (id, pageNumber, pageSize)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;
                let selQuery = `SELECT vi.id, vi.vehicle_id, vi.image, vi.uploaded_at, vi.status FROM vehicles_images vi JOIN vehicles v ON vi.vehicle_id = v.id WHERE vi.vehicle_id = ${id} AND vi.deleted_at IS NULL`;
                con.query(selQuery, (err, result) =>
                {
                    if (result.length !== 0)
                    {
                        // Create an array to store the return objects
                        let returnArray = [];                      
                        for (let i = 0; i < result.length; i++)
                        {
                            let returnObj =
                            {
                                id: result[i].id,
                                url: `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${result[i].image}`,
                                uploaded_at: time.formatDateToDDMMYYYY(result[i].uploaded_at),
                                status: result[i].status,
                            };                      
                            // Add the current object to the returnArray
                            returnArray.push(returnObj);
                        }
                        // Resolve with the array of objects
                        resolve(returnArray);
                    }
                    else
                    {
                        // Resolve with an empty array to indicate no data found
                        resolve([]);
                    }
                }); 
            });            
        }
        catch (error)
        {
            console.log('Error while fetching all the vehicle images. In the vehicleImage.model.js');  
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