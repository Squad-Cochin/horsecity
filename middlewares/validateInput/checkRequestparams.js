const con = require("../../configs/db.configs"); // Calling database details
const time = require('../../utils/helper/date'); // All the time related formating are written in this file.
const constants = require("../../utils/constants");
const commonfetching = require(`../../utils/helper/commonfetching`);
const commonoperation = require('../../utils/helper/commonoperation');
const { checkValueEntered } = require("./checkRequestBodyInput");
const { assignserviceprovider } = require("../../models/drivers/driver.model");



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
            return res.status(500).json
            ({
                code : 500,
                status : "failed",
                error: 'Internal server error while checking the id in params' 
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
                message: "Params id not submitted or incorrect params id submitted"
            });
        }
    }
};

exports.CheckRole = async (req, res, next) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            const roleNameQuery = `SELECT sp.id, r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${req.params.id} AND sp.role_Id = r.id`;
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
                    if (result[0].role_id === constants.Roles.service_provider) 
                    {
                        const selQuery = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.name = '${req.body.name}' AND d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.emergency_contact_no = '${req.body.emergency_contact_no}' AND d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' AND d.description = '${req.body.description}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`; // Your query here
                        const result22 = await commonoperation.queryAsync(selQuery);
                        if (result22.length != 0)
                        {
                            uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);                        
                            uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);  
                            if(uploadlicence_img === 'INVALIDFORMAT')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : 'Invalid format of driver licence image is upload'
                                });
                            }
                            else if(uploadlicence_img === 'NOATTACH')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : 'No attachment for the driver licence image',
                                });
                            }
                            else if(uploadprofile_image === 'INVALIDFORMAT')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : 'Invalid format of driver profile image is upload'
                                });
                            }
                            else if(uploadprofile_image === 'NOATTACH')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : 'No attachment for the driver profile image',
                                });
                            }
                            else
                            {                            
                                uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);                                                
                                if(uploadprofile_image === 'INVALIDFORMAT')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'Invalid format of driver profile image is upload'
                                    });
                                }
                                else if(uploadprofile_image === 'NOATTACH')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'No attachment for the driver profile image',
                                    });
                                }
                                else
                                {
                                    const upQuery = `   UPDATE ${constants.tableName.drivers} d 
                                                        SET d.deleted_at = NULL,
                                                        d.licence_img = '${uploadlicence_img}',
                                                        d.profile_image = '${uploadprofile_image}',
                                                        d.status = '${constants.status.active}'
                                                        WHERE d.id = ${result22[0].id}`;
                                    const result23 = await commonoperation.queryAsync(upQuery);
                                    if (result23.affectedRows > 0)
                                    {
                                        const assign = await assignserviceprovider(result22[0].id, req.params.id);
                                        if (assign === 'datainserted')
                                        {
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
                            }
                        }
                        else 
                        {
                            const selQuery2 = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.name = '${req.body.name}' AND d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.emergency_contact_no = '${req.body.emergency_contact_no}' AND d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' AND d.description = '${req.body.description}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;
                            const result23 = await commonoperation.queryAsync(selQuery2);
                            if (result23.length != 0)
                            {
                                let selQuery3 = `SELECT * FROM assign_drivers ad WHERE ad.driver_id = ${result23[0].id} AND ad.service_provider_id = ${req.params.id} AND ad.deleted_at IS NOT NULL`
                                const result24 = await commonoperation.queryAsync(selQuery3);
                                if(result24.length == 0)
                                {
                                    const assign = await assignserviceprovider(result23[0].id, req.params.id);
                                    if (assign === 'datainserted')
                                    {
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
                                const selQuery4 = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.email = '${req.body.email}' AND d.contact_no = '${req.body.contact_no}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;   
                                uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto); 
                                if(uploadlicence_img === 'INVALIDFORMAT')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'Invalid format of driver licence image is upload'
                                    });
                                }
                                else if(uploadlicence_img === 'NOATTACH')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'No attachment for the driver licence image',
                                    });
                                }
                                else if(uploadprofile_image === 'INVALIDFORMAT')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'Invalid format of driver profile image is upload'
                                    });
                                }
                                else if(uploadprofile_image === 'NOATTACH')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : 'No attachment for the driver profile image',
                                    });
                                }
                                else
                                {
                                    const result4 = await commonoperation.queryAsync(selQuery4);                            
                                    if(result4.length != 0)
                                    {
                                        let upQuery = `UPDATE ${constants.tableName.drivers} d 
                                        SET d.name ='${req.body.name}',
                                        d.emergency_contact_no = '${req.body.emergency_contact_no}',
                                        d.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                        d.profile_image = '${uploadprofile_image}',
                                        d.licence_img = '${uploadlicence_img}',
                                        d.description = '${req.body.description}',
                                        d.status = '${constants.status.active}',
                                        d.deleted_at = NULL
                                        WHERE d.id = ${result4[0].id}`;
                                        const upResult4 = await commonoperation.queryAsync(upQuery);
                                        if(upResult4.affectedRows > 0)
                                        {
                                            const assign = await assignserviceprovider(result4[0].id, req.params.id);
                                            if (assign === 'datainserted')
                                            {
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
                                        const selQuery5 = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.contact_no = '${req.body.contact_no}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;
                                        const result5 = await commonoperation.queryAsync(selQuery5);
                                        if(result5.length != 0)
                                        {
                                            let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                            let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto); 
                                            if(uploadlicence_img === 'INVALIDFORMAT')
                                            {
                                                return res.status(200).send
                                                ({
                                                    code : 400,
                                                    status : false,
                                                    message : 'Invalid format of driver licence image is upload'
                                                });
                                            }
                                            else if(uploadlicence_img === 'NOATTACH')
                                            {
                                                return res.status(200).send
                                                ({
                                                    code : 400,
                                                    status : false,
                                                    message : 'No attachment for the driver licence image',
                                                });
                                            }
                                            else if(uploadprofile_image === 'INVALIDFORMAT')
                                            {
                                                return res.status(200).send
                                                ({
                                                    code : 400,
                                                    status : false,
                                                    message : 'Invalid format of driver profile image is upload'
                                                });
                                            }
                                            else if(uploadprofile_image === 'NOATTACH')
                                            {
                                                return res.status(200).send
                                                ({
                                                    code : 400,
                                                    status : false,
                                                    message : 'No attachment for the driver profile image',
                                                });
                                            }
                                            else
                                            {
                                                let upQuery = `UPDATE ${constants.tableName.drivers} d 
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
                                                const upResult5 = await commonoperation.queryAsync(upQuery);
                                                if(upResult5.affectedRows > 0)
                                                {
                                                    const assign = await assignserviceprovider(result5[0].id, req.params.id);
                                                    if (assign === 'datainserted')
                                                    {
                                                        return res.status(200).send
                                                        ({
                                                            code: 200,
                                                            status: true,
                                                            message: ` Driver ${constants.responseMessage.insert}`,
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            const selQuery6 = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.email = '${req.body.email}' AND d.licence_no = '${req.body.licence_no}' AND d.deleted_at IS NOT NULL`;
                                            const result6 = await commonoperation.queryAsync(selQuery6);
                                            if(result6.length != 0)
                                            {
                                                let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                                let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                                                if(uploadlicence_img === 'INVALIDFORMAT')
                                                {
                                                    return res.status(200).send
                                                    ({
                                                        code : 400,
                                                        status : false,
                                                        message : 'Invalid format of driver licence image is upload'
                                                    });
                                                }
                                                else if(uploadlicence_img === 'NOATTACH')
                                                {
                                                    return res.status(200).send
                                                    ({
                                                        code : 400,
                                                        status : false,
                                                        message : 'No attachment for the driver licence image',
                                                    });
                                                }
                                                else if(uploadprofile_image === 'INVALIDFORMAT')
                                                {
                                                    return res.status(200).send
                                                    ({
                                                        code : 400,
                                                        status : false,
                                                        message : 'Invalid format of driver profile image is upload'
                                                    });
                                                }
                                                else if(uploadprofile_image === 'NOATTACH')
                                                {
                                                    return res.status(200).send
                                                    ({
                                                        code : 400,
                                                        status : false,
                                                        message : 'No attachment for the driver profile image',
                                                    });
                                                }
                                                else
                                                {
                                                    let upQuery = `     UPDATE ${constants.tableName.drivers} d 
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
                                            
                                                    const upResult6 = await commonoperation.queryAsync(upQuery);
                                                    if(upResult6.affectedRows > 0)
                                                    {
                                                        const assign = await assignserviceprovider(result6[0].id, req.params.id);
                                                        if (assign === 'datainserted')
                                                        {
                                                            return res.status(200).send
                                                            ({
                                                                code: 200,
                                                                status: true,
                                                                message: ` Driver ${constants.responseMessage.insert}`,
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                const selQuery7 = `SELECT * FROM ${constants.tableName.drivers} d WHERE d.email = '${req.body.email}' AND  d.contact_no = '${req.body.contact_no}' AND d.deleted_at IS NOT NULL`;
                                                const result7 = await commonoperation.queryAsync(selQuery7);
                                                if(result7.length != 0)
                                                {
                                                    let uploadlicence_img = await commonoperation.fileUploadTwo(req.files.licence_img, constants.attachmentLocation.driver.upload.licence);
                                                    let uploadprofile_image = await commonoperation.fileUploadTwo(req.files.profile_image, constants.attachmentLocation.driver.upload.profilephoto);
                                                    if(uploadlicence_img === 'INVALIDFORMAT')
                                                    {
                                                        return res.status(200).send
                                                        ({
                                                            code : 400,
                                                            status : false,
                                                            message : 'Invalid format of driver licence image is upload'
                                                        });
                                                    }
                                                    else if(uploadlicence_img === 'NOATTACH')
                                                    {
                                                        return res.status(200).send
                                                        ({
                                                            code : 400,
                                                            status : false,
                                                            message : 'No attachment for the driver licence image',
                                                        });
                                                    }
                                                    else if(uploadprofile_image === 'INVALIDFORMAT')
                                                    {
                                                        return res.status(200).send
                                                        ({
                                                            code : 400,
                                                            status : false,
                                                            message : 'Invalid format of driver profile image is upload'
                                                        });
                                                    }
                                                    else if(uploadprofile_image === 'NOATTACH')
                                                    {
                                                        return res.status(200).send
                                                        ({
                                                            code : 400,
                                                            status : false,
                                                            message : 'No attachment for the driver profile image',
                                                        });
                                                    }
                                                    else
                                                    {
                                                        let upQuery = ` UPDATE ${constants.tableName.drivers} d 
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
                                                        const upResult7 = await commonoperation.queryAsync(upQuery);
                                                        if(upResult7.affectedRows > 0)
                                                        {
                                                            const assign = await assignserviceprovider(result7[0].id, req.params.id);
                                                            if (assign === 'datainserted')
                                                            {
                                                                return res.status(200).send
                                                                ({
                                                                    code: 200,
                                                                    status: true,
                                                                    message: ` Driver ${constants.responseMessage.insert}`,
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                                else    
                                                {
                                                    next();
                                                }
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
                        });
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
        