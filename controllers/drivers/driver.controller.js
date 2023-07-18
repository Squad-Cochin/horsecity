////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the driver controller file. The logic of the code is mainlly written in the models. The        //
//     common logic are written in the helper folder inside the utils folder. The code which was writen       //
//     over there are for make the code reusability. We will do the operations or fetching in the helper.     //
//     But how the data will be used it will done from here. The calling of the models are done from the      //
//     controller files.                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const constant = require('../../utils/constants');
const driver = require('../../models/drivers/driver.model');

exports.getAll = async (req, res) =>
{
    const drivers = await driver.getall();
    // console.log(drivers);
    if(drivers.length == 0)
    {
        console.log('No driver data present');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
            {
                totalCount : drivers.length,
                drivers : drivers
            }
        });
    }
    else
    {
        console.log('Driver data fetched successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : 
            {
                totalCount : drivers.length,
                drivers : drivers
            }
        });
    }    
}

exports.getOne= async (req, res) =>
{
    const drivers = await driver.getone();
    // console.log(drivers);
    if(drivers.length === 0)
    {
        console.log('No driver data present');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOne,
            data : 
            {
                totalCount : drivers.length,
                drivers : drivers
            }
        });
    }
    else
    {
        console.log('Drivers data fetched successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getOne,
            data : 
            {
                totalCount : drivers.length,
                drivers : drivers
            }
        });
    }
}

exports.addDriver = async (req, res) =>
{
    
}