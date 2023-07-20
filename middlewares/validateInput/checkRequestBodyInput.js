const commonfetching = require(`../../utils/helper/commonfetching`);
const con = require(`../../configs/db.configs`);
const constants = require("../../utils/constants");

function hasOnlyNonSpaces(str) 
{
    if (str.includes(" "))
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
    return DOB.match(/^\d{2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/); // REGEX or regurlar expression
}

const isValidUAENumber = (phoneNumber) =>
{
    console.log('Phone Number', phoneNumber);
    // Phone number format: +9715XXXXXXXX
    const phoneRegex = /^\+9715\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

const isValidUsername = (username) => 
{
    return username.match(/^[a-zA-Z0-9]{8,12}$/);
}

const isValidPassword = (result, password) => 
{
    const regexPattern = result.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
    const regex = new RegExp(regexPattern);
    //console.log(regex);
    return regex.test(password); // Use the test() method to check if the password matches the regex pattern
};

const isvalidEmail = (email) => 
{
    const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/);
    if (regex.test(email))
    {
        const domain = email.split('@')[1]; // get domain name after '@' symbol
        const domainParts = domain.split('.'); // split domain name by '.' separator
        if (domainParts[1] === domainParts[2])
        {
            // //console.log('Both the domain names are same. It is not a valid email');
            return false
        }
        else
        {
            // //console.log('Valid Email');
            return true;
        }
    }
    else
    {
        // //console.log('Invalid Email');
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
            if (isValidPassword(result[0].value, password) )
            {
                console.log("password validation done");
                return 'validPassword'
            }
            else 
            {
                console.log('Invalid Password');
                return 'invalidPassword'
            }
        }
        else
        {
            console.log("Error while fetchig the regex from the password policies table");
            return 'notfoundRegex';
        }
    });

}

exports.emailValidation = (tableName) => async (req, res, next) =>
{
    if (!req.body.email) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Email is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.email) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Email contain space. It is not allowed."
            });
        }
        else
        {
            if(isvalidEmail(req.body.email) != true)
            {
                return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Email is not in correct format. Please check"
                });                                
            }
            else
            {
                let checkEmail = await commonfetching.dataOnEmail(tableName, req.body.email);
                if(checkEmail === 'err')
                {
                    return res.status(500).json
                    ({ 
                        error: 'Internal server error' 
                    });
                }
                else if(checkEmail.length > 0)
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This Email already exists in the database"
                    });
                }
                else
                {
                    next();
                }
            }
        }
    }   
};

exports.emailValidationWhileUpdate = (tableName) => async (req, res, next) =>
{
    if (!req.body.email) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Email is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.email) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Email contain space. It is not allowed."
            });
        }
        else
        {
            if(isvalidEmail(req.body.email) != true)
            {
                return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Email is not in correct format. Please check"
                });                                
            }
            else
            {
                console.log('table: ', tableName);
                let checkEmail = await commonfetching.dataOnEmailUpdate(tableName,'email', req.body.email, req.params.id);
                if(checkEmail === 'internalError')
                {
                    return res.status(500).json
                    ({ 
                        error: 'Internal server error' 
                    });
                }
                
                if(checkEmail === 'emailnotavailable')
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This Email already exists in the database. Someone is already registered with this email"
                    });
                }
                
                if(checkEmail === 'emailnotchanged')
                {
                    next();
                }

                if(checkEmail === 'true')
                {
                    next();
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
            code: 200,
            status: false,
            message: "Username is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.userName) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Username contain space. It is not allowed."
            });
        }
        else
        {
            // console.log(isValidUsername(req.body.userName));
            // if(isValidUsername(req.body.userName))
            // {
            //     return res.status(200).send
            //     ({
            //         code: 200,
            //         status: "failure",
            //         message: "username is not valid. It must consist atleat 8 letter and less than 16 letters"
            //     });                                
            // }
            // else
            // {
                let checkUsername = await commonfetching.dataOnUsername(tableName, req.body.userName);
                if(checkUsername === 'err')
                {
                    return res.status(500).json
                    ({ 
                        error: 'Internal server error' 
                    });
                }
                else if(checkUsername.length > 0)
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This username already exists in the database"
                    });
                }
                else
                {
                    next();
                }
            // }
        }
    }
}

exports.usernameValidationWhileUpdate = (tableName) => async (req, res, next) =>
{
    if (!req.body.userName) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Username is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.userName) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Username contain space. It is not allowed."
            });
        }
        else
        {
            // console.log(isValidUsername(req.body.userName));
            // if(isValidUsername(req.body.userName))
            // {
            //     return res.status(200).send
            //     ({
            //         code: 200,
            //         status: "failure",
            //         message: "username is not valid. It must consist atleat 8 letter and less than 16 letters"
            //     });                                
            // }
            // else
            // {

                    let checkEmail = await commonfetching.dataOnUsernameUpdate(tableName, req.body.userName, req.params.id);
                    if(checkEmail === 'internalError')
                    {
                        return res.status(500).json
                        ({ 
                            error: 'Internal server error' 
                        });
                    }
                    
                    if(checkEmail === 'usernamenotavailable')
                    {
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "This username already exists in the database. Someone is already registered with this username"
                        });
                    }
                    
                    if(checkEmail === 'usernamenotchanged')
                    {
                        next();
                    }

                    if(checkEmail === 'true')
                    {
                        next();
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
            code: 400,
            status: false,
            message: "Contact number is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.contact_no) === true)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "Contact Number contain space. It is not allowed."
            });
        }
        else
        {
            console.log(isValidUAENumber(req.body.contact_no));
            if(!isValidUAENumber(req.body.contact_no))
            {
                return res.status(200).send
                ({
                    code: 400,
                    status: "failure",
                    message: "Contact number is not in valid"
                });                                
            }
            else
            {
                let checkContactNumber = await commonfetching.dataOnContactNumber(tableName, req.body.contact_no);
                console.log('Number Already Available :', checkContactNumber);
                if(checkContactNumber === 'err')
                {
                    return res.status(500).json
                    ({ 
                        error: 'Internal server error' 
                    });
                }
                else if(checkContactNumber.length > 0)
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "Contact number already exists in the database"
                    });
                }
                else
                {
                    next();
                }
            }
        }
    }
}

exports.contactNumberValidationWhileUpdate = (tableName) => async (req, res, next) =>
{
    if (!req.body.contact_no) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Contact number is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.contact_no) === true)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "Contact Number contain space. It is not allowed."
            });
        }
        else
        {
            console.log(isValidUAENumber(req.body.contact_no));
            if(!isValidUAENumber(req.body.contact_no))
            {
                return res.status(200).send
                ({
                    code: 400,
                    status: "failure",
                    message: "Contact number is not in valid"
                });                                
            }
            else
            {
                let checkContactNumber = await commonfetching.dataOnContactNumberUpdate(tableName, req.body.contact_no, req.params.id);
                if(checkContactNumber === 'internalError')
                {
                    return res.status(200).json
                    ({
                        code : 500,
                        status: false,
                        error: 'Internal server error' 
                    });
                }

                if(checkContactNumber === 'contactnumbernotavailable')
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This contact number already exists in the database. Someone is already registered with this contact nnumber"
                    });
                }
                    
                if(checkContactNumber === 'contactnumbernotchanged')
                {
                    next();
                }

                if(checkContactNumber === 'true')
                {
                    next();
                }                
            }
        }
    }
}

exports.isValidEmergencyContactNumber =  (req, res, next) =>
{
    if (!req.body.emergency_contact_no) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Emergency contact number is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.emergency_contact_no) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Emergency contact number contain space. It is not allowed."
            });
        }
        else
        {
            console.log(isValidUAENumber(req.body.contact_no));
            if(!isValidUAENumber(req.body.contact_no))
            {
                return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Emergency Contact number is not in valid"
                });                                
            }
            else
            {
                next();
            }
        }
    }
}

exports.dateOfBirthValidation = (req, res, next) =>
{
    if (!req.body.date_of_birth) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Date of Birth is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.date_of_birth) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Date of birth contain space. It is not allowed."
            });
        }
        else
        {
            console.log(isValidDateOfBirth(req.body.date_of_birth));
            if(!isValidDateOfBirth(req.body.date_of_birth))
            {
                return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Date of birth is not in valid. The correct format is DD/Month starting three Letters/YYYY"
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
            code: 200,
            status: false,
            message: "Name is required"
        });
    }
    else
    {
        next();
    }    
};

exports.idProofValidation = async(req, res, next) =>
{
    if (!req.body.id_proof_no) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Id proof number is required"
        });
    }
    else
    {
        let checkIdProofNumber = await commonfetching.vehiclesMiddleware(constants.tableName.customers, 'id_proof_no', req.body.id_proof_no) 
        console.log(checkIdProofNumber);
        if(checkIdProofNumber === 'err')
        {
            console.log('Internal Server Error');
            return res.status(200).json
            ({
                code : 500,
                status: false,
                error: 'Internal server error while checking id proof number' 
            });            
        }
        else if (checkIdProofNumber.length > 0)
        {
            console.log('Some body already having this id proof number. It cannot be duplicate');
            return res.status(200).json
            ({
                code : 400,
                status: false,
                error: 'Some body already having this id proof number. It cannot be duplicate'
            });    
        }
        else
        {
            console.log('No one having this id proof number');
            next();
        }
        
    }    
};

exports.idProofValidationWhileUpdate = async(req, res, next) =>
{
    if (!req.body.id_proof_no) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Id proof number is required"
        });
    }
    else
    {
        let checkIdProofNumber = await commonfetching.dataOnIdProofNumberUpdate(constants.tableName.customers, req.body.id_proof_no, req.params.id);
        if(checkIdProofNumber === 'internalError')
        {
            return res.status(200).json
            ({
                code : 500,
                status : false,
                error: 'Internal server error' 
            });
        }
        
        if(checkIdProofNumber === 'idproofnumbernotavailable')
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This id proof number already exists in the database. Someone is already registered with this id proof number"
                    });
                }
                
                if(checkIdProofNumber === 'idproofnumbernotchanged')
                {
                    next();
                }

                if(checkIdProofNumber === 'true')
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
            code: 400,
            status: false,
            message: "Description is required"
        });
    }
    else
    {
        next();
    }    
};

exports.isValidLicenceNumber = async (req, res, next) =>
{
    if (!req.body.licence_no) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Licence number is required"
        });
    }
    else
    {
        let checkIdProofNumber = await commonfetching.vehiclesMiddleware(constants.tableName.drivers, 'licence_no', req.body.licence_no); 
        console.log('CheckIdProof : ',checkIdProofNumber);
        if(checkIdProofNumber === 'err')
        {
            console.log('Internal Server Error');
            return res.status(200).json
            ({
                code : 500,
                status: false,
                error: 'Internal server error while checking licence number in driver table' 
            });            
        }
        else if (checkIdProofNumber.length > 0)
        {
            console.log('Some body already having this licence number. It cannot be duplicate');
            return res.status(200).json
            ({
                code : 400,
                status: false,
                error: 'Some body already having this licence number. It cannot be duplicate'
            });    
        }
        else
        {
            console.log('No one having this licence number');
            next();
        }
    }    
};

exports.isValidLicenceNumberWhileUpdate = async (req, res, next) =>
{
    if (!req.body.licence_no) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Licence number is required for update time"
        });
    }
    else
    {
        let checkLicenceNumber = await commonfetching.dataLicenceNumberOnUpdate(constants.tableName.drivers, req.body.licence_no, req.params.id); 
        console.log('CheckIdProof : ',checkLicenceNumber);
        if(checkLicenceNumber === 'internalError')
        {
            return res.status(200).json
            ({
                code : 500,
                status : false,
                error: 'Internal server error whit updating the licence number' 
            });
        }
        
        if(checkLicenceNumber === 'licencenumbernotavailable')
                {
                    return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: "This licence number already exists in the database. Someone is already registered with this licence number"
                    });
                }
                
                if(checkLicenceNumber === 'licencenumbernotchanged')
                {
                    next();
                }

                if(checkLicenceNumber === 'true')
                {
                    next();
                } 
    }    
};



exports.newpassword = async (req, res, next) => 
{
    const password = await req.body.newpassword
    if (!password)
    {
        return res.status(200).send
        ({
                code: 400,
                status: "failure",
                message: "New password is required"
        });
    }
    else
    {
        if (hasOnlyNonSpaces(password) === true)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "New password contain space. It is not allowed."
            });
        }
        else
        {
            if(validDatePassword(password) === 'invalidPassword')
            {
                return res.status(200).json
                ({
                    success: false,
                    code: 400,
                    message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character(#, $, ?, /)",
                });
            }
            else if(password === 'notfoundRegex')
            {
                return res.status(200).json
                ({
                    code: 500,
                    success: false,
                    message: "Internal Server Error"
                });
            }   
            else
            {
                console.log('Password Matched');
                next();
            }  
        }
    }
}

exports.confirmnewpassword = async (req, res, next) =>
{
    const password = await req.body.confirmnewpassword
    if (!password)
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: "Confirm new password is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(password) === true)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "Confirm new password contain space. It is not allowed."
            });
        }
        else
        {
            
            if(validDatePassword(password) === 'invalidPassword')
            {
                return res.status(200).json
                ({
                    success: false,
                    code: 400,
                    message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character(#, $, ?, /)",
                });
            }
            else if(password === 'notfoundRegex')
            {
                return res.status(200).json
                ({
                    code: 500,
                    success: false,
                    message: "Internal Server Error"
                });
            }   
            else
            {
                console.log('Password Matched');
                next();
            }  
        }
    }
}

exports.passwordsimilarity = async (req, res, next) => {
    if (req.body.confirmnewpassword !== req.body.newpassword) {
        return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "Both the new password are not similar"
            });
    }
    else {
        if (req.body.password === req.body.newpassword) {
            return res.status(200).send
                ({
                    code: 400,
                    status: "failure",
                    message: "New password similar with old password. It is not allowed."
                });
        }
        else if (req.body.confirmnewpassword === req.body.password) {
            return res.status(200).send
                ({
                    code: 400,
                    status: "failure",
                    message: "Confirm new password similar with old password. It is not allowed."

                });
        }
        else {
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
            code: 400,
            status: false,
            message: "Password is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(password) === true)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: "Password contain space. It is not allowed."
            });
        }
        else
        {
            if(validDatePassword(password) === 'invalidPassword')
            {
                return res.status(200).json
                ({
                    success: false,
                    code: 400,
                    message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character(#, $, ?, /)",
                });
            }
            else if(password === 'notfoundRegex')
            {
                return res.status(200).json
                ({
                    code: 500,
                    success: false,
                    message: "Internal Server Error"
                });
            }   
            else
            {
                console.log('Password Matched');
                next();
            }      
        }
    }
};



exports.isPageNumberEntered = (req, res, next) =>
{
    if(!req.body.page)
    {
        console.log('Page number value is not entered');
        return res.status(200).json
        ({
            code: 500,
            success: false,
            message: "Internal Server Error. Page Number value is nt entered"
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
        console.log('Page size is not entered');
        return res.status(200).json
        ({
            code: 500,
            success: false,
            message: "Internal Server Error. Page size is not entered"
        });     
    }
    else
    {
        next();
    }
}


exports.isCustomerIdProofImageSubmitted = (req, res, next) =>
{
    if(!req.files?.id_proof_image)
    {
        console.log('Id proof image is not uploaded');
        return res.status(200).json
        ({
            code: 400,
            success: false,
            message: "Customer Id proof image is not uploaded"
        });     
    }
    else
    {
        next();
    }
}

exports.isDriverProfileImageSubmitted = (req, res, next) =>
{
    if(!req.files?.profile_image)
    {
        console.log('Driver profile image is not uploaded');
        return res.status(200).json
        ({
            code: 400,
            success: false,
            message: "Driver profile image is not uploaded"
        });     
    }
    else
    {
        next();
    }
}

exports.isDriverLicenceImageSubmitted = (req, res, next) =>
{
    if(!req.files?.licence_img)
    {
        console.log('Driver licence image is not uploaded');
        return res.status(200).json
        ({
            code: 400,
            success: false,
            message: "Driver licence image is not uploaded"
        });     
    }
    else
    {
        next();
    }
}