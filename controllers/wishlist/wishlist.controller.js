const wishlistModel = require('../../models/wishlist/wishlist.model')
const constants = require('../../utils/constants');
const commonoperation = require('../../utils/helper/commonoperation');



/**For adding & remove wishlist  */
exports.isWishlistAdd = async(req,res)=>
{
    let wishlist = await wishlistModel.isWishlistAdd(req.body);

   if(wishlist){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Succesfully updated",
    });
   }
}



/**Particular customer wishlist items  */
exports.wishlistItems = async(req,res)=>
{
    let wishlistItems = await wishlistModel.wishlistItems(req.body);

   if(wishlistItems){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: "Succesfully feched",
        data : wishlistItems
    });
   }
}