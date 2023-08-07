const { assignserviceprovider } = require("../../models/drivers/driver.model");
const constants = require("../../utils/constants");
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



exports.CheckRole = (tableName) => async(req, res, next) =>
{
    let roleName = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${req.params.id} AND sp.role_Id = r.id`;
    console.log('Check Role Data At The Get All Driver : ', roleName);

    con.query(roleName, (err, result) =>
    {
        if(err)
        {
           return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Error while fetching the rolename from the params`
            })
        }
        else
        {
            if(result[0].name === constants.roles.service_provider)
            {
                let selQuery = `SELECT * FROM drivers d WHERE d.name = '${req.body.name}' AND d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.emergency_contact_no = '${req.body.emergency_contact_no}' AND d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' AND d.description = '${req.body.description}' AND d.licence_no = '${req.body.licence_no}' AND d.licence_img AND d.deleted_at AND d.created_at IS NOT NULL AND d.deleted_at IS NOT NULL`;
                console.log(selQuery);
                con.query(selQuery, (err, result22) =>
                {
                    if(result22.length != 0)
                    {
                        let upQuery = `UPDATE drivers d SET d.deleted IS NULL WHERE d.id = ${result22[0].id}`;
                        console.log(`Update Query: `, upQuery);
                        con.query(upQuery, async (err, result23) =>
                        {
                            if(result23.affectedRows > 0)
                            {
                                console.log(`Dtata was already present but it is updated now`);
                                let assign = await assignserviceprovider(result22[0].id, req.params.id)
                                if(assign === 'datainserted')
                                {
                                    console.log('Driver data inserted successfully');
                                    return res.status(200).send
                                    ({
                                        code: 200,
                                        status: true,
                                        message: ` Driver ${constants.responseMessage.insert}`,
                                    });
                                }
                                else
                                {
                                    return res.status(200).send
                                    ({
                                        code : 500,
                                        status : false,
                                        message : `Internal Server Error from the params`
                                    })
                                }
                            }
                            else
                            {
                                return res.status(200).send
                                ({
                                    code : 500,
                                    status : false,
                                    message : `Internal Server Error from the params`
                                })
                            }
                        });
                    }
                    else
                    {
                        let selQuery = `SELECT * FROM drivers d WHERE d.email = ${req.body.email} AND d.deleted IS NULL`;
                        console.log(selQuery);
                        con.query(selQuery, (err, result24) =>
                        {
                            if(result24.length != 0)
                            {
                                let upQuery = `UPDATE drivers d SET d.deleted IS NULL WHERE d.id = ${result22[0].id}`;
                                
                            }
                            else
                            {

                            }
                        });
                    }
                });
            }
            if(result[0].name === constants.roles.admin)
            {
                next();
            }
            else
            {
                return res.status(200).send
                ({
                    code : 500,
                    status : false,
                    message : `Internal Server Error from the params`
                })
            }
        }

    });


}
