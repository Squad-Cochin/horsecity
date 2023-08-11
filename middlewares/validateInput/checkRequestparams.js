const con = require("../../configs/db.configs");
const { assignserviceprovider } = require("../../models/drivers/driver.model");
const constants = require("../../utils/constants");
const commonfetching = require(`../../utils/helper/commonfetching`);
const time = require('../../utils/helper/date');
const commonoperation = require('../../utils/helper/commonoperation');


exports.isValidIdInTheParams = (tableName) => async (req, res, next) =>
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
            next();          
        }
        else
        {
            console.log(`Id doesn't exist`);
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "Params id not submitted or incorrect params id submitted"
            });
        }
    }
};


function queryAsync(query)
{
    return new Promise((resolve, reject) =>
    {
        con.query(query, (err, result) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        });
    });
}





exports.CheckRole = async (req, res, next) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            const roleNameQuery = `SELECT sp.id, r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${req.params.id} AND sp.role_Id = r.id`;

            // console.log('Check Role Data At The Get All Driver: ', roleNameQuery);
            con.query(roleNameQuery, async (err, result) =>
            {
                if (err)
                {
                    return res.status(400).send
                    ({
                        code: 400,
                        status: false,
                        message: `Error while fetching the rolename from the params`,
                    });
                }
                else 
                {
                    console.log(`Are we coming over here`);
                    if (result[0].name === constants.roles.service_provider) 
                    {
                        const selQuery = `SELECT * FROM drivers d WHERE d.name = '${req.body.name}' AND d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.emergency_contact_no = '${req.body.emergency_contact_no}' AND d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' AND d.description = '${req.body.description}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`; // Your query here
                        // console.log('First sel Query: ',selQuery);
                        const result22 = await queryAsync(selQuery);
                        if (result22.length != 0)
                        {
                            console.log('result22');
                            uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);                        
                            uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);                                                
                            const upQuery = `UPDATE drivers d SET d.deleted_at = NULL, d.licence_img = '${uploadlicence_img}', d.profile_image = '${uploadprofile_image}' WHERE d.id = ${result22[0].id}`;
                            console.log(upQuery);
                            const result23 = await queryAsync(upQuery);
                            if (result23.affectedRows > 0)
                            {
                                const assign = await assignserviceprovider(result22[0].id, req.params.id);
                                if (assign === 'datainserted')
                                {
                                    console.log('Came inside the assign driver');
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
                        }
                        else 
                        {
                            console.log(`else condtion`);
                            const selQuery2 = `SELECT * FROM drivers d WHERE d.name = '${req.body.name}' AND d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.emergency_contact_no = '${req.body.emergency_contact_no}' AND d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' AND d.description = '${req.body.description}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NULL`;

                            // console.log('Second sel query: ',selQuery2);
                            const result23 = await queryAsync(selQuery2);
                            if (result23.length != 0)
                            {
                                console.log(`result 23`);
                                let selQuery3 = `SELECT * FROM assign_drivers ad WHERE ad.driver_id = ${result23[0].id} AND ad.service_provider_id = ${req.params.id} AND ad.deleted_at != NULL`
                                // console.log(selQuery3);
                                const result24 = await queryAsync(selQuery3);
                                if(result24.length == 0)
                                {
                                    // console.log(`result 24`);
                                    const assign = await assignserviceprovider(result23[0].id, req.params.id);
                                    if (assign === 'datainserted')
                                    {
                                        // console.log(assign);
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
                            }
                            else
                            {
                                console.log(`else condtion 3`);
                                const selQuery4 = `SELECT * FROM drivers d WHERE d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;   
                                uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto); 
                                // console.log('Third sel query: ',selQuery4);
                                const result4 = await queryAsync(selQuery4);                            
                                // console.log('Result 4',result4);                            
                                if(result4.length != 0)
                                {
                                    let upQuery = `UPDATE drivers d 
                                    SET d.name ='${req.body.name}',
                                    d.emergency_contact_no = '${req.body.emergency_contact_no}',
                                    d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                    d.profile_image = '${uploadprofile_image}',
                                    d.licence_img = '${uploadlicence_img}',
                                    d.description = '${req.body.description}',
                                    d.status = '${constants.status.active}',
                                    d.deleted_at = NULL
                                    WHERE d.id = ${result4[0].id}`;
                                    // console.log(upQuery);
                                    const upResult4 = await queryAsync(upQuery);
                                    if(upResult4.affectedRows > 0)
                                    {
                                        console.log(`upResult4`);
                                        const assign = await assignserviceprovider(result4[0].id, req.params.id);
                                        if (assign === 'datainserted')
                                        {
                                            // console.log(assign);
                                            console.log('Driver data inserted successfully');
                                            return res.status(200).send
                                            ({
                                                code: 200,
                                                status: true,
                                                message: ` Driver ${constants.responseMessage.insert}`,
                                            });
                                        }  
                                    }
                                }
                                else
                                {
                                    console.log(`else condtion 4`);
                                    const selQuery5 = `SELECT * FROM drivers d WHERE d.contact_no = '${req.body.contact_no}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;
                                    // console.log(selQuery5);
                                    const result5 = await queryAsync(selQuery5);
                                    if(result5.length != 0)
                                    {
                                        let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                        let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto); 
                                        let upQuery = `UPDATE drivers d 
                                        SET d.name ='${req.body.name}',
                                        d.email = '${req.body.email}',
                                        d.emergency_contact_no = '${req.body.emergency_contact_no}',
                                        d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                        d.profile_image = '${uploadprofile_image}',
                                        d.licence_img = '${uploadlicence_img}',
                                        d.description = '${req.body.description}',
                                        d.status = '${constants.status.active}',
                                        d.deleted_at = NULL
                                        WHERE d.id = ${result5[0].id}`;
                                        console.log(upQuery);
                                        const upResult5 = await queryAsync(upQuery);
                                        if(upResult5.affectedRows > 0)
                                        {
                                            console.log(`upResult5`);
                                            const assign = await assignserviceprovider(result5[0].id, req.params.id);
                                            if (assign === 'datainserted')
                                            {
                                                // console.log(assign);
                                                console.log('Driver data inserted successfully');
                                                return res.status(200).send
                                                ({
                                                    code: 200,
                                                    status: true,
                                                    message: ` Driver ${constants.responseMessage.insert}`,
                                                });
                                            }
                                        }
                                    }
                                    else
                                    {
                                        console.log(`Else Condition 5`);
                                        const selQuery6 = `SELECT * FROM drivers d WHERE d.email = '${req.body.email}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;
                                        // console.log(`Select query 6: `, selQuery6);
                                        const result6 = await queryAsync(selQuery6);
                                        // console.log('Result 6: ', result6);
                                        if(result6.length != 0)
                                        {
                                            let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                            let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                                            let upQuery = `UPDATE drivers d 
                                            SET d.name ='${req.body.name}',
                                            d.contact_no = '${req.body.contact_no}',
                                            d.emergency_contact_no = '${req.body.emergency_contact_no}',
                                            d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                            d.profile_image = '${uploadprofile_image}',
                                            d.licence_img = '${uploadlicence_img}',
                                            d.description = '${req.body.description}',
                                            d.status = '${constants.status.active}',
                                            d.deleted_at = NULL
                                            WHERE d.id = ${result6[0].id}`;
                                            
                                            // console.log(upQuery);
                                            const upResult6 = await queryAsync(upQuery);
                                            if(upResult6.affectedRows > 0)
                                            {
                                                console.log(`upResult6`);
                                                const assign = await assignserviceprovider(result6[0].id, req.params.id);
                                                if (assign === 'datainserted')
                                                {
                                                    // console.log(assign);
                                                    console.log('Driver data inserted successfully');
                                                    return res.status(200).send
                                                    ({
                                                        code: 200,
                                                        status: true,
                                                        message: ` Driver ${constants.responseMessage.insert}`,
                                                    });
                                                }
                                            }
                                        }
                                        else
                                        {
                                            console.log(`Else Condition 6`);
                                            const selQuery7 = `SELECT * FROM drivers d WHERE d.email = '${req.body.email}' AND  d.contact_no = '${req.body.contact_no}' AND d.deleted_at IS NOT NULL`;
                                            console.log(`Select query 7: `, selQuery7);
                                            const result7 = await queryAsync(selQuery7);
                                            console.log('Result 7: ', result7);
                                            if(result7.length != 0)
                                            {
                                                let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                                let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                                                let upQuery = `UPDATE drivers d 
                                                            SET d.name ='${req.body.name}',
                                                            d.licence_no = '${req.body.licence_no}',
                                                            d.emergency_contact_no = '${req.body.emergency_contact_no}',
                                                            d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                                            d.profile_image = '${uploadprofile_image}',
                                                            d.licence_img = '${uploadlicence_img}',
                                                            d.description = '${req.body.description}',
                                                            d.status = '${constants.status.active}',
                                                            d.deleted_at = NULL
                                                            WHERE d.id = ${result7[0].id}`;
                                                console.log(upQuery);
                                                const upResult7 = await queryAsync(upQuery);
                                                if(upResult7.affectedRows > 0)
                                                {
                                                    console.log(`upResult7`);
                                                    const assign = await assignserviceprovider(result7[0].id, req.params.id);
                                                    if (assign === 'datainserted')
                                                    {
                                                        // console.log(assign);
                                                        console.log('Driver data inserted successfully');
                                                        return res.status(200).send
                                                        ({
                                                            code: 200,
                                                            status: true,
                                                            message: ` Driver ${constants.responseMessage.insert}`,
                                                        });
                                                    }
                                                }
                                            }
                                            else    
                                            {
                                                console.log('else inside else');
                                                next();
                                            }
                                        }
                                    }                   
                                }
                            }
                        }
                    }
                    else if (result[0].name === constants.roles.admin)
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
        catch (error)
        {
            console.log('Error in CheckRole function:', error);
            return res.status(500).send
            ({
                code: 500,
                status: false,
                message: `Internal Server Error from the params`,
            });
        }
    });
};

const checkValueEntered = (Field, messageField) => (req, res, next) =>
{
    return new Promise((resolve, reject) =>
    {
        console.log(`Checking ${messageField}: Field = ${Field}`);
        if (!Field)
        {
            console.log(`${messageField} is required`);
            return res.status(400).send
            ({
                code: 400,
                status: false,
                message: `${messageField} is required`
            });
        }
        else
        {
            console.log(`${messageField} is present`);
            resolve();
        }
    });
};



exports.driverRequestAddBody = async (req, res, next) => 
{
    try
    {
        await checkValueEntered(req.body.name, 'Name')(req, res, next);
        await checkValueEntered(req.body.email, 'Email')(req, res, next);
        await checkValueEntered(req.body.emergency_contact_no, 'Emergency contact number')(req, res, next);
        await checkValueEntered(req.body.licence_no, 'Licence number')(req, res, next);
        await checkValueEntered(req.body.contact_no, 'Contact number')(req, res, next);
        await checkValueEntered(req.body.date_of_birth, 'Date of birth')(req, res, next);
        await checkValueEntered(req.body.description, 'description')(req, res, next);
        next();
    }
    catch (error)
    { 
        // Handle any errors that might occur during the checks
        res.status(500).send
        ({
            code: 500,
            status: false,
            message: 'Internal server error',
        });
    }
}; 
        