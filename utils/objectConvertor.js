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



exports.GetOne = () =>
{
  const dataResult =
  {
    "invoice": [],
    "vehicles" : [],
    "payment": []
  }
  
}