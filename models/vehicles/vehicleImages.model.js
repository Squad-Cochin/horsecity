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
                let uploadVehicleImage = await commonoperation.fileUploadTwo(image, constants.attachmentLocation.vehicle.upload.images);
                console.log(uploadVehicleImage);
                let insQuery = `INSERT INTO vehicles_images(vehicle_id, image, title, uploaded_at) VALUES(${id}, '${uploadVehicleImage}', '${title}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                console.log(insQuery);
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

    static async allimages (id, pageNumber, pageSize)
    {
        try 
        {
            return await new Promise(async(resolve, reject)=>
            {
                const offset = (pageNumber - 1) * pageSize;
                // let selQuery = `SELECT * FROM  ${constants.tableName.vehicles_images} vi, ${constants.tableName.vehicles} v WHERE vi.id = v.service_provider_id AND v.deleted_at IS NULL LIMIT ${pageSize} OFFSET ${offset}`;
                // let selQuery = `SELECT * FROM  vehicles_images vi, vehicles v WHERE  vi.vehicle_id = v.id AND v.deleted_at IS NULL;`;
                let selQuery = `SELECT vi.id, vi.vehicle_id, vi.image, vi.updated_at, vi.status FROM vehicles_images vi JOIN vehicles v ON vi.vehicle_id = v.id WHERE vi.vehicle_id = ${id} AND vi.deleted_at IS NULL;`;
                console.log(selQuery);
                con.query(selQuery, (err, result) =>
                {
                    console.log('Model:', result);
                    if (result.length !== 0) {
                        // Create an array to store the return objects
                        let returnArray = [];
                      
                        for (let i = 0; i < result.length; i++) {
                          let returnObj = {
                            id: result[i].id,
                            url: `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${result[i].image}`,
                            updated_at: result[i].updated_at,
                            status: result[i].status,
                          };
                      
                          // Add the current object to the returnArray
                          returnArray.push(returnObj);
                        }
                      
                        // Resolve with the array of objects
                        resolve(returnArray);
                      } else {
                        // Resolve with an empty array to indicate no data found
                        resolve([]);
                      }
                      
                    // if(err)
                    // {
                    //     resolve(err);
                    // }
                    // else
                    // {
                        
                    // }
                });
                
            });            
        }
        catch (error)
        {
            console.log('Error while fetching all the vehicle images. In the vehicleImage.model.js');  
        }
    }

    static async updatestatus (Id)
    {
        try 
        {
            const data = await commonoperation.updateUserStatus(constants.tableName.vehicles_images, Id);
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
            console.log('Error while changing the status of the particular vehicle images. In the vehicleImage.model.js');  
        }

    }


    static async removeimage (Id)
    {
        try 
        {
            const data = await commonoperation.removeUser(constants.tableName.vehicles_images, Id);
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
            console.log('Error while add the vehicle images. In the vehicleImage.model.js');  
        }

    }
};