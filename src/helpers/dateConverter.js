////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Date format convert functionality done over here.                    //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////



const convertTodayDate_DD_MM_YYYY = () =>{// Output: "26.10.2023"
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    return formattedDate
}
const convertTodayDate_DD_MM_YYYY_ForDateOfBirth= () =>{// Output: "26.10.2023"
    const today = new Date();
    today.setFullYear(today.getFullYear() - 10); // less than 10 years
    
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    const formattedDate = today.toLocaleDateString(undefined, options);

    return formattedDate
}

const dateConverter =
{
    convertTodayDate_DD_MM_YYYY,
    convertTodayDate_DD_MM_YYYY_ForDateOfBirth
}

module.exports = dateConverter ;