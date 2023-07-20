const commonfetching = require(`../../utils/helper/commonfetching`);
const con = require(`../../configs/db.configs`);

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

exports.usernameValidation = (tableName) => (req, res, next) =>
{
    if (!req.body.user_name) 
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
        if(hasOnlyNonSpaces(req.body.user_name) === true)
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
            // console.log(isValidUsername(req.body.user_name));
            if(isValidUsername(req.body.user_name))
            {
                return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "username is not valid. It must consist atleat 8 letter and less than 16 letters"
                });                                
            }
            else
            {
                let checkContactNumber = commonfetching.dataOnUsername(tableName, req.body.user_name);
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
                        message: "This username already exists in the database"
                    });
                }
                else
                {
                    console.log('Here222');
                    next();
                }
            }
        }
    }
}

exports.passwordValidation = (req, res, next) =>
{
    if (!req.body.password) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Password is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(req.body.password) === true)
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Password contain space. It is not allowed."
            });
        }
        else
        {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) => 
            {
                //console.log(result); 
                if (result)
                {
                    if (isValidPassword(result[0].value, req.body.password)) 
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
                            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character(#, $, ?, /)",
                        });
                    }
                }
                else
                {
                    console.log("Error while fetchig the regex from the password policies table");
                }
            });
        }
    }
};

exports.contactNumberValidation = (tableName) => (req, res, next) =>
{
    if (!req.body.contact_no) 
    {
        return res.status(200).send
        ({
            code: 200,
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
                code: 200,
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
                    code: 200,
                    status: "failure",
                    message: "Contact number is not in valid"
                });                                
            }
            else
            {
                let checkContactNumber = commonfetching.dataOnContactNumber(tableName, req.body.contact_no);
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
                    console.log('Here222');
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
                    message: "Contact number is not in valid"
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
                console.log('Here222');
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

exports.idProofValidation = (req, res, next) =>
{
    if (!req.body.id_proof_no) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Id proof number is required"
        });
    }
    else
    {
        next();
    }    
};

exports.isValidDescription = (req, res, next) =>
{
    if (!req.body.description) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Description is required"
        });
    }
    else
    {
        next();
    }    
};

exports.isValidLicenceNumber = (req, res, next) =>
{
    if (!req.body.licence_no) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Licence number is required"
        });
    }
    else
    {
        next();
    }    
};



