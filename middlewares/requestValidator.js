const con = require("../configs/db.configs");  // importing the database details 





/***Username validation */
exports.usernamevalidation = (req, res, next) => {
    const { user_name } = req.body;

    if (!user_name) {
        return res.status(200).send
            ({
                code: 200,
                success: false,
                message: "Username is required"
            });
    } else {
        if (hasOnlyNonSpaces(user_name) === true) {
            return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Username contain space. It is not allowed."
                });
        } else {
            try {
                let selQuery = `SELECT * FROM service_providers WHERE user_name = '${user_name}'`;
                con.query(selQuery, (err, result) => {
                    console.log(result);
                    if (result.length != 0) {
                        return res.status(400).send
                            ({
                                code: 400,
                                success: false,
                                message: "Username allredy in the database"
                            });
                    }
                    else {
                        next();
                    }
                });

            } catch (err) {
                console.log("Error while checking username in the database");
            }
        }
    }


}
/**This middle ware for email validation */
exports.emailValidation = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(200).send
            ({
                code: 200,
                status: false,
                message: "Email is required"
            });
    }

    if (hasOnlyNonSpaces(email) === true) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Email contain space. It is not allowed."

            });
    }
    else {
        const isvalidEmail = (email) => {
            const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/);
            if (regex.test(email)) {
                const domain = email.split('@')[1]; // get domain name after '@' symbol
                const domainParts = domain.split('.'); // split domain name by '.' separator
                // //console.log(domainParts); // output: ['gmail', 'com', 'com']
                if (domainParts[1] === domainParts[2]) {
                    // //console.log('Both the domain names are same. It is not a valid email');
                    return false
                }
                else {
                    // //console.log('Valid Email');
                    return true;
                }
            }
            else {
                // //console.log('Invalid Email');
                return false
            }
        };
        //checking
        if (isvalidEmail(email)) // Here the checking of the email value is done
        {
            try {


                let selQuery = `SELECT * FROM service_providers WHERE email = '${email}' `;
                con.query(selQuery, (err, result) => {
                    //console.log(result);
                    if (result.length != 0) {
                        return res.status(400).send({
                            code: 400,
                            status: false,
                            message: "This Email already exists in the database"
                        });
                    }
                    else {
                        next();
                    }
                });

            } catch (err) {
                console.log("Error while checking email in the database");
            }
        }
        else {
            res.status(400).json
                ({  
                    code : 400 ,
                    success : false,
                    message: "Invalid email",   // Or error message
                });
        }


    }


}

exports.validateUAELicenseNumber = async (req, res, next) => {
    const { licence_no } = req.body;
    if (!licence_no) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Licence Number is required"
            });
    }

    if (hasOnlyNonSpaces(licence_no)) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Licence Number contain space. It is not allowed."

            });
    } else {
        if(validateUAELicenseNumber(licence_no)){
            try {

                let verifyLicenceQuery = `SELECT * FROM service_providers WHERE licence_no = '${licence_no}'`;
                con.query(verifyLicenceQuery, (err, result) => {
                    //console.log(result);
                    if (result.length != 0) {
                        return res.status(400).send({
                            code: 400,
                            status: false,
                            message: "This Licence Number already exists in the database"
                        });
                    }
                    else {
                        next();
                    }
                });
    
            } catch (err) {
                console.log("Error while checking email in the database");
            }
        }else{
            res.status(400).json
            ({  
                code : 400 ,
                success : false,
                message: "Invalid Licence number",   // Or error message
            });
        }

        
    }

}

exports.validateUAEMobileNumber = async (req, res, next) => {
    const { contact_no, emergency_contact_no } = req.body;
    if (!contact_no) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Licence Number is required"
            });
    }
    if (!emergency_contact_no) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Emergency Contact Number  is required"
            });
    }
    if (hasOnlyNonSpaces(emergency_contact_no)) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Emergency Contact  Number contain space. It is not allowed."

            });
    }
    if (hasOnlyNonSpaces(contact_no)) {
        return res.status(400).send
            ({
                code: 400,
                status: false,
                message: "Contact Number contain space. It is not allowed."

            });
    } else {

        if(validateUAEMobileNumber(emergency_contact_no)){
            if(validateUAEMobileNumber(contact_no)){
                try {

                    let verifyPhoneNumbereQuery = `SELECT * FROM service_providers WHERE contact_no = '${contact_no}'`;
                    con.query(verifyPhoneNumbereQuery, (err, result) => {
                        //console.log(result);
                        if (result.length != 0) {
                            return res.status(400).send({
                                code: 400,
                                status: false,
                                message: "This Phone  Number already exists in the database"
                            });
                        }
                        else {
                            next();
                        }
                    });
        
                } catch (err) {
                    console.log("Error while checking email in the database");
                }
            }else{
                res.status(400).json
                ({  
                    code : 400 ,
                    success : false,
                    message: "Invalid Contact number",   // Or error message
                });
            }   
    
        }else{
            res.status(400).json
            ({  
                code : 400 ,
                success : false,
                message: "Invalid Emergency contact number",   // Or error message
            });
        }

       
    }

}
/**This middle ware for using password validation */
exports.passwordValidation = async (req, res, next) => {
    const { password } = await req.body;
    if (!password) {
        return res.status(200).send
            ({
                code: 200,
                success: false ,
                message: "Password is required"
            });
    }
    else {
        if (hasOnlyNonSpaces(password) === true) {
            return res.status(200).send
                ({
                    code: 200,
                    status: false,
                    message: "Password contain space. It is not allowed."
                });
        }
        else {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) => {
                //console.log(result); 
                if (result) {
                    const isValidPassword = (password) => {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };

                    if (isValidPassword(password)) {
                        //console.log('here');
                        next();
                    }
                    else {
                        return res.status(200).json
                            ({
                                success: false,
                                code: 200,
                                message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                            });
                    }
                }
                else {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            })
        }
    }
}

exports.licenceImageAvailable = async (req, res, next) =>{

    if (!req.files?.licence_image) {
        return res.status(400).send({
            code: 400,
            success: false,
            message: "License Image is required"
        });
    } else {
        next();
    }
}

exports.nameAvailable = async (req,res,next) =>
{
    const { name } = req.body ;
    if (!name) 
    {
            return res.status(200).send({
            code: 200,
            success: false,
            message: "Name is required"
        });
    }else{
        if (hasOnlyNonSpaces(name)){
            return res.status(200).send
            ({
                code: 200,
                status: false,
                message: "Name contain space. It is not allowed."
            });
        }else{
                next();
        } 
    }
};
exports.contactPersonAvailable = async (req,res,next) =>
{
    const { contact_person } = req.body ;
    if (!contact_person) 
    {
            return res.status(200).send({
            code: 200,
            success: false,
            message: "Contact person is required"
        });
    }else{
        if (hasOnlyNonSpaces(contact_person)){
            return res.status(200).send
            ({
                code: 200,
                status: false,
                message: "Contact Person contain space. It is not allowed."
            });
        }else{
                next();
        } 
    }
};



exports.contactAddressAvailable = async (req,res,next) =>
{
    const { contact_address } = req.body ;
    if (!contact_address) 
    {
            return res.status(200).send({
            code: 200,
            success: false,
            message: "Contact Address is required"
        });
    }else{
        if (hasOnlyNonSpaces(contact_address)){
            return res.status(200).send
            ({
                code: 200,
                status: false,
                message: "Contact Address contain space. It is not allowed."
            });
        }else{
                next();
        } 
    }
};
exports.birthdateValidation = async (req, res, next) => {

    /**
    * This Function will check the date of birht is valid or not
    */
    const isValidDOB = (DOB) => {
        // This is regex or regular expression for verify the Date or birth validation
        return DOB.match(/^\d{4}[./-]\d{2}[./-]\d{2}$/); // REGEX or regurlar expression
        // return DOB.match(/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/);
    }



    //checking
    if (isValidDOB(req.body.date_of_birth)) // from here we are sending the value in the req.body.date_of_birth to the isValidDOB function
    {
        next();// If correct then next()
    }
    else {
        res.status(401).json
            ({
                message: "Date of birth is not in correct format."   // Or error message
            })
    }
}


/**
 * Middleware to check if the password is available.
 */
exports.passwordValidation2 = async (req, res, next) => {
    //console.log('password check');
    const password = req.body.password;
    //console.log(password);
    if (!password) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Password is required"
            });
    }
    else {
        if (hasOnlyNonSpaces(password) === true) {
            return res.status(400).send
                ({
                    code: 400,
                    status: false,
                    message: "Password contain space. It is not allowed."
                });
        }
        else {


            // const isValidPassword = (password) =>
            // {
            //     const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
            //     const regex = new RegExp(regexPattern);
            //     //console.log(regex);
            //     return regex.test(password); // Use the test() method to check if the password matches the regex pattern
            // };

            // //console.log(isValidPassword(password));

            // if (isValidPassword(password)) 
            // {
            //     //console.log('here');
            //     next();
            // }
            // else
            // {
            //     return res.status(200).json
            //     ({
            //         status: false,
            //         code : 200,
            //         message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
            //     });
            // }


        }
    }
}

exports.newpassword = async (req, res, next) => {
    const password = await req.body.newpassword
    if (!password) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "New password is required"
            });
    }
    else {
        if (hasOnlyNonSpaces(password) === true) {
            return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "New password contain space. It is not allowed."
                });
        }
        else {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) => {
                //console.log(result);
                if (result) {
                    const isValidPassword = (password) => {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };

                    if (isValidPassword(password)) {
                        //console.log('here');
                        next();
                    }
                    else {
                        return res.status(200).json
                            ({
                                status: false,
                                code: 200,
                                message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                            });
                    }
                }
                else {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            })
        }
    }
}

exports.confirmnewpassword = async (req, res, next) => {
    const password = await req.body.confirmnewpassword
    if (!password) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Confirm new password is required"
            });
    }
    else {
        if (hasOnlyNonSpaces(password) === true) {
            return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Confirm new password contain space. It is not allowed."
                });
        }
        else {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) => {
                //console.log(result);
                if (result) {
                    const isValidPassword = (password) => {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };

                    if (isValidPassword(password)) {
                        //console.log('here');
                        next();
                    }
                    else {
                        return res.status(200).json
                            ({
                                status: false,
                                code: 200,
                                message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                            });
                    }
                }
                else {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            })
        }
    }
}

exports.passwordsimilarity = async (req, res, next) => {
    if (req.body.confirmnewpassword !== req.body.newpassword) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Both the new password are not similar"
            });
    }
    else {
        if (req.body.password === req.body.newpassword) {
            return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "New password similar with old password. It is not allowed."
                });
        }
        else if (req.body.confirmnewpassword === req.body.password) {
            return res.status(200).send
                ({
                    code: 200,
                    status: "failure",
                    message: "Confirm new password similar with old password. It is not allowed."

                });
        }
        else {
            next();
        }
    }
}

// module.exports.emailvalidation = async (req, res, next) => {
//     const email = await req.body.email // Assigning the user entered email to email variable
//     // //console.log(req.body)
//     const isvalidEmail = (email) => {
//         const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/);
//         if (regex.test(email)) {
//             const domain = email.split('@')[1]; // get domain name after '@' symbol
//             const domainParts = domain.split('.'); // split domain name by '.' separator
//             // //console.log(domainParts); // output: ['gmail', 'com', 'com']
//             if (domainParts[1] === domainParts[2]) {
//                 // //console.log('Both the domain names are same. It is not a valid email');
//                 return false
//             }
//             else {
//                 // //console.log('Valid Email');
//                 return true;
//             }
//         }
//         else {
//             // //console.log('Invalid Email');
//             return false
//         }
//     };
//     //checking
//     if (isvalidEmail(email)) // Here the checking of the email value is done
//     {
//         next();  // If correct then next()
//     }
//     else {
//         res.status(401).json
//             ({
//                 message: "Invalid email"   // Or error message
//             });
//     }
// };

/** Licence number validation  */
function validateUAELicenseNumber(licenseNumber) {
    // License number format: L-NN-NNNNNNN
    const licenseRegex = /^[A-Z]-\d{2}-\d{7}$/;

    return licenseRegex.test(licenseNumber);
}

const passwordValidation = async (req, res, next) => {
    const password = await req.body.password; // Assigning the user entered password to password variable

    const isValidPassword = (password) => {
        // This is regex or regular expression for verifying the password validation
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
    };

    if (isValidPassword(password)) {
        next();
    }
    else {
        return res.status(200).json
            ({
                status: false,
                code: 200,
                message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
            });
    }
};


function validateUAEMobileNumber(phoneNumber) {
    // Phone number format: +9715XXXXXXXX
    const phoneRegex = /^\+9715\d{8}$/;

    return phoneRegex.test(phoneNumber);
}

function hasOnlyNonSpaces(str) {
    if (str.includes(" ")) {
        return true;
    }
    else {
        return false;
    }
}





































































































































































exports.passwordValidation = async (req, res, next) => {


    const password = await req.body.password; // Assigning the user entered password to password variable

    const isValidPassword = (password) => {
        // This is regex or regular expression for verifying the password validation
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
    };

    if (isValidPassword(password)) {
        next();
    }
    else {
        return res.status(200).json
            ({
                status: false,
                code: 200,
                message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
            });
    }
}; 
