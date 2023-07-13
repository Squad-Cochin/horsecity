const Invoices = 
[
    {
        id : 1,
        iId: "I100001",
        iDate : "2023/05/23",
        customer_name: "Sherif",
        companName : "Horse Tansportation",
        customerAddress :
        {
            Plot_No : "78",
            Road_Number : "National Highway",
            Area : "Cochin"
        },
        companyAddress :
        {
            Plot_No : "25",
            Road_Number : "NH7",
            Area : "Koratty"
        },
        cusCountry : "India",
        comCountry : "India",
        customer_email : "Sherif@gmail.com",
        com_email : "abc@horsecity.com",
        iSubTotal : "1452",
        iTaxRate : "5",
        iTaxAmount: "147",
        iDiscountRate : "6",
        iDiscountAmount: "152",
        iFinalAmount: "1300",
        service_provider_name:"Sasha",
        quotation_id: "Q001",
        link : 'https://invoma.vercel.app/general_1.html'        
    },
    
    {
        id : 2,
        iId: "I100002",
        iDate : "2023/01/23",
        customer_name: "Toushif",
        companName : "Horse Tansportation",
        customerAddress : {
            Plot_No : "89",
            Road_Number : "NH110",
            Area : "Thrissur"
        },
        companyAddress : {
            Plot_No : "14",
            Road_Number : "NH148",
            Area : "Malapuram"
        },
        cusCountry : "India",
        comCountry : "India",
        customer_email : "Toushif@gmail.com",
        com_email : "abc@horsecity.com",
        iSubTotal : "1578",
        iTaxRate : "12",
        iTaxAmount: "170",
        iDiscountRate : "10",
        iDiscountAmount: "178",
        iFinalAmount: "1300",
        service_provider_name:"Sasha",
        quotation_id: "Q002",
        link : 'https://invoma.vercel.app/general_1.html'        
    }
];
export { Invoices } ;