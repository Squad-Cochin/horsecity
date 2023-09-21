const con = require("../configs/db.configs");  // importing the database details 
const constants = require("../utils/constants");
const url = require("../utils/url_helper")

/***Username validation */
exports.usernamevalidation = (req, res, next) => {
    const { user_name } = req.body;
    const requestMethod = req.method;
    const URL = req.url ;
    if (!user_name) {
        return res.status(200).send
            ({
                code: 400,
                success: false,
                message: constants.responseMessage.usernameNotPresent
            });
    } else {
        if(req.body.user_name.length < 4)
        {
            return res.status(200).send
            ({
                code : 400,
                status : false,
                message : constants.responseMessage.unsernameinvalid
            });
        }else if (hasOnlyNonSpaces(user_name) === true) {
            return res.status(200).send
                ({
                    code: 400,
                    status: false,
                    message: constants.responseMessage.usernameHaveSpace
                });
        } else {
         
                if(requestMethod == 'POST' && URL ==  url.ADD_SERVICEPROVIDER__URL){

                    try {
                let selQuery = `SELECT * FROM service_providers WHERE user_name = '${user_name}' AND deleted_at IS NULL`;
                con.query(selQuery, (err, result) => {
            
                    if (result.length != 0) {
                        return res.status(200).send
                            ({
                                code: 400,
                                success: false,
                                message: constants.responseMessage.usernameAlreadyExist
                            });
                    }
                    else {
                        next();
                    }
                });
            } catch (err) {
            }
            }else if(requestMethod == 'PUT'  && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){
                let id = req.params.id
                let selQuery = `SELECT user_name FROM service_providers WHERE id = '${id}';`;
                con.query(selQuery, (err, result) => {      
                        if(result[0]?.user_name == user_name){
                              
                                next();
                        }else{
               
                            let selQuery = `SELECT * FROM service_providers WHERE user_name = '${user_name}' AND deleted_at IS NULL`;
                            con.query(selQuery, (err, result) => {
                        
                                if (result.length != 0) {
                                    return res.status(200).send
                                        ({
                                            code: 400,
                                            success: false,
                                            message: constants.responseMessage.usernameAlreadyExist
                                        });
                                }
                                else {
                                    next();
                                }
                            });
                        }
             
                });
         } 

     
        }
    }


}

exports.nameValidation = (req, res, next) =>
{
    const {customer_name }= req.body;
    if (!customer_name || !/^[a-zA-Z\s]+$/.test(customer_name))
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.invalidName,
        });
    }
    else
    {
        next();
    }    
};
/**This middle ware for email validation */
exports.emailValidation = async (req, res, next) => {
    const { email } = req.body;
    const requestMethod = req.method;
    const URL = req.url

    if (!email) {
        return res.status(200).send
            ({
                code: 200,
                status: false,
                message: constants.responseMessage.emailNotPresent
            });
    }

    if (hasOnlyNonSpaces(email) === true) {
        return res.status(200).send
            ({
                code: 200,
                status: "failure",
               message: constants.responseMessage.emailHaveSpace

            });
    }
    else {
        const isvalidEmail = (email) => 
        {
            const regex = (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$/);
            if (regex.test(email))
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
        
        //checking
        if (isvalidEmail(email)) // Here the checking of the email value is done
        {
            try {

             if(requestMethod == 'POST' && URL ==  url.ADD_SERVICEPROVIDER__URL){
                let selQuery = `SELECT * FROM service_providers WHERE email = '${email}' AND deleted_at IS NULL`;
                con.query(selQuery, (err, result) => {
                    if (result.length != 0) {
                        return res.status(200).send({
                            code: 400,
                            status: false,
                            message: constants.responseMessage.emailAlreadyExist
                        });
                    }
                    else {
                  
                        next();
                    }
                });
             }else if(requestMethod == 'PUT' && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){
                let id = req.params.id
                let selQuery = `SELECT email FROM service_providers WHERE id = '${id}';`;
                con.query(selQuery, (err, result) => {      
                        if(result[0]?.email == email){
                              
                                next();
                        }else{
               
                            let selQuery = `SELECT * FROM service_providers WHERE email = '${email}' AND deleted_at IS NULL`;
                            con.query(selQuery, (err, result) => {
                        
                                if (result.length != 0) {
                                    return res.status(200).send
                                        ({
                                            code: 400,
                                            success: false,
                                            message: constants.responseMessage.emailAlreadyExist
                                        });
                                }
                                else {
                                    next();
                                }
                            });
                        } 
             
                });
             }else if(requestMethod == 'PUT' && URL == url.UPDATE_SETTINGS_PAGE_URL){
  
                    next()
             }else if(requestMethod == 'POST' && URL == url.FORGOT_PASSWORD__URL){
            
            let selQuery = `SELECT * FROM service_providers WHERE email = '${email}' AND deleted_at IS NULL`;
            con.query(selQuery, (err, result) => {
              
                if (result.length != 0) {
                    next();
                }
                else {
                
                    return res.status(200).send({
                        code: 400,
                        status: false,
                        message: constants.responseMessage.emailnotexist
                    });
                }
            });

         }
               

            } catch (err) {
            }
        }
        else {
            res.status(200).json
                ({  
                    code : 400 ,
                    success : false,
                    message: constants.responseMessage.emailIncorrectFormat
                });
        }


    }


}

exports.validateUAELicenseNumber = async (req, res, next) => {

    const requestMethod = req.method;
    const URL = req.url

    
            try {
          
                if(requestMethod == 'POST' || requestMethod == 'PUT' && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){
                    const { licence_no } = req.body;
                    if (!licence_no) {
                        return res.status(200).send
                            ({
                                code: 400,
                                status: false,
                                message: constants.responseMessage.licensenonotpresent
                            });
                    }
                    if (hasOnlyNonSpaces(licence_no)) {
                        return res.status(200).send
                            ({
                                code: 400,
                                status: false,
                                message: constants.responseMessage.licensenohavespaces
                
                            });
                    }
                    //  else if(validateUAELicenseNumber(licence_no)) {
                            if(requestMethod == 'POST'){
                            let verifyLicenceQuery = `SELECT * FROM service_providers WHERE licence_no = '${licence_no}' AND deleted_at IS NULL`;
                            con.query(verifyLicenceQuery, (err, result) => {
                                if (result.length != 0) {
                                    return res.status(200).send({
                                        code: 400,
                                        status: false,
                                        message: constants.responseMessage.licensenoalreadyexist
                                    });
                                }
                                else {
                                    next();
                                }
                            });
            }else if(requestMethod == 'PUT' && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){
                let id = req.params.id
        
                let selQuery = `SELECT licence_no FROM service_providers WHERE id = '${id}';`;
                con.query(selQuery, (err, result) => {      
                        if(result[0]?.licence_no == licence_no){
                              
                                next();
                        }else{
               
                            let selQuery = `SELECT * FROM service_providers WHERE licence_no = '${licence_no}' AND deleted_at IS NULL`;
                            con.query(selQuery, (err, result) => {
                        
                                if (result.length != 0) {
                                    return res.status(200).send
                                        ({
                                            code: 400,
                                            success: false,
                                            message: constants.responseMessage.licensenoalreadyexist
                                        });
                                }
                                else {
                                    next();
                                }
                            });
                        }
             
                });
         }

    }else if(requestMethod == 'PUT' && URL == url.UPDATE_SETTINGS_PAGE_URL ){
         const { licence_number} = req.body;
    
        
            if(!licence_number){
                return res.status(200).send
                ({
                    code: 400,
                    status: false,
                    message: constants.responseMessage.licensenonotpresent
                });
            }else if(hasOnlyNonSpaces(licence_number)) {
                return res.status(200).send
                    ({
                        code: 400,
                        status: false,
                        message: constants.responseMessage.licensenohavespaces
        
                    });
            }

            else{
                 next();
            }
      
           }        
    
            } catch (err) {
                console.log("Error whilevalidating licence number in the database");
            }
        

}

/**Languages middleware */
exports.verifyLanguageBody = async(req,res,next) =>
{
    const method = req.method;
    req.body.name = req.body.name.toLowerCase().trim();
    req.body.abbreviation = req.body.abbreviation.toLowerCase().trim();
    const {name,abbreviation} = req.body;
    if(!name){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: constants.responseMessage.invalidName
        });
    }else if(!abbreviation){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Abbriviation is required ."
        });
    }
    if(method == 'POST'){ 
        try {
            if(req.files?.language_file){
                let selQuery = `SELECT * FROM ${constants.tableName.languages}  WHERE name = '${name}' 
                AND deleted_at IS NULL`;
                con.query(selQuery, (err, result) => {
                    if (result.length != 0) {
                        return res.status(200).send
                            ({
                                code: 400,
                                success: false,
                                  message: constants.responseMessage.namealreadyexists
                            });
                    }
                    else {         
                        let selQuery = `SELECT * FROM ${constants.tableName.languages}  WHERE abbreviation = '${abbreviation}' 
                        AND deleted_at IS NULL`;
                        con.query(selQuery, (err, result) => {
                            if (result.length != 0) {
                                return res.status(200).send
                                    ({
                                        code: 400,
                                        success: false,
                                        message: constants.responseMessage.validatorError55
                                    });
                            }
                            else {         
                                next();
                            }
                        });
                    }
                });
            }else{
                return res.status(200).send
                ({
                    code: 400,
                    success: false,
                    message: "Language file is required ."
                });
            }

        } catch (err) {
            console.log("Error while checking discount name in the database");
        }
        
    }else if(method == 'PUT'){

        let id = req.params.id
        let selQuery = `SELECT name FROM ${constants.tableName.languages}  WHERE id = '${id}'
        AND deleted_at IS NULL`;
        con.query(selQuery, async(err, result) => {      
                if(result[0]?.name == name){
                      
       
                            if(result[0]?.abbreviation == abbreviation){
                                  
                            next();
                          
                            }else{
                   
                                let selQuery = `SELECT * FROM ${constants.tableName.languages}  WHERE abbreviation = '${abbreviation}'
                                AND deleted_at IS NULL`;
                                con.query(selQuery, async(err, result) => {
                            
                                    if (result.length != 0) {
                                        return res.status(200).send
                                            ({
                                                code: 400,
                                                success: false,
                                                message: constants.responseMessage.validatorError55
                                            });
                                    }
                            
                                });
                            } 
                 
          
              
                }else{
       
                    let selQuery = `SELECT * FROM ${constants.tableName.languages}  WHERE name = '${name}'
                    AND deleted_at IS NULL`;
                    con.query(selQuery, async(err, result) => {
                
                        if (result.length != 0) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    success: false,
                                    message: constants.responseMessage.namealreadyexists
                                });
                        }
                    
                    });
                } 
     
        });

    }


}

exports.verifyToken = async (req,res,next ) =>
{
    const bearerToken = req.headers.authorization;
    
    
    if(!bearerToken)
    {
    
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Bearer token not submitted. It is required ."
        });
    }
    const token = bearerToken.split(' ')[1];
    if(process.env.clientApiToken === token)
    {
        next()
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Invalid token ."
        });
    }
}

 
exports.validateUAEMobileNumber = async (req, res, next) => {
    const { contact_no, emergency_contact_no } = req.body;
    const requestMethod = req.method;
    const URL = req.url
    if(contact_no === emergency_contact_no){
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: 'The contact number and emergency contact number both are the same, which is not allowed .'
        });
    }
    

                try {
                    if(requestMethod == 'POST' ||requestMethod == 'PUT' && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){

                        if (!contact_no  ) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    status: false,
                                    message: constants.responseMessage.contactnumbernotpresent
                                });
                        }
                        if (!emergency_contact_no) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    status: false,
                                    message: constants.responseMessage.emgcontactnumbernotpresent
                                });
                        }
                        if (hasOnlyNonSpaces(emergency_contact_no)) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    status: false,
                                    message: constants.responseMessage.emgcontactnumberhavespaces
                    
                                });
                        }
                        if (hasOnlyNonSpaces(contact_no)) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    status: false,
                                    message: constants.responseMessage.contactnumberhavespaces
                    
                                });
                        } else {
                    if(requestMethod == 'POST'){
                    let verifyPhoneNumbereQuery = `SELECT * FROM service_providers WHERE contact_no = '${contact_no}' AND deleted_at IS NULL`;
                    con.query(verifyPhoneNumbereQuery, (err, result) => {
  
                        if (result.length != 0) {
                            return res.status(200).send({
                                code: 400,
                                status: false,
                                message: constants.responseMessage.contactnumberAlreadyExist
                            });
                        }
                        else {
                            next();
                        }
                    });
                }else if(requestMethod == 'PUT' && URL == url.UPDATE_SERVICE_PROVIDER_URL  + req.params?.id){
                    let id = req.params.id
                    let selQuery = `SELECT contact_no FROM service_providers WHERE id = '${id}';`;
                    con.query(selQuery, (err, result) => {      
                            if(result[0]?.contact_no == contact_no){
                                  
                                    next();
                            }else{
                   
                                let selQuery = `SELECT * FROM service_providers WHERE contact_no = '${contact_no}' AND deleted_at IS NULL        `;
                                con.query(selQuery, (err, result) => {
                            
                                    if (result.length != 0) {
                                        return res.status(200).send
                                            ({
                                                code: 400,
                                                success: false,
                                                message: constants.responseMessage.contactnumberAlreadyExist
                                            });
                                    }
                                    else {
                                        next();
                                    }
                                });
                            }
                 
                    });
             }}}
             
             if(requestMethod == 'PUT' && URL == url.UPDATE_SETTINGS_PAGE_URL  ){
               
                const { language_id,currency_id,tax_id,phone, country_code,invoice_prefix,quotation_prefix} = req.body;
                    if(!country_code){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Cuntrey code is required ."
                        });
                    }else 
                    if(!language_id){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Language id is required ."
                        });
                    }else
                    if(!currency_id){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Currency id  is required ."
                        });
                    }else
                    if(!invoice_prefix){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Invoice code is required ."
                        });
                    }else
                    if(!quotation_prefix){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Quotation code is required ."
                        });
                    }else 
                    if(!tax_id){
                        return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Tax id is required ."
                        });
                    }else

                if (!phone  ) {
                    return res.status(200).send
                        ({
                            code: 400,
                            status: false,
                            message: "Phone Number is required ."
                        });
                }

               else {  

                     next();
                }
          
               }    
                } catch (err) {
                    console.log("Error while validating phone number in the database");
                }

}


/**This middle ware for using password validation */
exports.passwordValidation = async (req, res, next) => {
    const { password } = await req.body;
    if (!password) {
        return res.status(200).send
            ({
                code: 400,
                success: false ,
                message: "Password is required ."
            });
    }
    else {
        if (hasOnlyNonSpaces(password) === true) {
            return res.status(200).send
                ({
                    code: 400,
                    status: false,
                    message: constants.responseMessage.passwordhavespaces
                });
        }
        else {
       
            let selQuery = `SELECT * FROM password_policies WHERE name = 'regex1' `;
            con.query(selQuery, (err, result) => {
                if (result) {
                    const isValidPassword = (password) => {
                        const regexPattern = result[0].value.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes
                        const regex = new RegExp(regexPattern);
               
                        return regex.test(password); // Use the test() method to check if the password matches the regex pattern
                    };

                    if (isValidPassword(password)) {
                 
                        next();
                    }
                    else {
                        return res.status(200).json
                            ({
                                success: false,
                                code: 400,
                                message: constants.responseMessage.passwordinvalid
                            });
                    }
                }
                else {
                }
            })
        }
    }
}

exports.licenceImageAvailable = async (req, res, next) =>{

    if (!req.files?.licence_image) {
        return res.status(200).send({
            code: 400,
            success: false,
            message: "License image is required ."
        });
    } else {
     
        next();
    }
}

exports.nameAvailable = async (req,res,next) =>
{

    const { name } = req.body;
    const method = req.method;
    if (!name) {
        return res.status(200).send({
            code: 400,
            success: false,
            message: 'Name is required .'
        });
    } else {
        if(method == 'POST'){ 
            try {
                let selQuery = `SELECT * FROM ${constants.tableName.service_providers} sp WHERE sp.name = '${name}' 
                                AND sp.deleted_at IS NULL`;
                con.query(selQuery, (err, result) => {
                  
                    if (result.length != 0) {
                        return res.status(200).send
                            ({
                                code: 400,
                                success: false,
                                message: constants.responseMessage.namealreadyexists
                            });
                    }
                    else {         
    
                            next();
                        
                    }
                });
            } catch (err) {
                console.log("Error while checking service provider  name on the database");
            }
            
        }else if(method == 'PUT'){
    
            let id = req.params.id;
            let selQuery = `SELECT name FROM ${constants.tableName.service_providers} sp WHERE sp.id = '${id}'
            AND sp.deleted_at IS NULL`;
            con.query(selQuery, async(err, result) => {      
                    if(result[0]?.name == name){
                          
                     next();
                  
                    }else{
                        let selQuery = `SELECT * FROM ${constants.tableName.service_providers} sp  WHERE sp.name = '${name}'
                        AND sp.deleted_at IS NULL`;
                        con.query(selQuery, async(err, result) => {
                    
                            if (result.length != 0) {
                                return res.status(200).send
                                    ({
                                        code: 400,
                                        success: false,
                                        message: constants.responseMessage.namealreadyexists
                                    });
                            }
                            else {
                                next();
                            }
                        });
                    } 
            });
        }
      
    }
    
};

exports.appTitleAvailable = async (req,res,next) =>
{

    const { application_title } = req.body;
    if ( !application_title) {
        return res.status(200).send({
            code: 400,
            success: false,
            message: 'Application Title is required .'
        });
    } else {
        next();
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
            message: "Contact person is required ." 
        });
    }else{
 
                next();
        
    }
};
/**Taxation middle ware */
exports.verifyTaxationBody = async(req,res,next) =>
{
    const method = req.method;
    console.log("herr11");
    const {type,value,name} = req.body;
    if (!name || !/^[a-zA-Z\s]+$/.test(name))
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.invalidName,
        });
    }else if(!name){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Name is required ."
        });
    }else if(!type){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Type is required ."
        });
    }else if(!value){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Value is required ."
        });

    }

    if(method == 'POST'){ 
        try {
            let selQuery = `SELECT * FROM ${constants.tableName.taxations} tx WHERE tx.name = '${name}' 
                            AND tx.deleted_at IS NULL`;
            con.query(selQuery, (err, result) => {
              
                if (result.length != 0) {
                    return res.status(200).send
                        ({
                            code: 400,
                            success: false,
                            message: constants.responseMessage.namealreadyexists
                        });
                }
                else {         

                        next();
                    
                }
            });
        } catch (err) {
            console.log("Error while checking taxation name in the database");
        }
        
    }else if(method == 'PUT'){

        let id = req.params.id
        let selQuery = `SELECT name FROM ${constants.tableName.taxations} tx WHERE tx.id = '${id}'
        AND tx.deleted_at IS NULL`;
        con.query(selQuery, async(err, result) => {      
                if(result[0]?.name == name){
                      
                 next();
              
                }else{
                    let selQuery = `SELECT * FROM ${constants.tableName.taxations} tx  WHERE tx.name = '${name}'
                    AND tx.deleted_at IS NULL`;
                    con.query(selQuery, async(err, result) => {
                
                        if (result.length != 0) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    success: false,
                                    message: constants.responseMessage.namealreadyexists
                                });
                        }
                        else {
                            next();
                        }
                    });
                } 
        });
    }
}

/**Discount middleware */
exports.verifyDiscountBody = async(req,res,next) =>
{
    const method = req.method;
    const {type,rate,name} = req.body;
    if (!name || !/^[a-zA-Z\s]+$/.test(name))
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.invalidName,
        });
    }else if(!name){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Name is required ."
        });
    }else if(!type){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Type is required ."
        });
    }else if(!rate){
        return res.status(200).send
        ({
            code: 400,
            success: false,
            message: "Rate is required ."
        });

    }
    if(type == 'PERCENTAGE' ||  type == 'FLAT'){

    if(method == 'POST'){ 
        try {
            let selQuery = `SELECT * FROM ${constants.tableName.discount_types}  WHERE name = '${name}' 
                            AND deleted_at IS NULL`;
            con.query(selQuery, (err, result) => {
           
                if (result.length != 0) {
                    return res.status(200).send
                        ({
                            code: 400,
                            success: false,
                            message: constants.responseMessage.namealreadyexists
                        });
                }
                else {             
                         next();
                  }
            });
        } catch (err) {
            console.log("Error while checking discount name in the database");
        }
        
    }else if(method == 'PUT'){

        let id = req.params.id
        let selQuery = `SELECT name FROM ${constants.tableName.discount_types}  WHERE id = '${id}'
        AND deleted_at IS NULL`;
        con.query(selQuery, async(err, result) => {      
                if(result[0]?.name == name){    

                      next();

                }else{
                    let selQuery = `SELECT * FROM ${constants.tableName.discount_types}  WHERE name = '${name}'
                    AND deleted_at IS NULL`;
                    con.query(selQuery, async(err, result) => {
                
                        if (result.length != 0) {
                            return res.status(200).send
                                ({
                                    code: 400,
                                    success: false,
                                    message: constants.responseMessage.namealreadyexists
                                });
                        }
                        else {
                            next();
                        }
                    });
                } 
        });
    }
}else{
    return res.status(200).send
    ({
        code: 400,
        success: false,
        message: "Type only allowed PERCENTAGE || FLAT"
    });
}
}


exports.contactAddressAvailable = async (req,res,next) =>
{
    const { contact_address } = req.body ;
    if (!contact_address) 
    {
            return res.status(200).send({
            code: 200,
            success: false,
            message: "Contact Address is required ."
        });
    }else{
        next(); 
    }
};


exports.idProofNumber = (req,res, next) =>
{
    if(!req.body.id_proof_no)
    {
        return res.status(200).send
        ({
            code: 200,
            success: false,
            message: "Id Proof Number is required ."
        });
    }
    else
    {
        next();
    }
}




exports.name = (req,res, next) =>
{
    if(!req.body.name)
    {
        return res.status(200).send
        ({
            code: 200,
            success: false,
            message: "Name is required ."
        });
    }
    else
    {
        next();
    }
}

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

/** Licence number validation  */
function validateUAELicenseNumber(licenseNumber) {
    // License number format: L-NN-NNNNNNN
    const licenseNumberPattern = /^[A-Za-z]\d{8}$/;

    // Check if the license number matches the specified format
    return licenseNumberPattern.test(licenseNumber);
  
}


function validateUAEMobileNumber(phoneNumber) {
    // Phone number format: +9715XXXXXXXX
    const phoneRegex = /^\+9715\d{8}$/;

    return phoneRegex.test(phoneNumber);
}
/**This for verifying space */
function hasOnlyNonSpaces(str) {
    if (str.includes(" ")) {
        return true;
    }
    else {
        return false;
    }
}





































































































































































// exports.passwordValidation = async (req, res, next) => {


//     const password = await req.body.password; // Assigning the user entered password to password variable

//     const isValidPassword = (password) => {
//         // This is regex or regular expression for verifying the password validation
//         const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/;
//         return regex.test(password); // Use the test() method to check if the password matches the regex pattern
//     };

//     if (isValidPassword(password)) {
//         next();
//     }
//     else {
//         return res.status(200).json
//             ({
//                 status: false,
//                 code: 200,
//                 message: "Failed! Not a valid password. Password must be 8 to 16 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
//             });
//     }
// }; 
