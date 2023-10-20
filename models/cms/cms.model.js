/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//   This is model file. Where all the logic of the program is written.                //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

const time = require('../../utils/helper/date');
const constants = require('../../utils/constants');
const defaults = require(`../../utils/default`);
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');

module.exports = class authentication
{
    constructor(){} 

    static async addCMSdetail(url, body, image, id) 
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                let result = await commonfetching.getRoleDetails(id);
                if(result === `err` || result.length == 0)
                {
                    resolve('err');
                }
                else if(result[0].role_id === constants.Roles.admin)
                {
                    let uploadAttachment = await commonoperation.fileUploadTwo(image, constants.attachmentLocation.cms.about_us.upload)
                    uploadAttachment === 'INVALIDFORMAT' && resolve('INVALIDFORMAT');
                    uploadAttachment === 'ERR' && resolve('err');
                    if(uploadAttachment)
                    {
                        const {menu_name, title, caption, description} = body;
                        let query = `INSERT INTO cms(url, menu, title, caption, description, image, created_at) VALUES('${url}', '${menu_name}', '${title}', '${caption}', '${description}', '${uploadAttachment}', '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`;
                        // console.log(query);
                        let result = await commonoperation.queryAsync(query);
                        result.affectedRows > 0 ? resolve(result) : resolve('err');
                    }                    
                }
                else
                {
                    resolve('unauthorised');
                }
            }
            catch(error)
            {
                console.log('Error from the `addCMSdetail` function. In the cms.model.js file. Error: ', error.message);
            }
        });   
    };

    static async getoneCMSdetail(url)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                const data = await commonfetching.dataOnCondition(defaults.tableName.cms, `/${url}`, 'url');   
                resolve(data);
            }
            catch (error)
            {
                console.log('Error from the `getoneCMSdetail` function. In the cms.model.js file. Error: ', error.message);            
            }
        });
    };

    static async editCMSdetail(body, image, id)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                let result = await commonfetching.getRoleDetails(id);
                // if(result === `err` || result.length == 0)
                // {
                //     resolve('err');
                // }
                // else if(result[0].role_id === constants.Roles.admin)
                // {
                    const {menu_name, title, caption, description} = body;
                    if(image === null)
                    {
                        let upQuery = ` UPDATE ${defaults.tableName.cms} c
                                        SET c.title = '${title}',
                                        c.menu = '${menu_name}',
                                        c.caption = '${caption}',
                                        c.description = '${description}',
                                        c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                        WHERE c.id = '${id}'                              `
                        let result = await commonoperation.queryAsync(upQuery)
                        result.affectedRows > 0 ? resolve(result) : resolve('err')
                    }
                    else
                    {
                        let uploadAttachment = await commonoperation.fileUploadTwo(image, constants.attachmentLocation.cms.about_us.upload)
                        uploadAttachment === 'INVALIDFORMAT' && resolve('INVALIDFORMAT');
                        uploadAttachment === 'ERR' && resolve('err');
                        if(uploadAttachment)
                        {
                            let upQuery = ` UPDATE ${defaults.tableName.cms} c 
                                        SET c.title = '${title}',
                                        c.menu = '${menu_name}',
                                        c.caption = '${caption}',
                                        c.description = '${description}',
                                        c.image = '${uploadAttachment}',
                                        c.updated_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}' 
                                        WHERE c.id = '${id}'`;
                            let result = await commonoperation.queryAsync(upQuery);
                            result.affectedRows > 0 ? resolve(result) : resolve('err');
                        }
                    }
                // }
                // else
                // {
                //     resolve('unauthorised');
                // }
            }
            catch (error)
            {
                console.log('Error from the `editCMSdetail` function. In the cms.model.js file. Error: ', error.message);            
            }
        });
    };

    static async updatestatus(id)
    {
        try
        {
            const data = await commonoperation.updateUserStatus(defaults.tableName.cms, id);
            return data.length === 0 ? [] : data;           
        }
        catch (error)
        {
            console.log('Error from the `updatestatus` function. In the cms.model.js file. Error: ', error.message);            
        }
    };

    static async removecms(Id)
    {
        try
        {
            const data = await commonoperation.removeUser(defaults.tableName.cms, Id);
            return data.length === 0 ? [] : data;           
        }
        catch (error)
        {
            console.log('Error from the `removecms` function. In the cms.model.js file. Error: ', error.message);            
        }
    };


}