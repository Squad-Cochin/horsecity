/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is created to store the consgtant data which will be used in the       //
//    overall program. So instead of writing again and again we can use it from here   //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////


module.exports = 
{  
    status  :
    {
        active : "ACTIVE",
        inactive : "INACTIVE",
    },
    password :
    { 
        expiry_after : 90, // Days after which the token will expire
    }
  
}