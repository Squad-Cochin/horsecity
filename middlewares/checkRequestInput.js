

exports.checkInputEnteredOrNot = (req, res, next) => 
{
    
    const checkName = (name) =>
    {
        if (!name) 
        {
            console.log('Name is not entered');
        }
    };

    const files = (attachment) =>
    {
        if (!attachment) 
        {
            console.log('File is not attache');
        }
    }


  
    
};