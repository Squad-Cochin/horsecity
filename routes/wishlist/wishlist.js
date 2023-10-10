const wishlist = require(`../../controllers/wishlist/wishlist.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 
const url = require(`../../utils/url_helper`);

module.exports = function(app)
{

    /**For geting all service provider  */
    app.post(`${url.wishlist.POST_ADD_REMOVE_WISHLIST}`,
    verifyBody.verifyToken,
    wishlist.isWishlistAdd); 

    
    /**For geting all service provider  */
    app.post(`${url.wishlist.POST_GET_ALL_WISHLIST_LIMIT}`,
    verifyBody.verifyToken,
    wishlist.wishlistItems); 

}