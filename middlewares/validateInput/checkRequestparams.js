const constants = require("../../utils/constants");
const commonfetching = require(`../../utils/helper/commonfetching`);

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
        