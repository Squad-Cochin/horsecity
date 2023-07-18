/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is customer model file. Where all the logic of the customer program is written.  //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');

module.exports = class customers
{
    constructor(){}

    static async getall()
    {
        try
        {
            const data = await commonfetching.getAllDataOfDriverAndCustomer(constants.tableName.customers);
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
            console.log('Error from the customer.model.js file from the models > customers folders. In the static function "getone". Which is designed to fetch particular data of the customers.');            
        }
    }


    
};