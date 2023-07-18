/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is driver model file. Where all the logic of the driver part is written.         //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');

module.exports = class drivers
{
    constructor(){}

    static async getall()
    {
        try
        {
            const data = await commonfetching.getAllDataOfDriverAndCustomer(constants.tableName.drivers);
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
            const data = await commonfetching.userDataOnID(constants.tableName.drivers, Id);
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
            console.log('Error from the driver.model.js file from the models > drivers folders. In the static function "getone". Which is designed to fetch particular data of the drivers.');            
        }
    }

};