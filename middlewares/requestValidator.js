const con = require("../configs/db.configs");  // importing the database details 


module.exports.emailvalidation = async (req, res, next) => 
{
    const email = await req.body.email // Assigning the user entered email to email variable
    // //console.log(req.body)
    const isvalidEmail = (email) => 
    {
        const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/);    
        if (regex.test(email)) 
        {
            const domain = email.split('@')[1]; // get domain name after '@' symbol
            const domainParts = domain.split('.'); // split domain name by '.' separator
            // //console.log(domainParts); // output: ['gmail', 'com', 'com']
            if(domainParts[1] === domainParts[2])
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
    //checking
    if (isvalidEmail(email)) // Here the checking of the email value is done
    {
        next();  // If correct then next()
    } 
    else 
    {
        res.status(401).json
        ({
            message: "Invalid email"   // Or error message
        });
    }
};

/**
 * Middleware to check if the username is available.
 */
exports.usernameAvailable = (req, res, next) => 
{
    if(!req.body.userName) 
    {
        return res.status(200).send
        ({
            code : 200,
            status: "failure",
            message: "Username is required"
        });
    }
    else  
    {
        if(hasOnlyNonSpaces(req.body.userName) === true)
        {
            return res.status(200).send
            ({
                code : 200,
                status: "failure",
                message: "Username contain space. It is not allowed."
            });
        }
        else
        {
            next(); 
        }
    }  
} 


/**
 * Middleware to check if the password is available.
 */
exports.passwordValidation2 = async (req, res, next) =>
{
    //console.log('password check');
    const password = req.body.password ;
    //console.log(password);
    if (!password)
    {
        return res.status(200).send
        ({
            code : 200,
            status: "failure",
            message: "Password is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(password) === true)
        {
            return res.status(200).send
            ({
                code : 200,
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
                if(result)
                {
                    const isValidPassword = (password) =>
                    {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };
                    
                    //console.log(isValidPassword(password));

                    if (isValidPassword(password)) 
                    {
                        //console.log('here');
                        next();
                    }
                    else
                    {
                        return res.status(200).json
                        ({
                            status: false,
                            code : 200,
                            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                        });
                    }
                }
                else
                {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            });
        } 
    }
}

exports.newpassword = async (req, res, next) =>
{
    const password = await req.body.newpassword
    if (!password)
    {
        return res.status(200).send
        ({
            code : 200,
            status: "failure",
            message: "New password is required"
        });
    }
    else
    {
        if(hasOnlyNonSpaces(password) === true)
        {
            return res.status(200).send
            ({
                code : 200,
                status: "failure",
                message: "New password contain space. It is not allowed."
            });
        }
        else
        {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) =>
            {
                //console.log(result);
                if(result)
                {
                    const isValidPassword = (password) =>
                    {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };
        
                    if (isValidPassword(password)) 
                    {
                        //console.log('here');
                        next();
                    }
                    else
                    {
                        return res.status(200).json
                        ({
                            status: false,
                            code : 200,
                            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                        });
                    }
                }
                else
                {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            })
        } 
    }
}

exports.confirmnewpassword = async (req, res, next) =>
{
    const password = await req.body.confirmnewpassword
    if(!password)
    {
        return res.status(200).send
        ({
            code : 200,
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
                code : 200,
                status: "failure",
                message: "Confirm new password contain space. It is not allowed."
            });
        }
        else
        {
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) =>
            {
                //console.log(result);
                if(result)
                {
                    const isValidPassword = (password) =>
                    {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
                        //console.log(regex);
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };
        
                    if (isValidPassword(password)) 
                    {
                        //console.log('here');
                        next();
                    }
                    else
                    {
                        return res.status(200).json
                        ({
                            status: false,
                            code : 200,
                            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
                        });
                    }
                }
                else
                {
                    //console.log("Error while fetchig the regex from the password policies table");
                }
            })  
        } 
    }
}

exports.passwordsimilarity = async (req, res, next) =>
{
    if(req.body.confirmnewpassword !== req.body.newpassword)
    {
        return res.status(200).send
        ({
            code : 200,
            status: "failure",
            message: "Both the new password are not similar"
        });
    }
    else
    {
        if(req.body.password === req.body.newpassword)
        {
            return res.status(200).send
            ({
                code : 200,
                status: "failure", 
                message: "New password similar with old password. It is not allowed."
            });
        }
        else if(req.body.confirmnewpassword === req.body.password)
        {
            return res.status(200).send
            ({
                code : 200,
                status: "failure",
                message: "Confirm new password similar with old password. It is not allowed."
                
            });
        }
        else
        {
            next();   
        } 
    }
}

const passwordValidation = async (req, res, next) =>
{   
    const password = await req.body.password ; // Assigning the user entered password to password variable
    
    const isValidPassword = (password) =>
    {
        // This is regex or regular expression for verifying the password validation
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
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
            status: false,
            code : 200,
            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        });
    }
}; 


function hasOnlyNonSpaces(str)
{
    if(str.includes(" "))
    {
        return true;
    }
    else
    {
        return false;
    }
}





































































































































































exports.passwordValidation = async (req, res, next) =>
{
    
    
    const password = await req.body.password ; // Assigning the user entered password to password variable
    
    const isValidPassword = (password) =>
    {
        // This is regex or regular expression for verifying the password validation
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
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
            status: false,
            code : 200,
            message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        });
    }
}; 
