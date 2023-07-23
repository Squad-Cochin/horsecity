const constants = require("../../utils/constants");
const commonfetching = require(`../../utils/helper/commonfetching`);
const checkInput = require(`./checkRequestBodyInput`);

exports.isServiceProviderIdEntered = (tableName) =>async (req, res, next) =>
{
    if (!req.body.service_provider_id) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Service provider id is required"
        });
    }
    else
    {
        const data = await commonfetching.dataOnCondition(tableName, req.body.service_provider_id, 'id')
        if(data === 'err' || !data)
        {
            return res.status(500).json
            ({
                code : 200,
                status : "failed",
                error: 'Internal server error while service provider' 
            });
        }
        else if(data.length > 0)
        {
            // console.log('service provider id Present');
            next()          
        }
        else
        {
            console.log(`Id doesn't exist`);
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "This service provider id doesn't exists in the database"
            });
        }
    }
}

exports.isManufacturerEntered = (req, res, next) =>
{
    if(!req.body.make)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Manufacturer or Maker name required"
        });        
    }
    else
    {
        next();
    }
}
exports.isModelEntered = (req,res,next) =>
{
    if(!req.body.model)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle model required"
        });        
    }
    else
    {
        next();
    }
    
}
exports.isColorEntered = (req,res,next) =>
{
    if(!req.body.color)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle color required"
        });        
    }
    else
    { 
        next();
    }
    
}
exports.isLengthEntered = (req, res, next) => 
{
    const length = req.body.length;
    const numericLength = parseFloat(length);
    if (!length)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle length required",
        });
    }
    else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle length must be a numeric value",
        });
    }
    else if (length <= 0)
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle length must be greater than zero.",
        });
    } 
    else
    {
        next();
    }
};

exports.isBreadthEntered = (req, res, next) => 
{
    const breadth = req.body.breadth;
    const numericLength = parseFloat(breadth);
    if (!breadth)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle breadth required",
        });
    }
    else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle length must be a numeric value",
        });
    }
    else if (breadth <= 0)
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle breadth must be greater than zero.",
        });
    } 
    else
    {
        next();
    }
};

exports.isheightEntered = (req, res, next) => 
{
    const height = req.body.height;
    const numericLength = parseFloat(height);
    if (!height)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle height required",
        });
    }
    else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle length must be a numeric value",
        });
    }
    else if (height <= 0)
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle height must be greater than zero.",
        });
    } 
    else
    {
        next();
    }
};
  
exports.isMaximumHorseCarryingCapicityEntered = (req,res,next) =>
{
    const numericLength = parseFloat(req.body.no_of_horse);
    if(!req.body.no_of_horse)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle maximum horse carrying capicity required"
        });        
    }
    else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle maximum horse carrying capicity must be a numeric value",
        });
    }
    else if (req.body.no_of_horse <= 0)
    {
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle maximum horse carrying capicity must be greater than zero.",
        });
    }
    else
    {
        next();
    }    
}

exports.isAirConditionerValueEntered = (req, res, next) =>
{
    if(!req.body.air_conditioner)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle is enabled air conditioner. Details required"
        });        
    }
    else if(req.body.air_conditioner === 'YES')
    {
        // console.log('AC present');
        next();
    }
    else if(req.body.air_conditioner === 'NO')
    {
        console.log('AC Not Present');
        next();
    }
    else
    {
        console.log('Invalid Input');
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle is air conditioner equiped input is wrong. Please write 'YES' or 'NO'. ",
        });        
    }
}

exports.isTemperaturControlValueEntered = (req, res, next) =>
{
    if(!req.body.temperature_manageable)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: "Vehicle is enabled with temperature control. Details required"
        });        
    }
    else if(req.body.temperature_manageable === 'YES')
    {
        // console.log('Temperature control present');
        next();
    }
    else if(req.body.temperature_manageable === 'NO')
    {
        console.log('Temperature control Not Present');
        next();
    }
    else
    {
        console.log('Invalid Input');
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle is temperature control equiped input is wrong. Please write 'YES' or 'NO'. ",
        });        
    }
}

///

exports.isGCCTravelValueEntered = (req, res, next) =>
{
    if(!req.body.gcc_travel_allowed)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle can travel across all the countries of GCC. Details required"
        });        
    }
    else if(req.body.gcc_travel_allowed === 'YES')
    {
        // console.log('GCC travel present');
        next();
    }
    else if(req.body.gcc_travel_allowed === 'NO')
    {
        console.log('GCC travel Not Present');
        next();
    }
    else
    {
        console.log('Invalid Input');
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle can travel across all the countries of GCC input is wrong. Please write 'YES' or 'NO'. ",
        });        
    }
}

exports.isInsuranceCoverValueEntered = (req, res, next) =>
{
    if(!req.body.insurance_cover)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle have a insurance cover value not entered. Details required"
        });        
    }
    else if(req.body.insurance_cover === 'YES')
    {
        // console.log('Insurance present');
        next();
    }
    else if(req.body.insurance_cover === 'NO')
    {
        console.log('Insurance Not Present');
        next();
    }
    else
    {
        console.log('Invalid Input');
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle has a insurance cover input is not given correctly. Please write 'YES' or 'NO'. ",
        });        
    }
}

exports.isRegistrationNumberEntered = async (req, res, next) =>
{
    if(!req.body.vehicle_registration_number)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle registration number is not entered. Details required"
        });        
    }
    else
    {
        // console.log('Vehicle registration number is entered');
        const data = await commonfetching.dataOnCondition(constants.tableName.vehicles, req.body.vehicle_registration_number, 'registration_no')
        console.log('Data while cheking vehicle registration number: ', data);
        if(!data || data === 'err')
        {
            console.log(`Vehicle registration number doesn't exist`);
            next();                        
        }
        else if(data.length > 0)
        {
            console.log('Vehicle registration number already present');
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "This vehicle registration number already exists in the database"
            });
        }
        else
        { 
            next();     
            // return res.status(200).json
            // ({
            //     code : 500,
            //     status : "failed",
            //     error: 'Internal server error' 
            // });    
        }     
    }
}


exports.isInsuranceNumberEntered = async (req, res, next) =>
{
    if(!req.body.insurance_policy_no)
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle Insurance cover number is not entered. Details required"
        });        
    }
    else
    {
        // console.log('Vehicle Insurance cover is entered');
        const data = await commonfetching.dataOnCondition(constants.tableName.vehicles, req.body.insurance_policy_no, 'insurance_policy_no')
        console.log('Data while cheking vehicle insurance cover number: ', data);
        if(!data || data === 'err')
        {
            console.log(`Vehicle registration number doesn't exist`);
            next();            
        }
        else if(data.length > 0)
        {
            console.log('Vehicle Insurance cover number already present');
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: "This vehicle Insurance cover number already exists in the database"
            });
        }
        else
        {
            next();
            // return res.status(500).json
            // ({
            //     code : 200,
            //     status : "failed",
            //     error: 'Internal server error while insurance number' 
            // });           
        }     
    }
}

const isValidDateEntered = (DOB) =>  
{
    // This is regex or regular expression for verify the Date or birth validation
    return DOB.match(/^\d{2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/); // REGEX or regurlar expression
}

exports.isValidInsuranceCoverDateEntered = (req, res, next) =>
{
    if (!req.body.insurance_date) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Insurance Taken Date is required. Format - DD/Month starting three Letters/YYYY"
        });
    }
    else
    {
        console.log(isValidDateEntered(req.body.insurance_date));
        if(!isValidDateEntered(req.body.insurance_date))
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Insurance date is not in valid. The correct format is DD/Month starting three Letters/YYYY"
            });                                
        }
        else
        {
            next();
        }
    }
}

exports.insurancePolicyProviderEntered = (req, res, next) =>
{
    if (!req.body.insurance_policy_provider) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Insurance provider name is required."
        });
    }
    else
    {
        // console.log('Insurance provider name is entered');
        next();
    }
}

exports.isValidInsuranceExpirationDateEntered = (req, res, next) =>
{
    if (!req.body.insurance_expiration_date) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Insurance expiry date is required. Format - DD/Month starting three Letters/YYYY"
        });
    }
    else
    {
        console.log(isValidDateEntered(req.body.insurance_expiration_date));
        if(!isValidDateEntered(req.body.insurance_expiration_date))
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Insurance expiry date is not in valid. The correct format is DD/Month starting three Letters/YYYY"
            });                                
        }
        else
        {
            next();
        }
    }
}

exports.isValidVehicleRegistrationDateEntered = (req, res, next) =>
{
    if (!req.body.vehicle_registration_date) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle registration date is required. Format - DD/Month starting three Letters/YYYY"
        });
    }
    else
    {
        console.log(isValidDateEntered(req.body.vehicle_registration_date));
        if(!isValidDateEntered(req.body.vehicle_registration_date))
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Vehicle registration date is not in valid. The correct format is DD/Month starting three Letters/YYYY"
            });                                
        }
        else
        {
            next();
        }
    }
}

exports.isValidVehicleExpirationDateEntered = (req, res, next) =>
{
    if (!req.body.vehicle_exipration_date) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle expiration date is required. Format - DD/Month starting three Letters/YYYY"
        });
    }
    else
    {
        console.log(isValidDateEntered(req.body.vehicle_exipration_date));
        if(!isValidDateEntered(req.body.vehicle_exipration_date))
        {
            return res.status(200).send
            ({
                code: 200,
                status: "failure",
                message: "Vehicle expiry date is not in valid. The correct format is DD/Month starting three Letters/YYYY"
            });                                
        }
        else
        {
            next();
        }
    }
    
}

exports.isValidVehicleTypeEntered = (req, res, next) =>
{
    if (!req.body.vehicle_type) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle type is required. Please enter one amoung these 3 (PRIVATE, GCC, SHARING)"
        });
    }
    else if(req.body.vehicle_type === 'PRIVATE')
    {
        // console.log('Vehicle Type PRIVATE');
        next();
    }
    else if(req.body.vehicle_type === 'GCC')
    {
        // console.log('Vehicle Type GCC');
        next();
    }
    else if(req.body.vehicle_type === 'SHARING')
    {
        // console.log('Vehicle Type SHARING');
        next();
    }
    else
    {
        console.log('Invalid Vehicle Type Input');
        return res.status(200).send
        ({
            code: 200,
            status: "failure",
            message: "Vehicle type input is wrong. Please enter one amoung these 3 (PRIVATE, GCC, SHARING)",
        }); 
    }
}

 

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

exports.isValidVehicleNumberEntered = (tableName) => async (req, res, next) =>
{
    if (!req.body.vehicle_number) 
    {
        return res.status(200).send
        ({
            code: 200,
            status: false,
            message: "Vehicle number is required"
        });
    }
    else
    {        
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `vehicle_number`, req.body.vehicle_number, req.params.id, 'Vehicle number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === url.UPDATE_DRIVER_PAGE_URL + req.params.id)
        {
            checkInput.validateCommonInputAtUpdateTime(constants.tableName.vehicles, `vehicle_number`, req.body.vehicle_number, req.params.id, 'Vehicle number')(req, res, next);
        }
        else
        {
            return res.status(500).json
            ({
                code : 500,
                status : false, 
                message : `Internal server error. While checking the vehicle number.` 
            });
        }

        // const data = await commonfetching.dataOnCondition(tableName, req.body.vehicle_number, 'vehicle_number')
        // console.log('Data while cheking vehicle number plate:', data);
        // if(data === 'err' || !data)
        // {
        //     return res.status(500).json
        //     ({
        //         code : 200,
        //         status : "failed",
        //         error: 'Internal server error while number plate' 
        //     });
        // }
        // else if(data.length > 0)
        // {
        //     console.log('Vehicle number already Present');
        //     return res.status(200).send
        //     ({
        //         code: 400,
        //         status: false,
        //         message: "This vehicle number already exists in the database"
        //     });
        // }
        // else
        // {
        //     console.log(`Vehicle number doesn't exist`);
        //     next();           
        // }
    }
}