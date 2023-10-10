//////////////////////////////////////////////////////////////////////////////////////////////////////
// This file has the code to check the params data. Some time we will send some data in the         //
// or data in the params required to check for further processing that is being done in this file   //
//////////////////////////////////////////////////////////////////////////////////////////////////////

const constants = require("../../utils/constants"); // Constant elements are stored in this file
const commonfetching = require(`../../utils/helper/commonfetching`); // helper file function. This file consist of functions Which is written universally for fetching the data from the database


// the below function will be validating the params data.
exports.isValidIdInTheParams = (tableName) => async (req, res, next) =>
{
    if (!req.params.id) 
    {
        return res.status(200).send
        ({
            code: 500,
            status: false,
            message:  `${tableName} id is required`
        });
    }
    else
    {
        const data = await commonfetching.dataOnCondition(tableName, req.params.id, 'id');
        if(data === 'err' || ! data)
        {
            return res.status(200).send
            ({
                code : 500,
                status : "failed",
                message: constants.responseMessage.universalError 
            });
        }
        else if(data.length > 0)
        {
            next();          
        }
        else
        {
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: constants.responseMessage.params
            });
        }
    }
};
        