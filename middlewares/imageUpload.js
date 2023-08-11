

module.exports.singleImageUpload = async (req, res, next) => 
{
    const imageFile = await req.body.image // Assigning the user entered email to email variable
    // //console.log(req.body)
    const isImageUploaded = (imageFile) => 
    {
        
    };
    //checking
    if (isImageUploaded(imageFile)) // Here the checking of the email value is done
    {
        next();  // If correct then next()
    } 
    else 
    {
        res.status(401).json
        ({
            message: "Invalid Image"   // Or error message
        });
    }
};
