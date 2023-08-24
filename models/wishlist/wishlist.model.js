const constants = require('../../utils/constants');
const commonfetching = require('../../utils/helper/commonfetching');
const commonoperation = require('../../utils/helper/commonoperation');
const time = require('../../utils/helper/date');
const con = require('../../configs/db.configs');
const { json } = require('express');


module.exports = class wishlist
{

    static async isWishlistAdd(body)
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {       
            const { customer_id, vehicle_id, flag} = body ;
               
            console.log("sdhfksd",JSON.parse(flag));
            if(JSON.parse(flag)){
                let insQuery = `INSERT INTO ${constants.tableName.wishlist}(customer_id , vehicle_id,created_at)
                VALUES ('${customer_id}', '${vehicle_id}','${time.getFormattedUTCTime(constants.timeOffSet.UAE)}')`
                con.query(insQuery,(err,result)=>{ 

                    if(!err){ 
                            resolve(true) 
                    }
                    })
            }else{
                let updateQuery = `UPDATE ${constants.tableName.wishlist} SET  
                deleted_at = '${time.getFormattedUTCTime(constants.timeOffSet.UAE)}'
                WHERE customer_id  = '${customer_id}' AND vehicle_id = '${vehicle_id}'
                `;
                con.query(updateQuery,(err,result)=>{ 
                    if(!err){ 
                            resolve(true)
                    }
                    })
            
            }
         
        }catch(err){
            console.log('Error in wishlist', err); 
        }


    })    
   
}


static async wishlistItems(cuId)
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {       


            let selQuery = `
            SELECT vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse, vh.height,
            CASE
                WHEN COUNT(vimg.image) > 0 THEN GROUP_CONCAT(vimg.image)
                ELSE NULL
            END AS images
        FROM wishlist w 
        JOIN vehicles AS vh ON w.vehicle_id = vh.id
        LEFT JOIN vehicles_images vimg ON w.vehicle_id = vimg.vehicle_id   AND vimg.status = "${constants.status.active}"
        WHERE w.customer_id = '${cuId}' AND w.deleted_at IS NULL
        GROUP BY vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse, vh.height;
        
        `;

                   con.query(selQuery,(err,result)=>{ 
                    console.log(err,result);
                    if(!err){   
                        for(let i = 0;i < result.length ;  i++){
           
                            if(result[i].images){
                               const imagesArray = result[i].images.split(','); 
                      
                               for(let j =0 ; j < imagesArray.length;j++){
                                       imagesArray[j] =  `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${imagesArray[j]}`;
                                       result[i].images =   imagesArray
                               }
                            }else{
                               result[i].images = [];
                            } 
        
                       } 
        
                            resolve({wishlist :result })
                    }
                    })        

        }catch(err){
            console.log('Error while feching wishlist items for particular customer', err); 
        }


    })    
   
}

}