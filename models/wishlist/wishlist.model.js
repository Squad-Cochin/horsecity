/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
//   This is wishlist model file. Where all the logic of the wishlist part is written.     //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const constants = require('../../utils/constants'); // Constant elements are stored in this file
const time = require('../../utils/helper/date'); // All the time relateed formating are written in this file.
const con = require('../../configs/db.configs'); // Calling the db file for making the database connection


module.exports = class wishlist
{
    /**
    * The below model function is for the CUSTOMER side FRONTEND page. 
    * The function is adding or updating wishlist of a particular customer id on the basis of customer id.
    */
    static async isWishlistAdd(body)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                const
                { 
                    customer_id,
                    vehicle_id,
                    flag
                } = body ;
                
                // console.log("sdhfksd",JSON.parse(flag));
                if(JSON.parse(flag))
                {
                    let insQuery = `INSERT INTO ${constants.tableName.wishlist}(customer_id , vehicle_id,created_at)
                    VALUES ('${customer_id}', '${vehicle_id}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`
                    con.query(insQuery,(err,result)=>
                    {
                        if(!err)
                        { 
                                resolve(true) 
                        }
                    });
                }
                else
                {
                    let updateQuery = `UPDATE ${constants.tableName.wishlist} SET  
                    deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                    WHERE customer_id  = '${customer_id}' AND vehicle_id = '${vehicle_id}'
                    `;
                    con.query(updateQuery,(err,result)=>
                    { 
                        if(!err)
                        { 
                                resolve(true)
                        }
                    });            
                }         
            }
            catch(err)
            {
                console.log('Error in wishlist', err); 
            }
        });   
    };

    /**
    * The below model function is for the CUSTOMER side FRONTEND page.
    * The function is FOR FETCHING all items of wishlist of a particular customer id on the basis of customer id.
    */
    static async wishlistItems(body)
    {
        return new Promise(async(resolve, reject) =>
        {
            try
            {
                const
                { 
                    page,
                    limit,
                    customer_id
                } = body ;

                const offset = (page - 1) * limit;
                let selQuery = `
                    SELECT vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse, vh.height,w.created_at,w.deleted_at,
                    CASE
                        WHEN COUNT(vimg.image) > 0 THEN GROUP_CONCAT(vimg.image)
                        ELSE NULL
                    END AS images
                    FROM wishlist w 
                    JOIN vehicles AS vh ON w.vehicle_id = vh.id
                    LEFT JOIN vehicles_images vimg ON w.vehicle_id = vimg.vehicle_id   AND vimg.status = "${constants.status.active}"
                    WHERE w.customer_id = '${customer_id}' AND w.deleted_at IS NULL
                    GROUP BY vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse, vh.height
                    LIMIT ${+limit} OFFSET ${+offset};;        
                `;

                con.query(selQuery,(err,result)=>
                {
                    // console.log(err,result);
                    if(!err)
                    {
                        for(let i = 0;i < result.length;i++)
                        {
                            if(result[i].images)
                            {
                                const imagesArray = result[i].images.split(',');
                                for(let j =0 ; j < imagesArray.length;j++)
                                {
                                    imagesArray[j] =  `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${imagesArray[j]}`;
                                    result[i].images =   imagesArray
                                }
                            }
                            else
                            {
                                result[i].images = [];
                            }
                            if(result[i].created_at && result[i].deleted_at || (!result[i].created_at && !result[i].deleted_at))
                            {
                                result[i].wishlist = false;
                            }
                            else if(result[i].created_at)
                            {
                                result[i].wishlist = true;
                            }
                        } 
                        const totalCountQuery = `SELECT count(*) FROM wishlist w WHERE w.customer_id = '${customer_id}' AND w.deleted_at IS NULL`
                        con.query(totalCountQuery,(err,count)=>
                        {   
                            // console.log(count);
                            if(!err)
                            {
                                const COUNT = count[0]['count(*)'];
                                resolve({
                                    totalCount: COUNT,
                                    wishlist :result 
                                })  
                            }
                        });
                    }
                });
            }
            catch(err)
            {
                console.log('Error while feching wishlist items for particular customer', err); 
            }
        });
    }

}