const constants = require("../../utils/constants");
const checkInput = require(`./checkRequestBodyInput`);
const url = require(`../../utils/url_helper`);

exports.checkVehicleBodyEntered = async (req, res, next) =>
{
    try
    {
        await checkInput.checkValueEntered(req.body.make, 'Manufacturer')(req, res, next);
        await checkInput.checkValueEntered(req.body.model, 'Model')(req, res, next);
        await checkInput.checkValueEntered(req.body.color, 'Color')(req, res, next);
        await checkInput.checkValueEntered(req.body.insurance_policy_provider, 'Insurance policy provider name')(req, res, next); 
        await this.checkNumericalValues(req.body.length, 'Vehicle length')(req, res, next);
        await this.checkNumericalValues(req.body.breadth, 'Vehicle breadth')(req, res, next);
        await this.checkNumericalValues(req.body.height, 'Vehicle height')(req, res, next);
        await this.checkNumericalValues(req.body.no_of_horse, 'Vehicle maximum horse carrying capicity')(req, res, next);
        await checkInput.checkValueEntered(req.body.insurance_date, 'Vehicle insurance date')(req, res, next);
        await checkInput.checkValueEntered(req.body.vehicle_exipration_date, 'Vehicle insurance expiration date')(req, res, next);
        await checkInput.checkValueEntered(req.body.vehicle_registration_date, 'Vehicle registration date')(req, res, next);
        await checkInput.checkValueEntered(req.body.vehicle_exipration_date, 'Vehicle expiration date')(req, res, next);
        next();
    }
    catch (error)
    {
        console.log(`Error from the 'checkVehicleBodyEntered' function. It is in validator folder. Which is inside the middlewares. While checking the vehicle body.`, error); 
    }
};
 
exports.checkNumericalValues = (value, feildName) => (req, res, next) =>
{
    return new Promise((resolve, reject) =>
    {
        const numericLength = parseFloat(value);
        if (!value)
        {
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: `${feildName} is required`,
            });
        }
        else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: `${feildName} must be a numeric value`,
            });
        }
        else if (value <= 0)
        {
            return res.status(200).send
            ({
                code: 400,
                status: "failure",
                message: `${feildName} must be greater than zero.`,
            });
        } 
        else
        {
            resolve();
        }
    });
};

exports.isMaximumHorseCarryingCapicityEntered = (req,res,next) =>
{
    const numericLength = parseFloat(req.body.no_of_horse);
    if(!req.body.no_of_horse)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle1
        });        
    }
    else if (typeof numericLength !== "number" || isNaN(numericLength) || !isFinite(numericLength)) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle2,
        });
    }
    else if (req.body.no_of_horse <= 0)
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle3
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
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle4
        });        
    }
    else if(req.body.air_conditioner === 'YES')
    {
        next();
    }
    else if(req.body.air_conditioner === 'NO')
    {
        next();
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle5
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
            message: constants.responseMessage.vehicle6
        });        
    }
    else if(req.body.temperature_manageable === 'YES')
    {
        next();
    }
    else if(req.body.temperature_manageable === 'NO')
    {
        next();
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle7
        });        
    }
}

exports.isGCCTravelValueEntered = (req, res, next) =>
{
    if(!req.body.gcc_travel_allowed)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle8
        });        
    }
    else if(req.body.gcc_travel_allowed === 'YES')
    {
        next();
    }
    else if(req.body.gcc_travel_allowed === 'NO')
    {
        next();
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle9
        });        
    }
}

exports.isInsuranceCoverValueEntered = (req, res, next) =>
{
    if(!req.body.insurance_cover)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle10
        });        
    }
    else if(req.body.insurance_cover === 'YES')
    {
        next();
    }
    else if(req.body.insurance_cover === 'NO')
    {
        next();
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle11
        });        
    }
}

exports.isVehicleRegistrationNumberEntered = async (req, res, next) =>
{
    if(!req.body.vehicle_registration_number)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle12
        });        
    }
    else
    {
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `registration_no`, req.body.vehicle_registration_number, req.params.id, 'Vehicle registration number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.UPDATE_VEHICLE_PAGE_URL}${req.params.id}`)
        {
            checkInput.validateCommonInputAtUpdateTime(constants.tableName.vehicles, `registration_no`, req.body.vehicle_registration_number, req.params.id, 'Vehicle registration number')(req, res, next);
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

exports.isInsurancePolicyNumberEntered = async (req, res, next) =>
{
    if(!req.body.insurance_policy_no)
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle13
        });        
    }
    else
    {
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `insurance_policy_no`, req.body.insurance_policy_no, req.params.id, 'Vehicle insurance policy number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.UPDATE_VEHICLE_PAGE_URL}${req.params.id}`)
        {
            checkInput.validateCommonInputAtUpdateTime(constants.tableName.vehicles, `insurance_policy_no`, req.body.insurance_policy_no, req.params.id, 'Vehicle insurance policy number')(req, res, next);
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

exports.isValidVehicleTypeEntered = (req, res, next) =>
{
    if (!req.body.vehicle_type) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle14
        });
    }
    else if(req.body.vehicle_type === 'PRIVATE')
    {
        next();
    }
    else if(req.body.vehicle_type === 'GCC')
    {
        next();
    }
    else if(req.body.vehicle_type === 'SHARING')
    {
        next();
    }
    else
    {
        return res.status(200).send
        ({
            code: 400,
            status: "failure",
            message: constants.responseMessage.vehicle15,
        }); 
    }
}

exports.isValidVehicleNumberEntered =  async (req, res, next) =>
{
    let vehicleNumber = await req.body.vehicle_number
    if (!req.body.vehicle_number) 
    {
        return res.status(200).send
        ({
            code: 400,
            status: false,
            message: constants.responseMessage.vehicle16
        });
    }
    else
    {   
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `vehicle_number`, req.body.vehicle_number, req.params.id, 'Vehicle number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.UPDATE_VEHICLE_PAGE_URL}${req.params.id}`)
        {
            checkInput.validateCommonInputAtUpdateTime(constants.tableName.vehicles, `vehicle_number`, req.body.vehicle_number, req.params.id, 'Vehicle number')(req, res, next);
        }
        else
        {
            return res.status(200).json
            ({
                code : 500,
                status : false, 
                message : constants.responseMessage.universalError
            });
        }
    }
}

exports.isSafetyCertificateAdded = (req, res, next) =>
{
    if(!req.files?.safety_certicate && req.url === url.ADD_VEHICLE_PAGE_URL && req.method === 'POST')
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : constants.responseMessage.validatorError39
        });
    } 
    else
    {
        if(req.method === 'PUT' && req.url === `${url.UPDATE_VEHICLE_PAGE_URL}${req.params?.id}` && !req.files?.licence_img)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === `${url.UPDATE_VEHICLE_PAGE_URL}${req.params?.id}` && req.files?.licence_img)
        {
            next();
        }
        if(req.method === 'POST')
        {
            next();
        }
    }
}

exports.isVehicleImageUploaded = (req, res, next) =>
{
    if(!req.files?.image)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : constants.responseMessage.validatorError40
        });
    } 
    else
    {
        next();
    }
}

exports.isVehicleImageTitleAdded = (req, res, next) =>
{
    if(!req.body.title)
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : constants.responseMessage.validatorError41
        });
    } 
    else
    {
        next();
    }
}