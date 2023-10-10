//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// This file has the code to check the vehcile body or vehicle related data. All the functions      //
// which will be used for validaing the vehicle incoming data are coded in this file.               //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////


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
        await this.checkRadioButtonYESAndNOINPUT(req.body.air_conditioner, constants.responseMessage.acnotpresent, constants.responseMessage.acInvalidInput, res);
        await this.checkRadioButtonYESAndNOINPUT(req.body.temperature_manageable, constants.responseMessage.tempcontrolnotpresent, constants.responseMessage.tempcontrolInvalidInput, res);
        await this.checkRadioButtonYESAndNOINPUT(req.body.gcc_travel_allowed, constants.responseMessage.vehicleGCCvalueNotPresent, constants.responseMessage.vehicleGCCvalueInvalid, res);
        await this.checkRadioButtonYESAndNOINPUT(req.body.insurance_cover, constants.responseMessage.vehicleinsurancecoverenotpresnet, constants.responseMessage.vehicleinsurancecovereinvalidinput, res);
        await checkInput.checkValueEntered(req.body.insurance_date, 'Vehicle insurance date')(req, res, next);
        await checkInput.checkValueEntered(req.body.insurance_expiry_date, 'Vehicle insurance expiration date')(req, res, next);
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
                status: false,
                message: `${feildName} must be a numeric value`,
            });
        }
        else if (value <= 0)
        {
            return res.status(200).send
            ({
                code: 400,
                status: false,
                message: `${feildName} must be greater than zero.`,
            });
        } 
        else
        {
            resolve();
        }
    });
};


exports.checkRadioButtonYESAndNOINPUT = (value, message, message2, res) =>
{
    try 
    {
        return new Promise((resolve, reject) =>
        {
            if(!value)
            {
                return res.status(200).send
                ({
                    code: 400,
                    status: false,
                    message: message
                });        
            }
            else if(value === 'YES')
            {
                resolve();
            }
            else if(value === 'NO')
            {
                resolve();
            }
            else
            {
                return res.status(200).send
                ({
                    code: 400,
                    status: false,
                    message: message2
                });        
            }
        });
    }
    catch (error)
    {
        console.log(`Error from the 'checkRadioButtonYESAndNOINPUT' function`, error);
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
            message: constants.responseMessage.vehicleRegistrationNoNotPresnet
        });        
    }
    else
    {
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `registration_no`, req.body.vehicle_registration_number, req.params.id, 'Vehicle registration number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.vehicles.PUT_EDIT_VEHICLE}${req.params.id}`)
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
            message: constants.responseMessage.vehicleinsurancenoNotPresent
        });        
    }
    else
    {
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `insurance_policy_no`, req.body.insurance_policy_no, req.params.id, 'Vehicle insurance policy number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.vehicles.PUT_EDIT_VEHICLE}${req.params.id}`)
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
            message: constants.responseMessage.vehicleTypeNotPresent
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
            status: false,
            message: constants.responseMessage.vehicleTypeInvalid,
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
            message: constants.responseMessage.vehicleNoNotPresnet
        });
    }
    else
    {   
        if(req.method === 'POST')
        {
            checkInput.validateCommonInputAtStartingTime(constants.tableName.vehicles, `vehicle_number`, req.body.vehicle_number, req.params.id, 'Vehicle number')(req, res, next);                        
        }
        else if(req.method === `PUT` && req.url === `${url.vehicles.PUT_EDIT_VEHICLE}${req.params.id}`)
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
    if(!req.files?.safety_certicate && req.url === `${url.vehicles.POST_ADD_NEW_VEHICLE}${req.params.id}` && req.method === 'POST')
    {
        return res.status(200).json
        ({
            code : 400,
            success: false,
            message : constants.responseMessage.vehiclescertificateimagenotpresent
        });
    } 
    else
    {
        if(req.method === 'PUT' && req.url === `${url.vehicles.PUT_EDIT_VEHICLE}${req.params?.id}` && !req.files?.licence_img)
        {
            next();
        }
        if(req.method === 'PUT' && req.url === `${url.vehicles.PUT_EDIT_VEHICLE}${req.params?.id}` && req.files?.licence_img)
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
            message : constants.responseMessage.vehicleimagenotpresent
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
            message : constants.responseMessage.vehicleimagetitlenotentered
        });
    } 
    else
    {
        next();
    }
}