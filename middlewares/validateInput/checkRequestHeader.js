const constants = require("../../utils/constants");

exports.checkRequestHeader = async(req, res, next) =>
{
    console.log(req.headers.role);
    if(!req.headers)
    {
        return res.status(200).send
        ({
            code : 404,
            status : false,
            message : 'Headers is not submitted'
        });
    }
    else
    {
        if(req.headers.role == constants.roles.admin)
        {
            console.log(`Admin login`);
            next();
        }

        if(req.headers.role == constants.roles.service_provider)
        {
            console.log(`Service provider login`);
            next();
        }
        else
        {
            return res.status(200).send
            ({
                code : 404,
                status : false,
                message : 'Headers value is not correct'
            });
        }
    }
}