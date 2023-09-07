////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//     This is the object convertor file. From here we can customer the response as per front-end.            //                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const time = require(`./helper/date`);


exports.pastWorkHistroyResponse = (data) =>
{
  const dataResult = []; // Make sure to declare dataResult with "const" to avoid conflicts
  data.forEach(item =>
  {
    // Rename the parameter inside the forEach loop to "item"
    dataResult.push({
      // Push a new object to the dataResult array, not to the data array
      id: item.id,
      username: item.user_name,
      created_at: time.formatDateToDDMMYYYY(item.created_at),
    });
  });
  return dataResult
};

exports.notWorkedPlace = (data) => {
    const dataResult = []; // Make sure to declare dataResult with "const" to avoid conflicts
    data.forEach(item => { // Rename the parameter inside the forEach loop to "item"
      dataResult.push
      ({ // Push a new object to the dataResult array, not to the data array
        id: item.id,
        username: item.user_name,
      });
    });
    return dataResult;
};

exports.invoiceResponse = (data) =>
{
  const dataResult = [];
  data.forEach(item =>
  {
    dataResult.push
    ({
        id : item.id, // Id from the invoice table. Primary key
        iId: item.iId, // Invoice id - We will generate from the backend
        iDate : item.created_at, // Invoice created date - It will also generated from the backedn
        customer_name: item.customerName, 
        companName : item.service_provider_name,
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
    });
  });
  return dataResult;
};

// SELECT i.invoice_no, q.quotation_id, c.name, c.email FROM customers c, quotations q, invoices i WHERE c.id = q.customer_id
exports.getAllInvoice = (data) =>
{
  const dataResult = [];
  data.forEach(item =>
  {
    dataResult.push
    ({
      id : item.id,
      iId : item.invoice_no,
      quotation_id : item.quotation_prefix_id,
      customer_name : item.name,
      customer_email : item.email,
      status : item.status
    });
  });
  return dataResult;
};



exports.getOneInvoiceResponse = (data, data2) => {
  const invoiceResponse = {
    invoice: [],
    vehicles: [],
    payment: [],
  };

  if (data.length !== 0) {
    invoiceResponse.invoice.push({
      "id": data[0].id,
      "iId": data[0].iId,
      "iDate": data[0].iDate,
      "pickup_time": data[0].Ptime,
      "drop_time": data[0].Dtime,
      "customer_name": data[0].customer_name,
      "companyName": data[0].companyName,
      "customerAddress": data[0].customerAddress,
      "companyAddress": data[0].companyAddress,
      "cusCountry": data[0].cusCountry,
      "comCountry": data[0].comCountry,
      "customer_email": data[0].customer_email,
      "com_email": data[0].com_email,
      "iSubTotal": data[0].iSubTotal,
      "iTaxRate": data[0].iTaxRate,
      "iTaxAmount": data[0].iTaxAmount,
      "iDiscountRate": data[0].iDiscountRate,
      "iDiscountAmount": data[0].iDiscountAmount,
      "iFinalAmount": data[0].iFinalAmount,
      "service_provider_name": data[0].service_provider_name,
      "quotation_id": data[0].quotation_id,
      "pickup_date": data[0].pickup_date,
      "drop_date": data[0].drop_date,
      "special_requirement": data[0].special_requirement,
      "no_of_horse": data[0].no_of_horse,
    });
  }
  for (let row of data) 
  {
    invoiceResponse.payment.push
    ({
      "id": row.id,
      "paymentRecord_Id" : row.paymentId,
      "total_amount": row.iFinalAmount,
      "received_amount": row.received_amount,
      "received_date": row.received_date,
      "remaining_amount": row.remaining_amount
      });
  }
    for (let row of data2)
    {
      invoiceResponse.vehicles.push
      ({
          "id": row.id,
          "vehicle_number" : row.vehicle_no,
          "driver_name" : row.dName,
          "pickup_location": row.pickup_point,
          "drop_location": row.drop_point,
      });
    }

  return invoiceResponse;
};


