////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the vehicle controller file. The logic of the code is mainlly written in the models. The       //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constants = require('../../utils/constants'); // Constant elements are stored in this file
const vehicleImage = require('../../models/vehicles/vehicleImages.model');  // The model from where the logic is intantiate are written in vehicleImage model

/**
 * The below function is for add the new image to a  vehicle in the database. We need number of inputs from the end user to add or upload the vehicle vehicle. 
 */
exports.addImages = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for adding or uploading the new image for the vehicle.
    const vehicleImages = await vehicleImage.addimages
    (
        req.params.id, // Already registered vehicle id
        req.files.image, // We need to upload the image.
        req.body.title // title of the image
    );
    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(vehicleImages === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError,
        });
    }
    else if(vehicleImages === 'INVALIDATTACHMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.vehiclesImageInvalid
        });
    }
    else if(vehicleImages === 'NOATTACHEMENT')
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.vehiclescertificateimagenotpresent
        });
    }
    // If input feild are in correct format and not present in the database, then this else block of code will be executed.
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.insert,
        });
    }
};

/**
 * The below function is fetching all the images of a  vehicle
 */
exports.allImages = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for getting or fetching all the images of a  vehicle.
    const vehicleImages = await vehicleImage.allimages(req.params.id, req.body.page, req.body.limit)

    // If any unwanted, unencounter, or unconventionaal error came then this if block of code will be executed.
    if(vehicleImages === 'err')
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.getAllErr,
        });
    }
    // Every things went well but vehicle has no image data available of the vehicle id which is submitted in the params then this else if block of code will executed.    
    else if(vehicleImages.length == 0)
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getNoData,
        });
    }
    // Every things went well and vehicle image data is available of the vehicle id which is submitted in the params then this else block of code will executed.
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.getAll,
            data : vehicleImages
        });
    }
};

/**
 * The below function is for updating the status of the  images of the vehicle. We need to give the vehicle image id in the params.
 */
exports.updateStatus = async (req, res, next) =>
{
    // The below line is for going to the model function to implement the code for updating the status of the existing image of a  vehcile. We need to give the vehicle image id in the params.
    const vehicleImages = await vehicleImage.updatestatus(req.params.id);
    // If status not updated then this if block of code.
    if(vehicleImages.length === 0)
    {
        return res.status(200).send
        ({
            code : 500,
            status : false,
            message : constants.responseMessage.universalError
        });
    }
    // If status is updated then this else block of code will be executed
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.statusChanged
        });
    }
};

/**
 * The below function is for removing the  vehcile image from the view page. The data will be in the database but it will never shown on the front-end
 */
exports.removeImage = async (req, res, next) =>
{
    // We need to add the vehicleImage id in the params
    // The below line is for going to the model function to implement the code for removing vehicleImage logic.
    const vehicleImages = await vehicleImage.removeimage(req.params.id);
    // The id present in the params, But incorrect id then this if block of code will be executed
    if(vehicleImages.length === 0)
    {
        return res.status(200).send
        ({
            code : 400,
            status : false,
            message : constants.responseMessage.removeerror
        });
    }
    // If vehicleImage remove is done successfully
    else
    {
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constants.responseMessage.removesuccess
        });
    }
};



