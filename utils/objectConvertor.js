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
      iId : item.invoice_no,
      quotation_id : item.quotation_id,
      customer_name : item.name,
      customer_email : item.email,
    });
  });
  return dataResult;
};


/**
 * Invoice page feild
 *    Invoice Number --> Fetched from the invoice table
 *    Quotation Id --> Quotation id from the quotation table
 *    Customer Name --> Name from the customer (Quotation table have customer Name) q.customer_id = c.id
 *    Customer Email --> Email from the customer (Quotation table have customer Customr) q.customer_id = c.id
 */

/**
 *  Invoice Page (View one invoice)
 *  Invoice No  - invoice number form the invoice table (Generated from the backend part)
 *  Date - Invoice date (Generated from the backend)
 *  Invoice To:
 *                customer name --> From the customer table
 *                customer address --> Pickup Point (Invoice table have this)
 *                customer country --> Pickup country (From the booking table)
 *                customer email --> from the customer tablle
 * 
 * Pay To :
 *                company name or service provider name
 *                company address - From the service provider table
 *                company country - Pick up country
 *                company email - from the service provider
 *                
 * 
 * 
 */





/**
 * 
 *    Table feild
 * 
 *  id - primary key
 *  invoice_no - we will also generate from backend
 *  booking_id - We will have this from the booking table
 *  pickup_point - 
 *  drop_point - 
 *  per_unit_price - 
 *  total_distance -
 *  tax_amount -
 *  discount_amount - 
 *  final_amount - 
 *  status
 *  created_at -
 *  updated_at -
 *  deleted_at - 
 * 
 */