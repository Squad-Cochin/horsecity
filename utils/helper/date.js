/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//    This file is designed to add the payment of days to the current date.             //
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

const getFormattedUTCTime = (utcOffset) =>
{
    const currentDate = new Date();
    const utcTime = Date.UTC
    (
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        currentDate.getUTCHours(),
        currentDate.getUTCMinutes(),
        currentDate.getUTCSeconds(),
        currentDate.getUTCMilliseconds()
    );

    // Parse offset string in format "+hh:mm" or "-hh:mm"
    const offsetParts = utcOffset.split(':');
    const offsetSign = (offsetParts[0][0] === '-') ? -1 : 1;
    const offsetHours = parseInt(offsetParts[0].slice(1), 10);
    const offsetMinutes = parseInt(offsetParts[1], 10);
    const offsetMilliseconds = (offsetHours * 3600000) + (offsetMinutes * 60000);
    const targetTime = utcTime + (offsetSign * offsetMilliseconds);

    const targetDate = new Date(targetTime);
    const year = targetDate.getUTCFullYear();
    const month = (targetDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getUTCDate().toString().padStart(2, '0');
    const hours = targetDate.getUTCHours().toString().padStart(2, '0');
    const minutes = targetDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = targetDate.getUTCSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const changeDateToSQLFormat = (dateString) =>
{
    // Check if the input date string is in the format "DD-MM-YYYY"
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString))
    {
        // Split the dateString into day, month, and year parts
        const [day, month, year] = dateString.split('-');
         // Format the date in YYYY-MM-DD HH:MM:SS
         const formattedDate = `${year}-${month}-${day} 00:00:00`;
         return formattedDate;
    }

    // Convert the input string to a Date object
    const dateObj = new Date(dateString);

    // Extract the individual date components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    // Format the date in YYYY-MM-DD HH:MM:SS
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

const changeCustomerPageDateToSQLFormat = (dateString) =>
{
    // Check if the input date string is in the format "DD-MM-YYYY"
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString))
    {
        // Split the dateString into day, month, and year parts
        const [month, day, year] = dateString.split('-');
        // Format the date in YYYY-MM-DD HH:MM:SS
        const formattedDate = `${year}-${month}-${day} 00:00:00`;
        return formattedDate;
    }

    // Convert the input string to a Date object
    const dateObj = new Date(dateString);

    // Extract the individual date components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    // Format the date in YYYY-MM-DD HH:MM:SS
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

function formatDateToDDMMYYYY(inputDate) 
  {
    if(!inputDate)
    {
        return null
    }
    else
    {
        // Convert the input date string to a Date object
        const dateObj = new Date(inputDate);
    
        // Extract day, month, and year from the Date object
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
    
        // Format the date as "DD-MM-YYYY"
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }    
}

function formatDateToMMDDYYYY(inputDate) 
  {
    if(!inputDate)
    {
        return null
    }
    else
    {
        // Convert the input date string to a Date object
        const dateObj = new Date(inputDate);    
        // Extract day, month, and year from the Date object
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();    
        // Format the date as "MM-DD-YYYY"
        const formattedDate = `${month}-${day}-${year}`;
        return formattedDate;
    }    
}

const timeexportfunction = 
{
    addingSpecifiedDaysToCurrentDate,
    getFormattedUTCTime,
    changeDateToSQLFormat,
    formatDateToDDMMYYYY,
    formatDateToMMDDYYYY,
    changeCustomerPageDateToSQLFormat
}

module.exports = timeexportfunction;