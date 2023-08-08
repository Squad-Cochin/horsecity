const commonfetching = require(`../../utils/helper/commonfetching`); // Importing the commonfetching. Where most of the common sql query or code is written
const con = require(`../../configs/db.configs`); // Calling database details
const constants = require(`../../utils/constants`); // Constant elements are stored in this file
const url = require(`../../utils/url_helper`);// Fetching the url details from the url helper file
const time = require(`../../utils/helper/date`); // All the time related formating are written in this file.

// Below is function which wille eliminate the space from the string
function hasOnlyNonSpaces(str) 
{
    if (str.includes(` `))
    {
        return true;
    }
    else
    {
        return false;
    }
}

const isValidDateOfBirth = (DOB) =>  
{
    // This is regex or regular expression for verify the Date or birth validation
    return DOB.match(new RegExp(process.env.DOBREGEX)); // REGEX or regurlar expression
}

const isValidUAENumber = (phoneNumber) =>
{
    // console.log(`Phone Number`, phoneNumber);
    // Phone number format: +9715XXXXXXXX
    const phoneRegex = new RegExp(process.env.PHONENUMBERREGEX);
    return phoneRegex.test(phoneNumber);
}

const isValidUsername = (username) => 
{
    return username.match(new RegExp(process.env.DOBREGEX));
}

const isValidPasswordTestWithRegex = (result, password) => 
{
    const regexPattern = result.replace(/^\/|\/$/g, ``); // Remove leading and trailing slashes
    const regex = new RegExp(regexPattern);
    //console.log(regex);
    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
};

const isvalidEmail = (email) => 
{
    if (new RegExp(process.env.EMAILREGEX).test(email))
    {
        const domain = email.split(`@`)[1]; // get domain name after `@` symbol
        const domainParts = domain.split(`.`); // split domain name by `.` separator
        if (domainParts[1] === domainParts[2])
        {
            console.log(`Both the domain names are same. It is not a valid email`);
            return false
        }
        else
        {
            // console.log(`Valid Email`);
            return true;
        }
    }
    else
    {
        console.log(`Invalid Email`);
        return false
    }
};

const validDatePassword = (password) =>
{
    let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
    con.query(selQuery, (err, result) => 
    {
        //console.log(result); 
        if (result)
        {
            if (isValidPasswordTestWithRegex(result[0].value, password) )
            {
                // console.log(`Password validation done`);
                return `validPassword`
            }
            else 
            {
                console.log(`Invalid Password`);
                return `invalidPassword`
            }
        }
        else
        {
            console.log(`Error while fetchig the regex from the password policies table`);
            return `notfoundRegex`;
        }
    });
};

exports.validateCommonInputAtStartingTime = (tableName, feildName, Value, id, messageFeild) => async (req, res, next) =>
{
    let checkEntry = await commonfetching.dataOnCondition(tableName, Value, feildName, id, messageFeild);
    if(checkEntry === `err`)
    {
        return res.status(500).json
        ({
            code : 500,
            status : false, 
            message : `Internal server error. While checking the ${messageFeild} at the registration time. POST` 
        });
    }
    else if(checkEntry.length > 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `This ${messageFeild} already exists in the database`
        });
    }
    else
    {
        next();
    }
};

exports.validateCommonInputAtUpdateTime = (tableName, feildName, Value, id, messageFeild) => async (req, res, next) =>
{
    let checkEmail = await commonfetching.dataOnConditionUpdate(tableName, feildName, Value, id, messageFeild);
    if(checkEmail === `internalError`)
    {
        return res.status(500).json
        ({
            code : 400,
            status : false,
            message : `Internal server error while checking the ${messageFeild} at the time of update` 
        });
    }                
    if(checkEmail === `valuenotavailable`)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Someone is already registered with this ${messageFeild}. Enter again`
        });
    }                
    if(checkEmail === `valuenotchanged`)
    {
        next();
    }
    if(checkEmail === `true`)
    {
        next();
    }
};


exports.emailValidation = (tableName) => async (req, res, next) =>
{
    if (!req.body.email) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Email is required`
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.email) === true)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Email contain space. It is not allowed.`
            });
        }
        else
        {
            if(isvalidEmail(req.body.email) != true)
            {
                return res.status(200).send
                ({
                    code : 400,
                    status : false,
                    message : `Email is not in correct format. Please check`
                });                                
            }
            else
            {
                let checkRole = `SELECT sp.id , r.id AS role_id, r.name FROM service_providers sp, roles r WHERE sp.id = ${Id} AND sp.role_Id = r.id`;
                // console.log(checkRole);
                con.query(checkRole, async (err, resultRole) =>
                {
                    // console.log(resultRole);
                    if(err)
                    {
                        console.log('Error while fetching the role name at the role based middleware');
                        resolve('err') 
                    }
                    else
                    {
                        if(resultRole[0].name === constants.roles.admin)
                        {
                            if(req.method === `POST`)
                            {
                                this.validateCommonInputAtStartingTime(tableName, `email`, req.body.email, req.params.id, 'email')(req, res, next);
                            }
                            else if(req.method === `PUT` && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id)
                            {
                                this.validateCommonInputAtUpdateTime(tableName, `email`, req.body.email, req.params.id, 'email')(req, res, next);
                            }
                            else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id)
                            {
                                this.validateCommonInputAtUpdateTime(tableName, `email`, req.body.email, req.params.id, 'email')(req, res, next);
                            }
                            else
                            {
                                return res.status(500).json
                                ({
                                    code : 500,
                                    status : false, 
                                    message : `Internal server error. While checking the email.` 
                                });
                            }
                        }
                        else if(resultRole[0].name === constants.roles.service_provider)
                        {
                            let upQuery = `UPDATE ${tableName} t SET t.deleted_at IS NULL WHERE t.email = ${req.body.email}`;
                            con.query(upQuery, (err, result) =>
                            {
                                if(result.affectedRows > 0)
                                {
                                    next();
                                }
                                else
                                {
                                    return res.status(500).json
                                    ({
                                        code : 500,
                                        status : false, 
                                        message : `Internal server error. While updating the email.` 
                                    });   
                                }
                            })
                        }
                        else
                        {
                            console.log('I think the role name which we got is not present in the database at the rolebase middleware');
                            return res.status(500).json
                            ({
                                code : 500,
                                status : false, 
                                message : `Internal server error. While checking the rolename.` 
                            });
                        }

                    }
                });
            }
        }
    }   
};

exports.usernameValidation = (tableName) => async (req, res, next) =>
{
    if (!req.body.userName) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Username is required`
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.userName) === true)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Username contain space. It is not allowed.`
            });
        }
        else
        {
            // console.log(isValidUsername(req.body.userName));
            // if(isValidUsername(req.body.userName))
            // {
            //     return res.status(200).send
            //     ({
            //         code : 400,
            //         status : false,
            //         message : `username is not valid. It must consist atleat 8 letter and less than 16 letters`
            //     });                                
            // }
            // else
            // {
                if(req.method === `POST`)
                {
                    this.validateCommonInputAtStartingTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username')(req, res, next);
                }
                else if(req.method === `PUT` && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username' )(req, res, next);
                }
                else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username')(req, res, next);
                }
                else
                {
                    return res.status(500).json
                    ({
                        code : 500,
                        status : false, 
                        message : `Internal server error. While checking the username.` 
                    });
                }
            // }
        }
    }
}

exports.contactNumberValidation = (tableName) => async (req, res, next) =>
{
    if (!req.body.contact_no) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Contact number is required`
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.contact_no) === true)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Contact Number contain space. It is not allowed.`
            });
        }
        else
        {
            // console.log(isValidUAENumber(req.body.contact_no));
            // if(!isValidUAENumber(req.body.contact_no))
            // {
            //     return res.status(200).send
            //     ({
            //         code : 400,
            //         status : false,
            //         message : `Contact number is valid`
            //     });                                
            // }
            // else
            // {
                    if(req.method === 'POST')
                    {
                        this.validateCommonInputAtStartingTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);                        
                    }
                    else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id && tableName === constants.tableName.drivers)
                    {
                        this.validateCommonInputAtUpdateTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);
                    }
                    else if(req.method === `PUT` && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id && tableName === constants.tableName.customers)
                    {
                        this.validateCommonInputAtUpdateTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);
                    }
                    else
                    {
                        return res.status(500).json
                        ({
                            code : 500,
                            status : false, 
                            message : `Internal server error. While checking the contact number.` 
                        });
                    }
            // }
        }
    }
}

exports.isValidLicenceNumber = async (req, res, next) =>
{
    if (!req.body.licence_no) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Licence number is required`
        });
    }
    else
    {
        if(req.method === 'POST')
        {
            this.validateCommonInputAtStartingTime(constants.tableName.drivers, `licence_no`, req.body.licence_no, req.params.id, 'Licence number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id)
        {
            this.validateCommonInputAtUpdateTime(constants.tableName.drivers, `licence_no`, req.body.licence_no, req.params.id, 'Licence number')(req, res, next);
        }
        else
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : `Internal server error. While checking the licence number.` 
            });
        }
    }    
};


exports.idProofNumberValidation = async (req, res, next) =>
{
    if (!req.body.id_proof_no) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Id proof number is required`
        });
    }
    else
    {
        if(req.method === 'POST')
        {
            this.validateCommonInputAtStartingTime(constants.tableName.customers, `id_proof_no`, req.body.id_proof_no, req.params.id, 'Id proof number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id)
        {
            this.validateCommonInputAtUpdateTime(constants.tableName.customers, `id_proof_no`, req.body.id_proof_no, req.params.id, 'Id proof number')(req, res, next);
        }
        else
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : `Internal server error. While checking the id proof number.` 
            });
        }   
    }    
};