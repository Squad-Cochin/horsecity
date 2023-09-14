const commonfetching = require(`../../utils/helper/commonfetching`); // Importing the commonfetching. Where most of the common sql query or code is written
const con = require(`../../configs/db.configs`); // Calling database details
const constants = require(`../../utils/constants`); // Constant elements are stored in this file
const url = require(`../../utils/url_helper`);// Fetching the url details from the url helper file
const time = require(`../../utils/helper/date`); // All the time related formating are written in this file.
const commonoperation = require('../../utils/helper/commonoperation');



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
    const phoneRegex = new RegExp(process.env.PHONENUMBERREGEX);
    return phoneRegex.test(phoneNumber);
}

const isValidUsername = (username) => 
{
    return username.match(new RegExp(process.env.DOBREGEX));
}

const isvalidEmail = (email) => 
{
    if (new RegExp(process.env.EMAILREGEX).test(email))
    {
        const domain = email.split(`@`)[1]; // get domain name after `@` symbol
        const domainParts = domain.split(`.`); // split domain name by `.` separator
        if (domainParts[1] === domainParts[2])
        {
            return false
        }
        else
        {
            return true;
        }
    }
    else
    {
        return false
    }
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
            message : constants.responseMessage.universalError 
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
            message : constants.responseMessage.universalError 
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
                if(req.method === `POST`)
                {
                    this.validateCommonInputAtStartingTime(tableName, `email`, req.body.email, req.params.id, 'Email')(req, res, next);
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `email`, req.body.email, req.params.id, 'Email')(req, res, next);
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_DRIVER_PAGE_URL}${req.params.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `email`, req.body.email, req.params.id, 'Email')(req, res, next);
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params?.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `email`, req.body.email, req.params.id, 'Email')(req, res, next);
                }
                else
                {
                    return res.status(500).json
                    ({
                        code : 500,
                        status : false, 
                        message : constants.responseMessage.universalError 
                    });
                }
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
                if(req.method === `POST` && req.url === url.UPDATE_SERVICE_PROVIDER_PASSWORD)
                {
                    next();
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params?.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username' )(req, res, next);
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_DRIVER_PAGE_URL}${req.params?.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username')(req, res, next);
                }
                else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params?.id}`)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params?.id, 'Username')(req, res, next);
                }
                else if(req.method === `POST`)
                {
                    this.validateCommonInputAtStartingTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username')(req, res, next);
                }
                else 
                {
                    return res.status(500).json
                    ({
                        code : 500,
                        status : false, 
                        message : constants.responseMessage.universalError 
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
                    else if(req.method === `PUT` && req.url === `${url.UPDATE_DRIVER_PAGE_URL}${req.params?.id}` && tableName === constants.tableName.drivers)
                    {
                        this.validateCommonInputAtUpdateTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);
                    }
                    else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params?.id}` && tableName === constants.tableName.customers)
                    {
                        this.validateCommonInputAtUpdateTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);
                    }
                    else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params?.id}`)
                    {
                        this.validateCommonInputAtUpdateTime(tableName, `contact_no`, req.body.contact_no, req.params.id, 'contact number')(req, res, next);
                    }
                    else
                    {
                        return res.status(500).json
                        ({
                            code : 500,
                            status : false, 
                            message : constants.responseMessage.universalError 
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
        else if(req.method === `PUT` && req.url === `${url.UPDATE_DRIVER_PAGE_URL}${req.params.id}`)
        {
            this.validateCommonInputAtUpdateTime(constants.tableName.drivers, `licence_no`, req.body.licence_no, req.params.id, 'Licence number')(req, res, next);
        }
        else
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : constants.responseMessage.universalError 
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
        else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params?.id}`)
        {
            this.validateCommonInputAtUpdateTime(constants.tableName.customers, `id_proof_no`, req.body.id_proof_no, req.params.id, 'Id proof number')(req, res, next);
        }
        else if(req.method === `PUT` && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params?.id}`)
        {
            this.validateCommonInputAtUpdateTime(constants.tableName.customers, `id_proof_no`, req.body.id_proof_no, req.params.id, 'Id proof number')(req, res, next);
        }
        else
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : constants.responseMessage.universalError 
            });
        }   
    }    
};

exports.isValidEmergencyContactNumber =  (req, res, next) =>
{
    if (!req.body.emergency_contact_no) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Emergency contact number is required`
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.emergency_contact_no) === true)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Emergency contact number contain space. It is not allowed.`
            });
        }
        else if (req.body.contact_no === req.body.emergency_contact_no)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Emergency number and contact number cannot be same`
            });
        }
        else
        {
            // if(!isValidUAENumber(req.body.emergency_contact_no))
            // {
            //     return res.status(200).send
            //     ({
            //         code : 400,
            //         status : false,
            //         message : `Emergency Contact number is not in valid`
            //     });                                
            // }
            // else
            // {
                next();
            // }
        }
    }
}

exports.dateOfBirthValidation = (req, res, next) =>
{
    if (!req.body.date_of_birth) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Date of Birth is required`
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.date_of_birth) === true)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Date of birth contain space. It is not allowed.`
            });
        }
        else
        {
            if(!isValidDateOfBirth(time.formatDateToDDMMYYYY(req.body.date_of_birth)))
            {
                return res.status(200).send
                ({
                    code : 400,
                    status : false,
                    message : `Date of birth is not in valid. The correct format is DD/Month starting three Letters/YYYY`
                });                                
            }
            else
            {
                next();
            }
        }
    }
}

exports.nameValidation = (req, res, next) =>
{
    if (!req.body.name) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Name is required`
        });
    }
    else
    {
        next();
    }    
};

exports.idProofValidationWhileUpdate = async(req, res, next) =>
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
        let checkIdProofNumber = await commonfetching.dataOnConditionUpdate(constants.tableName.customers, `id_proof_no`, req.body.id_proof_no, req.params.id);
        if(checkIdProofNumber === `internalError`)
        {
            return res.status(200).json
            ({
                code : 500,
                status : false,
                message : constants.responseMessage.universalError 
            });
        }
        
        if(checkIdProofNumber === `valuenotavailable`)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `This id proof number already exists in the database. Someone is already registered with this id proof number`
            });
        }
        if(checkIdProofNumber === `valuenotchanged`)
        {
            next();
        }

        if(checkIdProofNumber === `true`)
        {
            next();
        }        
    }    
};

exports.isValidDescription = (req, res, next) =>
{
    if (!req.body.description) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Description is required`
        });
    }
    else
    {
        next();
    }    
};

exports.passwordsimilarity = async (req, res, next) =>
{
    if (req.body.confirmnewpassword !== req.body.newpassword)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Password and confirm password are not similar`
        });
    }
    else
    {
        if (req.body.password === req.body.newpassword)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `New password similar with old password. It is not allowed.`
            });
        }
        else if (req.body.confirmnewpassword === req.body.password)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Confirm new password similar with old password. It is not allowed.`
            });
        }
        else
        {
            next();
        }
    }
}

exports.passwordValidation = async (req, res, next) =>
{
    let password = await req.body.password
    if (!password) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Password is required`
        });
    }
    else if(hasOnlyNonSpaces(password) === true)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Password contain space. It is not allowed.`
        });
    }
    else
    {
        let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
        con.query(selQuery, (err, result) =>
        {
            if (result)
            {
                const isValidPassword = (password) =>
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message: `Failed! Not a valid password. Password must meet the following conditions: The password must contain at least one lowercase or uppercase letter (a-z or A-Z), at least one special character from the set (-, #, $, ., %, &, or *), minimum 8 character, maximum 16 character`,
                    });
                }
            }    
        });
    };
};

exports.newpassword = async (req, res, next) => 
{
    const password = await req.body.newpassword
    if (!password) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `New password is required`
        });
    }
    else if(hasOnlyNonSpaces(password) === true)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `New password contain space. It is not allowed.`
        });
    }
    else
    {
        let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
        con.query(selQuery, (err, result) =>
        {
            if (result)
            {
                const isValidPassword = (password) =>
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message : "Failed! Not a valid password. Password must meet the following conditions: The password must contain at least one lowercase or uppercase letter (a-z or A-Z), at least one special character from the set (-, #, $, ., %, &, or *), minimum 8 character, maximum 16 character",
                    });
                }
            }    
        });
    };    
}

exports.confirmnewpassword = async (req, res, next) =>
{
    const password = await req.body.confirmnewpassword
    if (!password) 
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Confirm password is required`
        });
    }
    else if(hasOnlyNonSpaces(password) === true)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Confirm password contain space. It is not allowed.`
        });
    }
    else
    {
        let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
        con.query(selQuery, (err, result) =>
        {
            if (result)
            {
                const isValidPassword = (password) =>
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message : "Failed! Not a valid password. Password must meet the following conditions: The password must contain at least one lowercase or uppercase letter (a-z or A-Z), at least one special character from the set (-, #, $, ., %, &, or *), minimum 8 character, maximum 16 character"
                    });
                }
            }    
        });
    };
}

exports.isPageNumberEntered = (req, res, next) =>
{
    if(!req.body.page)
    {
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : constants.responseMessage.universalError
        });     
    }
    else
    {
        next();
    }
}

exports.isPageSizeEntered = (req, res, next) =>
{
    if(!req.body.limit)
    {
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : constants.responseMessage.universalError
        });     
    }
    else
    {
        next();
    }
}

exports.isCustomerIdProofImageSubmitted = (req, res, next) =>
{
    if(!req.files?.id_proof_image && req.method === 'POST' && req.url === `${url.ADD_CUSTOMER_PAGE_URL}/${req.params?.id}`)
    // if (!req.files?.id_proof_image && req.method === 'POST' && req.url === url.ADD_CUSTOMER_PAGE_URL + req.params.id)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Customer Id proof image is not uploaded`
        });     
    }
    else
    {
        if(req.method === 'PUT' && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params.id}` && !req.files?.id_proof_image)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === `${url.UPDATE_CUSTOMER_PAGE_URL}${req.params.id}` && req.files?.id_proof_image)
        {
            next();
        }   
        if(req.method === 'PUT' && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params.id}` && req.files?.id_proof_image)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === `${url.UPDATE_CUSTOMER_SIDE_URL}${req.params.id}` && !req.files?.id_proof_image)
        {
            next();
        }
        if(req.method === 'POST')
        {
            next();
        }
    }
}

exports.isDriverProfileImageSubmitted = (req, res, next) =>
{
    if(!req.files?.profile_image && req.method === 'POST' && req.url === `${url.ADD_DRIVER_PAGE_URL}/${req.params.id}`)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Driver profile image is not uploaded`
        });     
    }
    else
    {
        if(req.method === 'PUT' && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id && !req.files?.profile_image)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id && req.files?.profile_image)
        {
            next();
        }
        if(req.method === 'POST')
        {
            next();
        }
    }
}

exports.isDriverLicenceImageSubmitted = (req, res, next) =>
{
    if(!req.files?.licence_img && req.method === 'POST' && req.url === `${url.ADD_DRIVER_PAGE_URL}/${req.params.id}`)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Driver licence image is not uploaded`
        });     
    }
    else
    {
        if(req.method === 'PUT' && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id && !req.files?.licence_img)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id && req.files?.licence_img)
        {
            next();
        }
        if(req.method === 'POST')
        {
            next();
        }
    }
}

exports.idProofImageWhileUpdate = (req, res, next) =>
{
    if(!req.files?.id_proof_image)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Customer id proof image is not uploaded`
        });
    }
    else
    {
        next();
    }
} 

exports.checkAmountEntered = async(req, res, next) =>
{
    this.checkValueEntered(req.body.totalRecievedAmount, 'Received payment')(req, res, next);
    next();
};

exports.checkValueEntered = (fieldName, messageField) => (req, res, next) =>
{
    return new Promise((resolve, reject) =>
    {
        if (!fieldName)
        {
           return res.status(400).send
            ({
                code: 400,
                status: false,
                message: `${messageField} not entered`,
            });
        }
        else 
        {
            resolve();
        }
    });
};

exports.checkValuesEnteredInTheQuotationBody = async (req, res, next) => {  
    try {
        // Add await to each checkValueEntered call and handle errors explicitly
        await this.checkValueEntered(req.body.customer_id, 'Customer id') (req, res, next);
        await this.checkValueEntered(req.body.enquiry_id, 'Enquiry id') (req, res, next);
        await this.checkValueEntered(req.body.driver_id, 'Driver id') (req, res, next);
        await this.checkValueEntered(req.body.vehicle_id, 'Vehicle id') (req, res, next);
        await this.checkValueEntered(req.body.service_provider_id, 'Service provider id') (req, res, next);
        await this.checkValueEntered(req.body.discount_type_id, 'Discount type Id') (req, res, next);
        await this.checkValueEntered(req.body.pickup_location, 'Pickup location') (req, res, next);
        await this.checkValueEntered(req.body.pickup_country, 'Pick up country') (req, res, next);
        await this.checkValueEntered(req.body.pickup_date, 'Pick up date')(req, res, next) ;
        await this.checkValueEntered(req.body.drop_location, 'Drop location') (req, res, next);
        await this.checkValueEntered(req.body.drop_country, 'Drop country') (req, res, next);
        await this.checkValueEntered(req.body.drop_date, 'Drop date') (req, res, next);
        await this.checkValueEntered(req.body.no_of_horse, 'Number of horses') (req, res, next);
        await this.checkValueEntered(req.body.special_requirement, 'Special requirement') (req, res, next);
        await this.checkValueEntered(req.body.additional_service, 'Additional service') (req, res, next);
        await this.checkValueEntered(req.body.transportation_insurance_coverage, 'Transportation insurance coverage') (req, res, next);
        await this.checkValueEntered(req.body.driver_amount, 'Driver payment') (req, res, next);
        await this.checkValueEntered(req.body.vehicle_amount, 'Vehicle payment') (req, res, next);
        await this.checkValueEntered(req.body.current_amount, 'Current payment') (req, res, next);
        await this.checkValueEntered(req.body.tax_amount, 'Tax payment') (req, res, next);
        await this.checkValueEntered(req.body.tax_amount, 'Tax payment') (req, res, next);
        await this.checkValueEntered(req.body.discount_amount, 'Discount payment') (req, res, next);
        await this.checkValueEntered(req.body.final_amount, 'Final payment') (req, res, next);
        next();
    } catch (error) { 
        // Handle any errors that might occur during the checks
        res.status(500).send
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });
    }
};

exports.checkEmailBody = async (req, res, next) =>
{
    try
    {
        await this.checkValueEntered(req.body.email, 'Email')(req, res, next);
        await this.checkValueEntered(req.body.subject, 'Subject')(req, res, next);
        await this.checkValueEntered(req.body.body, 'Body')(req, res, next);
        next();
    }
    catch(error)
    {
        console.log(`Error from the 'checkRequestBodyInput' file in validator. Which is inside the middlewares. While checking the email body`, error);
    }
};

exports.checkCustomerEnquiryBody = async (req, res, next) =>
{
    try
    {
        // await this.checkValueEntered(req.body.customer_id, 'Customer id')(req, res, next);
        await this.checkValueEntered(req.body.vehicle_id, 'Vehicle id')(req, res, next);
        await this.checkValueEntered(req.body.service_provider_id, 'Service provider id')(req, res, next);
        await this.checkValueEntered(req.body.pickup_location, 'Pick up location')(req, res, next);
        await this.checkValueEntered(req.body.drop_location, 'Drop location')(req, res, next);
        await this.checkValueEntered(req.body.vehicle_type, 'Vehicle type')(req, res, next);
        await this.checkValueEntered(req.body.pickup_country, 'Pick up country')(req, res, next);
        await this.checkValueEntered(req.body.drop_country, 'Drop country')(req, res, next);
        await this.checkValueEntered(req.body.no_of_horse, 'Number of horse, Which are about to transport')(req, res, next);
        await this.checkValueEntered(req.body.description, 'Description about the enquiry')(req, res, next);
        await this.checkValueEntered(req.body.pickup_date, 'Pickup date')(req, res, next);
        next();
    }
    catch (error)
    {
        console.log(`Error from the 'checkCustomerEnquiryBody' function. It is in validator folder. Which is inside the middlewares. While checking the enquiries body. This middleware is basically designed to make the enquiries from the customer`, error); 
    }
};

exports.isIdEntered = (feildName, tableName, MessageFeild) => async (req, res, next) =>
{
    if (!req.body[feildName]) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: `${MessageFeild} id is required`
        });
    }
    else
    {
        const data = await commonfetching.dataOnCondition(tableName, req.body[feildName], 'id');
        if(data === 'err' || !data)
        {
            return res.status(500).json
            ({
                code: 400,
                status : "failed",
                error: constants.responseMessage.universalError
            });
        }
        else if(data.length > 0)
        {
            next()          
        }
        else
        {
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: `${MessageFeild} id doesn't exists in the database`
            });
        }
    }
};

exports.checkingDuplicateEnquiry = async (req, res, next) =>
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            const selQuery = `SELECT * FROM ${constants.tableName.enquiries} e WHERE e.customer_id = ${req.params.id} AND e.vehicle_id = ${req.body.vehicle_id} AND e.serviceprovider_id = ${req.body.service_provider_id} AND e.pickup_location = '${req.body.pickup_location}' AND e.drop_location = '${req.body.drop_location}' AND e.trip_type = '${req.body.vehicle_type}' AND e.pickup_country = '${req.body.pickup_country}' AND e.drop_country = '${req.body.drop_country}' AND e.no_of_horse = ${req.body.no_of_horse} AND e.status = '${constants.enquiry_status.notconfirmed}'`;
            con.query(selQuery, (err, result) =>
            {
                if(result.length != 0)
                {
                    if(result[0].status === constants.enquiry_status.confirmed)
                    {
                        next();
                    }
                    else if(result[0].status === constants.enquiry_status.notconfirmed)
                    {                        
                        if(result[0].description === req.body.description)
                        {
                            return res.status(200).send
                            ({
                                code : 400,
                                status : false,
                                message : `Previous enquiry from this same details are not confirmed by the service provider till now. So we can forward this enquiry of your right now. Please wait`
                            });
                        }
                        if(result[0].description !== req.body.description)
                        {
                            return res.status(200).send
                            ({
                                code : 400,
                                status : false,
                                message : `Previous enquiry from this same details are not confirmed by the service provider till now. You have changed the description only. It is not allowed. Service provider will reach to you. Please tell them directly`
                            });
                        }
                    }
                    else
                    {
                        return res.status(200).send
                        ({
                            code : 500,
                            status : false,
                            message : constants.responseMessage.universalError
                        });
                    }
                }
                else
                {
                    next();
                }
            });
        });
    }
    catch (error)
    {
        console.log(`Error while checking the duplicate entry of enquiry data`, error);
    }
};

exports.CustomerAddRequestBody = async (req, res, next)  =>
{
    try
    {
        await this.checkValueEntered(req.body.name, 'Name')(req, res, next);
        await this.checkValueEntered(req.body.email, 'Email')(req, res, next);
        await this.checkValueEntered(req.body.userName, 'Username')(req, res, next);
        await this.checkValueEntered(req.body.password, 'Password')(req, res, next);
        await this.checkValueEntered(req.body.contact_no, 'Contact number')(req, res, next);
        await this.checkValueEntered(req.body.date_of_birth, 'Date of birth')(req, res, next);
        // await this.checkValueEntered(req.body.id_proof_no, 'Id proof number')(req, res, next);
        // await this.checkValueEntered(req.files.id_proof_image, 'Id proof image is not uploaded')(req, res, next);
        next();
    }
    catch(error)
    {
        // Handle any errors that might occur during the checks
        res.status(500).send
        ({
            code: 500,
            status: false,
            message: constants.responseMessage.universalError
        });

    }
};

exports.CheckDataPresentWithDeletedAt = async (req, res, next) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const selQuery = `  SELECT * FROM ${constants.tableName.customers} c 
                                WHERE c.name = '${req.body.name}' 
                                AND c.email = '${req.body.email}'
                                AND c.contact_no = '${req.body.contact_no}'
                                AND c.user_name = '${req.body.userName}'
                                AND c.password = '${req.body.password}' 
                                AND c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' 
                                AND c.id_proof_no = '${req.body.id_proof_no}' 
                                AND c.deleted_at IS NOT NULL`;
            const result1 = await commonoperation.queryAsync(selQuery);
            if(result1.length != 0)
            {
                uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                if(uploadIdproofImage === 'INVALIDFORMAT')
                {
                    return res.status(200).send
                    ({
                        code : 400,
                        status : false,
                        message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                    });
                }
                else if(uploadIdproofImage === 'NOATTACHEMENT')
                {
                    return res.status(200).send
                    ({
                        code : 400,
                        status : false,
                        message : "An ID proof image is required.",
                    });
                }
                else
                {
                    const upQuery = `   UPDATE ${constants.tableName.customers} c 
                                        SET c.deleted_at = NULL,
                                        c.id_proof_image = '${uploadIdproofImage}',
                                        WHERE c.id = ${result1[0].id}`;
                    const result2 = await commonoperation.queryAsync(upQuery);
                    if (result2.affectedRows > 0)
                    {
                        return res.status(200).send
                        ({
                            code: 200,
                            status: true,
                            message: ` ${constants.responseMessage.insert}`,
                        });
                    }
                    else
                    {
                        return res.status(200).send
                        ({
                            code : 500,
                            status : false,
                            message : constants.responseMessage.universalError
                        });
                    }
                }
            }
            else
            {
                const selQuery2 = `     SELECT * FROM ${constants.tableName.customers} c 
                                        WHERE c.email = '${req.body.email}'
                                        AND c.contact_no = '${req.body.contact_no}'
                                        AND c.id_proof_no = '${req.body.id_proof_no}'
                                        AND c.user_name = '${req.body.userName}'
                                        AND c.deleted_at IS NOT NULL`;
                const result12 = await commonoperation.queryAsync(selQuery2);
                if(result12.length != 0)
                {
                    uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                    if(uploadIdproofImage === 'INVALIDFORMAT')
                    {
                        return res.status(200).send
                        ({
                            code : 400,
                            status : false,
                            message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                        });
                    }
                    else if(uploadIdproofImage === 'NOATTACHEMENT')
                    {
                        return res.status(200).send
                        ({
                            code : 400,
                            status : false,
                            message : "An ID proof image is required.",
                        });
                    }
                    else
                    {
                        const upQuery2 = `  UPDATE ${constants.tableName.customers} c 
                                            SET c.deleted_at = NULL,
                                            c.name = '${req.body.name}',
                                            c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                            c.password = SHA2('${process.env.PASSWORD}', 256),
                                            c.id_proof_image = '${uploadIdproofImage}',
                                            c.status = '${constants.status.active}',
                                            c.phone_verified = 'TRUE',
                                            c.email_verified = 'TRUE',
                                            c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                            c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                            c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                            WHERE c.id = ${result12[0].id} 
                                            `;
                        const result22 = await commonoperation.queryAsync(upQuery2);
                        if (result22.affectedRows > 0)
                        {
                            return res.status(200).send
                            ({
                                code: 200,
                                status: true,
                                message: ` Customer ${constants.responseMessage.insert}`,
                            });
                        }
                        else
                        {
                            return res.status(200).send
                            ({
                                code : 500,
                                status : false,
                                message : constants.responseMessage.universalError
                            });  
                        }
                    }
                }
                else
                {
                    let selQuery3 = `   SELECT * FROM ${constants.tableName.customers} c
                                        WHERE c.email = '${req.body.email}'
                                        AND c.deleted_at IS NOT NULL
                                    `;
                    const result13 = await commonoperation.queryAsync(selQuery3);
                    if(result13.length != 0)
                    {
                        uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                        if(uploadIdproofImage === 'INVALIDFORMAT')
                        {
                            return res.status(200).send
                            ({
                                code : 400,
                                status : false,
                                message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                            });
                        }
                        else if(uploadIdproofImage === 'NOATTACHEMENT')
                        {
                            return res.status(200).send
                            ({
                                code : 400,
                                status : false,
                                message : "An ID proof image is required.",
                            });
                        }
                        else
                        {
                            const upQuery3 = `  UPDATE ${constants.tableName.customers} c
                                                SET c.deleted_at = NULL,
                                                c.name = '${req.body.name}',
                                                c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                                c.password = SHA2('${process.env.PASSWORD}', 256),
                                                c.id_proof_image = '${uploadIdproofImage}',
                                                c.status = '${constants.status.active}',
                                                c.phone_verified = 'TRUE',
                                                c.email_verified = 'TRUE',
                                                c.user_name = '${req.body.userName}',
                                                c.id_proof_no = '${req.body.id_proof_no}',
                                                c.contact_no = '${req.body.contact_no}',
                                                c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                                c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                                c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                WHERE c.id = ${result13[0].id}  `;
                            const result23 = await commonoperation.queryAsync(upQuery3);
                            if (result23.affectedRows > 0)
                            {
                                return res.status(200).send
                                ({
                                    code: 200,
                                    status: true,
                                    message: ` Customer ${constants.responseMessage.insert}`,
                                });
                            }
                            else
                            {
                                return res.status(200).send
                                ({
                                    code : 500,
                                    status : false,
                                    message : constants.responseMessage.universalError
                                });  
                            }
                        }                        
                    }
                    else
                    {
                        let selQuery4 = `   SELECT * FROM ${constants.tableName.customers} c
                                            WHERE c.user_name = '${req.body.userName}'
                                            AND c.deleted_at IS NOT NULL
                                        `;
                        const result14 = await commonoperation.queryAsync(selQuery4);
                        if(result14.length != 0)
                        {
                            uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                            if(uploadIdproofImage === 'INVALIDFORMAT')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                                });
                            }
                            else if(uploadIdproofImage === 'NOATTACHEMENT')
                            {
                                return res.status(200).send
                                ({
                                    code : 400,
                                    status : false,
                                    message : "An ID proof image is required.",
                                });
                            }
                            else
                            {
                                const upQuery4 = `  UPDATE ${constants.tableName.customers} c
                                                    SET c.deleted_at = NULL,
                                                    c.name = '${req.body.name}',
                                                    c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                                    c.password = SHA2('${process.env.PASSWORD}', 256),
                                                    c.id_proof_image = '${uploadIdproofImage}',
                                                    c.status = '${constants.status.active}',
                                                    c.phone_verified = 'TRUE',
                                                    c.email_verified = 'TRUE',
                                                    c.email = '${req.body.email}',
                                                    c.id_proof_no = '${req.body.id_proof_no}',
                                                    c.contact_no = '${req.body.contact_no}',
                                                    c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                                    c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                                    c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                    WHERE c.id = ${result14[0].id}  `;
                                const result24 = await commonoperation.queryAsync(upQuery4);
                                if (result24.affectedRows > 0)
                                {
                                    return res.status(200).send
                                    ({
                                        code: 200,
                                        status: true,
                                        message: ` Customer ${constants.responseMessage.insert}`,
                                    });
                                }
                                else
                                {
                                    return res.status(200).send
                                    ({
                                        code : 500,
                                        status : false,
                                        message : constants.responseMessage.universalError
                                    });  
                                }
                            }
                        }
                        else
                        {
                            let selQuery5 = `   SELECT * FROM ${constants.tableName.customers} c
                                                WHERE c.contact_no = '${req.body.contact_no}'
                                                AND c.deleted_at IS NOT NULL
                                            `;
                            const result15 = await commonoperation.queryAsync(selQuery5);
                            if(result15.length != 0)
                            {
                                uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                                if(uploadIdproofImage === 'INVALIDFORMAT')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                                    });
                                }
                                else if(uploadIdproofImage === 'NOATTACHEMENT')
                                {
                                    return res.status(200).send
                                    ({
                                        code : 400,
                                        status : false,
                                        message : "An ID proof image is required.",
                                    });
                                }
                                else
                                {
                                    const upQuery5 = `  UPDATE ${constants.tableName.customers} c
                                                        SET c.deleted_at = NULL,
                                                        c.name = '${req.body.name}',
                                                        c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                                        c.password = SHA2('${process.env.PASSWORD}', 256),
                                                        c.id_proof_image = '${uploadIdproofImage}',
                                                        c.status = '${constants.status.active}',
                                                        c.phone_verified = 'TRUE',
                                                        c.email_verified = 'TRUE',
                                                        c.email = '${req.body.email}',
                                                        c.id_proof_no = '${req.body.id_proof_no}',
                                                        c.user_name = '${req.body.userName}',
                                                        c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                                        c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                                        c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                        WHERE c.id = ${result15[0].id}  `;
                                    const result25 = await commonoperation.queryAsync(upQuery5);
                                    if (result25.affectedRows > 0)
                                    {
                                        return res.status(200).send
                                        ({
                                            code: 200,
                                            status: true,
                                            message: ` Customer ${constants.responseMessage.insert}`,
                                        });
                                    }
                                    else
                                    {
                                        return res.status(200).send
                                        ({
                                            code : 500,
                                            status : false,
                                            message : constants.responseMessage.universalError
                                        });  
                                    }
                                }
                            }
                            else
                            {
                                let selQuery6 = `   SELECT * FROM ${constants.tableName.customers} c
                                                    WHERE c.id_proof_no = '${req.body.id_proof_no}'
                                                    AND c.deleted_at IS NOT NULL
                                                `;
                                const result16 = await commonoperation.queryAsync(selQuery6);
                                if(result16.length != 0)
                                {
                                    uploadIdproofImage = await commonoperation.fileUploadTwo(req.files.id_proof_image, constants.attachmentLocation.customer.upload.idProof);
                                    if (customers === 'INVALIDFORMAT')
                                    {
                                        return res.status(200).send
                                        ({
                                            code : 400,
                                            status : false,
                                            message : "We're sorry, but the image format you submitted is invalid. Please make sure to upload an image in one of the supported formats (e.g., JPG, PNG).",
                                        });
                                    }
                                    // If the id proof image is not uploaded then this else if block of code will be executed.
                                    else if(customers === 'NOATTACHEMENT')
                                    {
                                        return res.status(200).send
                                        ({
                                            code : 400,
                                            status : false,
                                            message : "An ID proof image is required.",
                                        });
                                    }
                                    else
                                    {
                                        let upQuery6 = `UPDATE ${constants.tableName.customers} c
                                                        SET c.deleted_at = NULL,
                                                        c.name = '${req.body.name}',
                                                        c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                                        c.password = SHA2('${process.env.PASSWORD}', 256),
                                                        c.id_proof_image = '${uploadIdproofImage}',
                                                        c.status = '${constants.status.active}',
                                                        c.phone_verified = 'TRUE',
                                                        c.email_verified = 'TRUE',
                                                        c.email = '${req.body.email}',
                                                        c.contact_no = '${req.body.contact_no}',
                                                        c.user_name = '${req.body.userName}',
                                                        c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                                        c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                                        c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                                        WHERE c.id = ${result16[0].id} `;
                                        const result26 = await commonoperation.queryAsync(upQuery6);
                                        if (result26.affectedRows > 0)
                                        {
                                            return res.status(200).send
                                            ({
                                                code: 200,
                                                status: true,
                                                message: ` Customer ${constants.responseMessage.insert}`,
                                            });
                                        }
                                        else
                                        {
                                            return res.status(200).send
                                            ({
                                                code : 500,
                                                status : false,
                                                message : constants.responseMessage.universalError
                                            });  
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
        catch (error)
        {
            console.log('Error in CheckDataPresentWithDeletedAt function:', error);
            return res.status(500).send
            ({
                code: 500,
                status: false,
                message: constants.responseMessage.universalError,
            });
        }
    });
};

exports.CheckDataPresentWithDeletedAtDuringCustomerRegistration = async (req, res, next) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            let selQuery = `SELECT * FROM ${constants.tableName.customers} c
                            WHERE c.email = '${req.body.email}'
                            AND c.deleted_at IS NOT NULL`;
            let result11 = await commonoperation.queryAsync(selQuery);
            if(result11.length != 0)
            {
                const upQuery1 = `  UPDATE ${constants.tableName.customers} c
                                    SET c.deleted_at = NULL,
                                    c.name = '${req.body.name}',
                                    c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                    c.password = SHA2('${process.env.PASSWORD}', 256),
                                    c.status = '${constants.status.active}',
                                    c.phone_verified = 'TRUE',
                                    c.email_verified = 'TRUE',
                                    c.id_proof_image = 'NULL',
                                    c.id_proof_no = 'NULL',
                                    c.user_name = '${req.body.userName}',
                                    c.id_proof_no = '${req.body.id_proof_no}',
                                    c.contact_no = '${req.body.contact_no}',
                                    c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                    c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                    c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                    WHERE c.id = ${result11[0].id}  `;
                const result21 = await commonoperation.queryAsync(upQuery1);
                if (result21.affectedRows > 0)
                {
                    return res.status(200).send
                    ({
                        code: 200,
                        status: true,
                        message: `${constants.responseMessage.insert}`,
                    });
                }
                else
                {
                    return res.status(200).send
                    ({
                        code : 500,
                        status : false,
                        message : constants.responseMessage.universalError
                    });  
                }
            }
            else
            {
                let selQuery2 = `   SELECT * FROM ${constants.tableName.customers} c
                                    WHERE c.user_name = '${req.body.userName}'
                                    AND c.deleted_at IS NOT NULL
                                `;
                let result12 = await commonoperation.queryAsync(selQuery2);
                if(result12.length != 0)
                {
                    console.log('here2');
                    const upQuery2 = `  UPDATE ${constants.tableName.customers} c
                                        SET c.deleted_at = NULL,
                                        c.name = '${req.body.name}',
                                        c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                        c.password = SHA2('${process.env.PASSWORD}', 256),
                                        c.id_proof_image = 'NULL',
                                        c.id_proof_no - 'NULL',
                                        c.status = '${constants.status.active}',
                                        c.phone_verified = 'TRUE',
                                        c.email_verified = 'TRUE',
                                        c.email = '${req.body.email}',
                                        c.id_proof_no = '${req.body.id_proof_no}',
                                        c.contact_no = '${req.body.contact_no}',
                                        c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                        c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                        c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                        WHERE c.id = ${result12[0].id}  `;
                    const result22 = await commonoperation.queryAsync(upQuery2);
                    console.log('21: ', result21);
                    if (result22.affectedRows > 0)
                    {
                        return res.status(200).send
                        ({
                            code: 200,
                            status: true,
                            message: `${constants.responseMessage.insert}`,
                        });
                    }
                    else
                    {
                        return res.status(200).send
                        ({
                            code : 500,
                            status : false,
                            message : constants.responseMessage.universalError
                        });  
                    }
                }
                else
                {
                    let selQuery3 = `   SELECT * FROM ${constants.tableName.customers} c
                                        WHERE c.contact_no = '${req.body.contact_no}'
                                        AND c.deleted_at IS NOT NULL
                                    `;
                    let result13 = await commonoperation.queryAsync(selQuery3);
                    if(result13.length != 0)
                    {
                        console.log('here3');
                        const upQuery3 = `  UPDATE ${constants.tableName.customers} c
                                            SET c.deleted_at = NULL,
                                            c.name = '${req.body.name}',
                                            c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                            c.password = SHA2('${process.env.PASSWORD}', 256),
                                            c.id_proof_image = 'NULL',
                                            c.id_proof_no - 'NULL',
                                            c.status = '${constants.status.active}',
                                            c.phone_verified = 'TRUE',
                                            c.email_verified = 'TRUE',
                                            c.email = '${req.body.email}',
                                            c.id_proof_no = '${req.body.id_proof_no}',
                                            c.user_name = '${req.body.userName}',
                                            c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                            c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                            c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                            WHERE c.id = ${result13[0].id}  `;
                        const result23 = await commonoperation.queryAsync(upQuery3);
                        console.log('21: ', result21);
                        if (result23.affectedRows > 0)
                        {
                            return res.status(200).send
                            ({
                                code: 200,
                                status: true,
                                message: `${constants.responseMessage.insert}`,
                            });
                        }
                        else
                        {
                            return res.status(200).send
                            ({
                                code : 500,
                                status : false,
                                message : constants.responseMessage.universalError
                            });  
                        }
                    }
                    else
                    {
                        let selQuery4 = `   SELECT * FROM ${constants.tableName.customers} c
                                            WHERE c.id_proof_no = '${req.body.id_proof_no}'
                                            AND c.deleted_at IS NOT NULL
                                        `;
                        let result14 = await commonoperation.queryAsync(selQuery4);
                        if(result14.length != 0)
                        {
                            console.log('here4');
                            let upQuery4 = `UPDATE ${constants.tableName.customers} c
                                            SET c.deleted_at = NULL,
                                            c.name = '${req.body.name}',
                                            c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}',
                                            c.password = SHA2('${process.env.PASSWORD}', 256),
                                            c.id_proof_image = 'NULL',
                                            c.id_proof_no - 'NULL',
                                            c.status = '${constants.status.active}',
                                            c.phone_verified = 'TRUE',
                                            c.email_verified = 'TRUE',
                                            c.email = '${req.body.email}',
                                            c.contact_no = '${req.body.contact_no}',
                                            c.user_name = '${req.body.userName}',
                                            c.expiry_at = '${time.addingSpecifiedDaysToCurrentDate(constants.password.expiry_after)}',
                                            c.created_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}',
                                            c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                                            WHERE c.id = ${result14[0].id} `;
                            const result24 = await commonoperation.queryAsync(upQuery4);
                            console.log('21: ', result21);                
                            if (result24.affectedRows > 0)
                            {
                                return res.status(200).send
                                ({
                                    code: 200,
                                    status: true,
                                    message: `${constants.responseMessage.insert}`,
                                });
                            }
                            else
                            {
                                return res.status(200).send
                                ({
                                    code : 500,
                                    status : false,
                                    message : constants.responseMessage.universalError
                                });  
                            }
                        }
                        else
                        {
                            const selQuery5 = ` SELECT * FROM ${constants.tableName.customers} c 
                                                WHERE c.name = '${req.body.name}' 
                                                AND c.email = '${req.body.email}'
                                                AND c.contact_no = '${req.body.contact_no}'
                                                AND c.user_name = '${req.body.userName}'
                                                AND c.password = '${req.body.password}' 
                                                AND c.date_of_birth = '${time.changeDateToSQLFormat(req.body.date_of_birth)}' 
                                                AND c.id_proof_no = '${req.body.id_proof_no}' 
                                                AND c.deleted_at IS NOT NULL`;
                            const result15 = await commonoperation.queryAsync(selQuery5);
                            if(result15.length != 0)
                            {
                                const upQuery = `   UPDATE ${constants.tableName.customers} c 
                                                    SET c.deleted_at = NULL,
                                                    c.id_proof_image = '${uploadIdproofImage}',
                                                    WHERE c.id = ${result15[0].id}`;
                                const result25 = await commonoperation.queryAsync(upQuery);
                                console.log('25: ', result21);                                
                                if (result25.affectedRows > 0)
                                {
                                    return res.status(200).send
                                    ({
                                        code: 200,
                                        status: true,
                                        message: `${constants.responseMessage.insert}`,
                                    });
                                }
                                else
                                {
                                    return res.status(200).send
                                    ({
                                        code : 500,
                                        status : false,
                                        message : constants.responseMessage.universalError
                                    });
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
        catch (error)
        {
            return res.status(500).send
            ({
                code: 500,
                status: false,
                message: constants.responseMessage.universalError,
            });
        }
    });
};

exports.passwordandconfirmpasswordsimilarity = async (req, res, next) =>
{
    if (req.body.confirmnewpassword !== req.body.newpassword)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : `Password and confirm password are not similar`
        });
    }
    else
    {
      next();
    }
}