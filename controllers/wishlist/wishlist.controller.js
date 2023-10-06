////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the wishlist controller file. But how the data will be used it will done from here.            //
//     The calling of the models are done from the controller files.                                          //                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const wishlistModel = require('../../models/wishlist/wishlist.model');
const constants = require('../../utils/constants');
/**For adding & remove wishlist  */
exports.isWishlistAdd = async(req,res)=>
{
    let wishlist = await wishlistModel.isWishlistAdd(req.body);

   if(wishlist){
    return res.status(200).send
    ({
        code: 200,
        success: true,
        message: constants.responseMessage.edit,
    });
   }else{
        return res.status(200).send
        ({
            code: 500,
            success: false,
            message: constants.responseMessage.universalError,
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
            message:constants.responseMessage.getAll,
            data : wishlistItems
        });
   }else{
        return res.status(200).send
        ({
            code: 500,
            success: false,
            message:constants.responseMessage.universalError,
        });
   }
}