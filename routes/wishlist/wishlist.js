const wishlist = require(`../../controllers/wishlist/wishlist.controller`);   // importing the auth controller details and assigning it to the authcontroller variable
const verifyBody = require(`../../middlewares/requestValidator`); // Importing the requestValidator file data 


module.exports = function(app)
{

    /**For geting all service provider  */
    app.post(`/wishlist/add-remove`,verifyBody.verifyToken,wishlist.isWishlistAdd); 

    
    /**For geting all service provider  */
    app.post(`/wishlist/list_items`,verifyBody.verifyToken,wishlist.wishlistItems); 

}