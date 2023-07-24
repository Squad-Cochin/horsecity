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
const time = require('../../utils/helper/date');

exports.getAll = async (req, res) =>
{
    const drivers = await driver.getall(req.body.page, req.body.limit);
    // console.log(drivers);
    if(drivers.length == 0)
    {
        console.log('No driver data present');
        return res.status(200).send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll,
            data : drivers
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
            data : drivers
        });
    }    
}

exports.getOne= async (req, res) =>
{
    const drivers = await driver.getone(req.params.id);
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

exports.addDriver = async (req, res, next) => {
    
      const drivers = await driver.adddriver(
        req.body.name,
        req.body.email,
        req.body.contact_no,
        req.body.emergency_contact_no,
        time.changeDateToSQLFormat(req.body.date_of_birth),
        req.body.licence_no,
        req.body.description,
        req.files.profile_image,
        req.files.licence_img
      );
    //   console.log(drivers);
      if (drivers === 'err') {
        console.log('Error while inserting the driver data ');
        return res.status(200).json({
          code: 400,
          status: true,
          message: constant.responseMessage.errorInsert,
        });
      }
      else
      {
        console.log('Driver data inserted successfully');
        return res.json({
          code: 200,
          status: true,
          message: ` Driver ${constant.responseMessage.insert}`,
        });
      }
  };
  

exports.updateStatus= async (req, res) =>
{
    const drivers = await driver.updatestatus(req.params.id);
    // console.log(drivers);
    if(drivers.length === 0)
    {
        console.log('No Driver data present and status is not updated');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.getAll
        });
    }
    else
    {
        console.log('Driver Status updated successfully');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.statusChanged
        });
    }
}


exports.removeDriver = async (req, res) =>
{
    const drivers = await driver.removedriver(req.params.id);
    // console.log(drivers);
    if(drivers.length === 0)
    {
        console.log('No driver data present and remove is not done');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removeerror
        });
    }
    else
    {
        console.log('Drivers is removed');
        return res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.removesuccess
        });
    }
}

exports.editDriver = async (req, res, next) =>
{
    const drivers = await driver.editdriver
    (
        req.params.id,
        req.body.name,
        req.body.email,
        req.body.contact_no,
        req.body.emergency_contact_no,
        time.changeDateToSQLFormat(req.body.date_of_birth),
        req.body.licence_no,
        req.body.description,
        req.files.profile_image,
        req.files.licence_img
    );
    if(drivers === 'err')
    {
        console.log('Error while editing the driver data ');
        res.send
        ({
            code : 200,
            status : true,
            message : constant.responseMessage.erroredit,
        });
    }
    else
    {
        console.log('Drivers data edited successfully');
        res.send
        ({
            code : 200,
            status : true,
            message : `Driver ${constant.responseMessage.edit}`,
        });
    }
};

exports.AssignServiceProvider = async (req, res, next) =>
{
    const drivers = await driver.assignserviceprovider(req.body.driver_id, req.body.serviceProvider_id)
    if(drivers=== 'err')
    {
        console.log('Error while assigning service provider to a driver');
    }
    else
    {
        console.log(`Driver is assigned to a service provider`);
        res.status(200).send
        ({
            code : 200,
            success : true,
            message : 'Driver is assigned to a service provider'
        });
    }
};