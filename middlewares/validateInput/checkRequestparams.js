const commonfetching = require(`../../utils/helper/commonfetching`);


exports.isValidIdInTheParams = (tableName) => async(req, res, next) =>
{
    if (!req.params.id) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message:  `${tableName} id is required`
        });
    }
    else
    {
        const data = await commonfetching.tableDataOnId(tableName, req.params.id);
        console.log(data);
        if(data === 'err' || !data)
        {
            return res.status(500).json
            ({
                code : 200,
                status : "failed",
                error: 'Internal server error' 
            });
        }
        else if(data.length > 0)
        {
            console.log('Data Present');
            next()          
        }
        else
        {
            console.log(`Id doesn't exist`);
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "This id doesn't exists in the database"
            });
        }
    }
};

