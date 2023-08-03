const quotationData = {
    quotations : [
    {   
        id : 	'Q001',
        enquiry_id : 1,
        cName : "Saurabh Pande",
        cEmail : "sp832154@gmail.com",
        cUser_name : "Saura1997",
        cPhone : "1234567891",
        cId_proof_no : "865121584650",
        enquiry_date :"2023-07-06 10:16:26",
        enquiry_updated_date : "2023-07-06 10:16:26",
        Service_provider: "Hariprasad",
        Vehicle_number: "MH01 GH 1457",
        sMake : "Volvo Truck",
        trate: 5,
        drate: 5,
        trip_type: "sharing",
        pickup_location: "Buj Khalifa",
        pickup_country: "Dubai",
        pickup_date: "2023-07-25 10:16:26",
        drop_location: "Museaum of future",
        drop_country: "Dubai",
        drop_time : '12:10',
        drop_date: "2023-07-30 10:16:26",
        no_of_horse: 3,
        special_requirement: ["Washing", "Bathing"],
        additional_service: "Medicine",
        transportation_insurance_coverage: "YES",
        tax_amount: "120",
        discount_amount: "140",
        final_amount: "1468",
        status: "ACTIVE",
        created_at: "2023-07-06 10:16:26",
        updated_at: "2023-07-06 10:16:26"
    },


    {
        id : 'Q002',
        enquiry_id : 4,
        cName : "Shubham Singh",
        cEmail : "ss@gmail.com",
        cUser_name : "Shubham1997",
        cPhone : "09876543212",
        cId_proof_no : "231456765432",
        enquiry_date :"2023-05-06 12:19:31",
        enquiry_updated_date : "2023-07-06 15:14:21",
        Service_provider: "Nithil",
        Vehicle_number: "MH01 GH 1992",
        sMake : "Eicher Truck",
        trate: 18,
        drate: 18,
        trip_type: "sharing",
        pickup_location: "Neo City",
        pickup_country: "Saudi Arabia",
        pickup_date: "2023-08-19 03:11:45",
        drop_location: "Jeddha Airport",
        drop_country: "Saudi Arabia",
        drop_date: "2023-09-05 22:34:22",
        drop_time : '11:10',
        no_of_horse: 10,
        special_requirement: ["Washing", "Bathing"],
        additional_service: "Air Conditioner",
        transportation_insurance_coverage: "YES",
        tax_amount: "126",
        discount_amount: "987",
        final_amount: "10000",
        status: "INACTIVE",
        created_at: "2023-06-02 09:11:37",
        updated_at: "2023-07-04 22:09:42"
    }
  ],
  enquires : [
    {
        id: "E001",
        customer : "Saurabh Pande",
        service_provider : "Hariprasad",
        driver : "John",
        driver_cost : 100,
        vehicle_number : "MH01 GH 1475",
        vehicle_cost : 1000,
        pickup_location : "Buj Khalifa",
        pickup_date: "2023-08-19 03:11:45",
        drop_location : "Museam of feature",
        drop_date: "2023-09-05 22:34:22",
        trip_type: "PRIVATE",
        no_of_horse : 3
    },
    {
        id: "E002",
        customer : "Rahul",
        service_provider : "Nithil",
        driver : "shaha",
        driver_cost : 200,
        vehicle_number : "MH01 GH 1400",
        Vehicle_cost : 1400,
        pickup_location : "Buj Khalifa",
        pickup_date: "2023-08-19 03:11:45",
        drop_location : "Museam of feature",
        drop_date: "2023-09-05 22:34:22",
        trip_type: "SHARING",
        no_of_horse : 3
    }
  ]
};
  
  export { quotationData  };

//   const quotationData = [
//     {   
//         id : 1,
//         cName : "Saurabh Pande",
//         cEmail : "sp832154@gmail.com",
//         cUser_name : "Saura1997",
//         cPhone : "1234567891",
//         cId_proof : "865121584650",
//         enquiry_date :"2023-07-06 10:16:26",
//         enquiry_updated_date : "2023-07-06 10:16:26",
//         Service_provider: "Hariprasad",
//         Vehicle_number: "MH01 GH 1457",
//         sMake : "Volvo Truck",
//         trate: 5,
//         drate: 5,
//         trip_type: "PRIVATE",
//         pickup_location: "Buj Khalifa",
//         pickup_country: "Dubai",
//         pickup_date: "2023-07-25 10:16:26",
//         drop_location: "Museaum of future",
//         drop_country: "Dubai",
//         drop_date: "2023-07-30 10:16:26",
//         no_of_horse: 3,
//         special_requirement: ["Washing", "Bathing"],
//         additional_service: "Medicine",
//         transportation_insurance_coverage: "YES",
//         tax_amount: "120",
//         discount_amount: "140",
//         final_amount: "1468",
//         status: "ACTIVE",
//         created_at: "2023-07-06 10:16:26",
//         updated_at: "2023-07-06 10:16:26"
//     },


//     {
//         id : 2,
//         cName : "Shubham Singh",
//         cEmail : "ss@gmail.com",
//         cUser_name : "Shubham1997",
//         cPhone : "09876543212",
//         cId_proof : "231456765432",
//         enquiry_date :"2023-05-06 12:19:31",
//         enquiry_updated_date : "2023-07-06 15:14:21",
//         Service_provider: "Nithil",
//         Vehicle_number: "MH01 GH 1992",
//         sMake : "Eicher Truck",
//         trate: 18,
//         drate: 18,
//         trip_type: "PUBLIC",
//         pickup_location: "Neo City",
//         pickup_country: "Saudi Arabia",
//         pickup_date: "2023-08-19 03:11:45",
//         drop_location: "Jeddha Airport",
//         drop_country: "Saudi Arabia",
//         drop_date: "2023-09-05 22:34:22",
//         no_of_horse: 10,
//         special_requirement: ["Washing", "Bathing"],
//         additional_service: "Air Conditioner",
//         transportation_insurance_coverage: "YES",
//         tax_amount: "126",
//         discount_amount: "987",
//         final_amount: "10000",
//         status: "ACTIVE",
//         created_at: "2023-06-02 09:11:37",
//         updated_at: "2023-07-04 22:09:42"
//     }
//   ];
  