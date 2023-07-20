////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the vehicle controller file. The logic of the code is mainlly written in the models. The       //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants');
const vehicleImage = require('../../models/vehicles/vehicleImages.model'); 

exports.addImages = async (req, res, next) =>
{
    const vehicleImages = await vehicleImage.addimages(req.param.id, req.body.image, req.body.title);
    if(vehicleImages === 'err')
    {
        console.log('Error while uploading the particular vehicle image');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.particularVehicleImageError,
        });
    }
    else
    {
        console.log('Particular vehicle image uploaded successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.particularVehicleImageSuccess,
        });
    }

};

exports.allImages = async (req, res, next) =>
{
    const vehicleImages = await vehicleImage.allimages(req.body.pageNumber, req.body.pageSize)
    if(vehicleImages === 'err')
    {
        console.log('Error while fetching the particular vehicle all images');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAllErr,
        });
    }
    else
    {
        console.log('Particular vehicle all the images fetched successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
        });
    }

};

exports.updateStatus = async (req, res, next) =>
{
    const vehicleImages = await vehicleImage.updatestatus() 

};

exports.removeImage = async (req, res, next) =>
{
    const vehicleImages = await vehicleImage.removeimage() 

};



