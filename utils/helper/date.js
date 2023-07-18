/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is designed to add the amount of days to the current date.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////


// The below arrow function is used for adding data in expired date column. The expired date column have the 2 days plus date of ticekt created date
const addingSpecifiedDaysToCurrentDate = (plus) =>
{
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + plus * 24 * 60 * 60 * 1000); // Add the specified number of days in milliseconds
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const hours = String(futureDate.getHours()).padStart(2, '0');
    const minutes = String(futureDate.getMinutes()).padStart(2, '0');
    const seconds = String(futureDate.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
};  

const timeexportfunction = 
{
    addingSpecifiedDaysToCurrentDate
}

module.exports= timeexportfunction;