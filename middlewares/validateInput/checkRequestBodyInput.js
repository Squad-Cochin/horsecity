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


exports.validateCommonInputAtStartingTime = (tableName, feildName, Value, id, messageFeild) => async (req, res, next) =>
{
    let checkEntry = await commonfetching.dataOnCondition(tableName, Value, feildName, id, messageFeild);
    // console.log(`Check Entry: `, checkEntry);
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
                if(req.method === `POST` && req.url === url.UPDATE_SERVICE_PROVIDER_PASSWORD)
                {
                    next();
                }
                else if(req.method === `PUT` && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username' )(req, res, next);
                }
                else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id)
                {
                    this.validateCommonInputAtUpdateTime(tableName, `user_name`, req.body.userName, req.params.id, 'Username')(req, res, next);
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
            console.log('Emergency number and contact number cannot be same');
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `Emergency number and contact number cannot be same`
            });
        }
        else
        {
            // console.log(isValidUAENumber(req.body.emergency_contact_no));
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
            console.log(isValidDateOfBirth(time.formatDateToDDMMYYYY(req.body.date_of_birth)));
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
                message : `Internal server error` 
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
            console.log('Regex Result from password validation', result);
            if (result)
            {
                const isValidPassword = (password) => 
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    console.log('Regex after replacing the slashes: ', regex);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    //console.log('here');
                    console.log("password validation done");
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character except '@'  ",
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
            console.log('Regex Result from password validation', result);
            if (result)
            {
                const isValidPassword = (password) =>
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    console.log('Regex after replacing the slashes: ', regex);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    console.log("password validation done");
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message: "Failed! Not a valid new password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character except '@'  ",
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
            console.log('Regex Result from password validation', result);
            if (result)
            {
                const isValidPassword = (password) =>
                {
                    const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                    const regex = new RegExp(regexPattern);
                    console.log('Regex after replacing the slashes: ', regex);
                    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                };
                if (isValidPassword(password))
                {
                    console.log("password validation done");
                    next();
                }
                else
                {
                    return res.status(200).json
                    ({
                        success: false,
                        code: 400,
                        message: "Failed! Not a valid confirm password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character except '@'  ",
                    });
                }
            }    
        });
    };
}

// const validDatePassword = async (password) =>
// {
//     let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
//     con.query(selQuery, (err, result) => 
//     {
//         console.log('Validate Password function Regex Result:- ', result); 
//         if (result)
//         {
//             // console.log('Validate Password Function after checking the password result',isValidPasswordTestWithRegex(result[0].value, password));
//             // if (isValidPasswordTestWithRegex(result[0].value, password))
//             {
//                 console.log(`Password validation done`);
//                 return `validPassword`
//             }
//             else 
//             {
//                 console.log(`Invalid Password`);
//                 return `invalidPassword`
//             }
//         }
//         else
//         {
//             console.log(`Error while fetchig the regex from the password policies table`);
//             return `notfoundRegex`;
//         }
//     });
// };

// const isValidPasswordTestWithRegex = (result, password) => 
// {
//     const regexPattern = result.replace(/^\/|\/$/g, ``); // Remove leading and trailing slashes
//     const regex = new RegExp(regexPattern);
//     console.log('Regex from next funtion: ',regex);
//     return regex.test(password); // Use the test() method to check if the password matches the regex pattern
// };



exports.isPageNumberEntered = (req, res, next) =>
{
    if(!req.body.page)
    {
        console.log(`Page number value is not entered`);
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : `Internal Server Error. Page Number value is nt entered`
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
        console.log(`Page size is not entered`);
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : `Internal Server Error. Page size is not entered`
        });     
    }
    else
    {
        next();
    }
}


exports.isCustomerIdProofImageSubmitted = (req, res, next) =>
{  
    if(!req.files?.id_proof_image && req.method === 'POST' && req.url === url.ADD_CUSTOMER_PAGE_URL + req.params.id)
    {
        console.log(`Id proof image is not uploaded`);
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Customer Id proof image is not uploaded`
        });     
    }
    else
    {
        if(req.method === 'PUT' && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id && !req.files?.id_proof_image)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === url.UPDATE_CUSTOMER_PAGE_URL + req.params.id && req.files?.id_proof_image)
        {
            next();
        }
        if(req.method === 'POST')
        {
            next();
        }
    }
}

exports.isCustomerIdProofImageSubmitted2 = async (req, res, next) =>
{    
    if(!req.files?.id_proof_image)
    {
        console.log(`Id proof image is not uploaded`);
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : `Customer Id proof image is not uploaded`
        });     
    }
    else
    {
        let getCustomerData = await commonfetching.dataOnCondition(constants.tableName.customers, req.body.email, 'email')
        console.log(getCustomerData);
        if(getCustomerData === `err`)
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : `Internal server error. While checking the email at the registration time. POST`
            });
        }
        else if(getCustomerData.length > 0)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : `This email already exists in the database`
            });
        }
        else
        {
            let oldimageLink = `http://192.168.200.130:8000/Customers/IdProofs/${getCustomerData[0].id_proof_image} `;
            console.log(`Old Image Link: `, oldimageLink)
            // http://192.168.200.130:8000/Customers/IdProofs/508580_a.png
            let filname = req.files.id_proof_image
            let newImageName = `http://192.168.200.130:8000/Customers/IdProofs/${filname}`;
            console.log(`New Image Link :`, newImageName);
            next();
        }
    }
}

exports.isDriverProfileImageSubmitted = (req, res, next) =>
{
    if(!req.files?.profile_image && req.method === 'POST' && req.url === `${url.ADD_DRIVER_PAGE_URL}/${req.params.id}`)
    {
        console.log(`Driver profile image is not uploaded`);
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
        console.log(`Driver licence image is not uploaded`);
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
        console.log(`Customer Id Proof image is not uploaded`);
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
    

exports.isDriverIdEntered = (req, res, next) =>
{
    if(!req.body.driver_id)
    {
        console.log(`Driver id is not entered`);
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : `Internal Server Error. Driver id is not entered`
        });     
    }
    else
    {
        next();
    }
}


exports.isServiceProviderIdEntered = (req, res, next) =>
{
    if(!req.body.serviceProvider_id)
    {
        console.log(`Service provider id is not entered`);
        return res.status(200).json
        ({
            code : 500,
            success: false,
            message : `Internal Server Error. Service provider id is not entered`
        });     
    }
    else
    {
        next();
    }
};


exports.checkAmountEntered = async(req, res, next) =>
{
    this.checkValueEntered(req.body.totalRecievedAmount, 'Recieved Amount')(req, res, next);
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
            console.log(`${messageField} is available`);
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
        await this.checkValueEntered(req.body.driver_amount, 'Driver amount') (req, res, next);
        await this.checkValueEntered(req.body.vehicle_amount, 'Vehicle amount') (req, res, next);
        await this.checkValueEntered(req.body.current_amount, 'Current amount') (req, res, next);
        await this.checkValueEntered(req.body.tax_amount, 'Tax amount') (req, res, next);
        await this.checkValueEntered(req.body.tax_amount, 'Tax amount') (req, res, next);
        await this.checkValueEntered(req.body.discount_amount, 'Discount amount') (req, res, next);
        await this.checkValueEntered(req.body.final_amount, 'Final amount') (req, res, next);
        next();
    } catch (error) { 
        // Handle any errors that might occur during the checks
        res.status(500).send({
            code: 500,
            status: false,
            message: 'Internal server error',
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