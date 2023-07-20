/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is vehicle images model file. Where all the logic of the vehicle image           //
//   part is written.                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs')

module.exports = class vehicleImages
{
    constructor(){}

    static async addimages(id, image, title)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                let uploadVehicleImage = await commonoperation.fileUploadTwo(image, constants.attachmentLocation.vehicle.images);
                console.log(uploadVehicleImage);
                let insQuery = `INSERT INTO vehicles_images(vehicle_id, image, title, uploaded_at) VALUES('${id}', '${uploadVehicleImage}', '${title}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                con.query(insQuery, (err, result) =>
                {
                    if(result.length != 0)
                    {
                        console.log('Vehicles image added successfully');
                        resolve(result);
                    }
                    else
                    {
                        console.log(err);
                        resolve('err');
                    }
                });
            });
        }
        catch (error)
        {
            console.log('Error while add the vehicle images. In the vehicleImage.model.js');  
        }
    }

    static async allimages (pageNumber, pageSize)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;
                let selQuery = `SELECT  FROM  ${constants.tableName.vehicles_images} vi, ${constants.tableName.vehicles} v WHERE vi.id = v.service_provider_id AND v.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                // console.log(selQuery);
                con.query(selQuery, (err, result) =>
                {
                    // console.log(result);
                    if(err)
                    {
                        resolve(err);
                    }
                    else
                    {
                        resolve(result)
                    }
                });
                
            });            
        }
        catch (error)
        {
            console.log('Error while fetching all the vehicle images. In the vehicleImage.model.js');  
        }

    }

    static async updatestatus ()
    {
        try 
        {
            
        }
        catch (error)
        {
            console.log('Error while changing the status of the particular vehicle images. In the vehicleImage.model.js');  
        }

    }


    static async removeimage ()
    {
        try 
        {
            
        }
        catch (error)
        {
            console.log('Error while add the vehicle images. In the vehicleImage.model.js');  
        }

    }
};