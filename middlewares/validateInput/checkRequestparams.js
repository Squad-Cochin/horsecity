const commonfetching = require(`../../utils/helper/commonfetching`);

exports.isValidIdInTheParams = (tableName) => async(req, res, next) =>
{
    // console.log(req.params.id);
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
        // console.log(data);
        if(data === 'err' || !data)
        {
            return res.status(500).json
            ({
                code : 500,
                status : "failed",
                error: 'Internal server error while checking the id in params' 
            });
        }
        else if(data.length > 0)
        {
            // console.log('Data Present');
            next()          
        }
        else
        {
            // console.log(`Id doesn't exist`);
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "Params id not submitted or incorrect params id submitted"
            });
        }
    }
};
