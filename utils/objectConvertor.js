////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//  This is the object convertor file. From here we can customize the response as per front-end requirement   //                                           //
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
      name: item.name,
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
        name: item.name,
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

exports.getOneInvoiceResponse = (data, data2) =>
{
  const invoiceResponse = 
  {
    invoice: [],
    vehicles: [],
    payment: [],
  };

  if (data.length !== 0) 
  {
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
  }
  return invoiceResponse;
};

/**
 * The below function is created for customize the received output according to the frontend.
 *  the output consist of 
 *     Total bookings
 *     Pending bookings
 *     Total paid payment
 *     Total remaining payment
 *     Recent five Enquiries
 */
exports.convertNextJSCustomerDashboardResponse = (value1, value2, rAmount, pAmount) =>
{
  return {
    count:
    {
        total_booking: value1[0].total_invoices,
        total_pending_booking: value1[0].total_invoices_not_started,
        total_paid_amount: pAmount,
        total_pending_amount: rAmount
    },
    enquiries: value2.map(item => ({
        id : item.id,
        service_provider_name: item.service_provider_name,
        vehicle_number : item.vehicle_number,
        pickup_location: item.pickup_location,
        drop_location: item.drop_location,
        enquiry_status: item.status,
        horse : item.no_of_horse
    }))
};
}

// The function will be used for changing response according to the front end object
exports.convertNEXTJSRecentEnquiriesCustomizeResponse = async (value) =>
{
    return {
        enquiries : value.map(item => (
        {
            enquiry_id : item.id,
            service_provider_name : item.service_provider_name,
            vehicle_number : item.vehicle_number,
            manufacturer : item.make,
            model : item.model,
            pickup_location : item.pickup_location,
            drop_location: item.drop_location,
            trip_type: item.trip_type,
            no_of_horse: item.no_of_horse,
            pickup_date: time.formatDateToDDMMYYYY(item.pickup_date),
            status: item.status,
            created_at: time.formatDateToDDMMYYYY(item.created_at)
        }))
    }
};


/**
 * The monthly sales report need a customize set of response. For making it according to front end object.
 * This function will be used for customizing the function output.
 */

exports.customizeMonthlySalesReportForReactFrontEnd = (salesData) =>
{
    var monthlySalesData =
    {
        series: [
            {
                name: "Revenue",
                type: "column",
                data: salesData.map(item => parseFloat(item?.total_final_amount)),
            },
        ],      
        options:
        {
            chart:
            {
                stacked: false,
                toolbar: 
                {
                    show: false,
                },
            },
          stroke: {
            width: [0, 0.5, 1],
            curve: "smooth",
            dashArray: [0, 8, 5],
          },
          plotOptions: {
            bar: {
              columnWidth: "18%",
            },
          },
          colors: ["#0ab39c", "rgba(212, 218, 221, 0.18)", "rgb(251, 77, 83)"],      
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          markers:
          {
            size: 0,
          },
          legend:
          {
            offsetY: 11,
          },
          xaxis:
          {
            title:
            {
              text: "Months",
            },
            type: "category", // Changed type to "category" for month labels
            categories: salesData.map(item => item.month_name), // Use month names as categories
          },
      
          yaxis:
          {
            title:
            {
              text: "Revenue",
            },
          },
      
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " Total Invoice";
                }
                return y;
              },
            },
          },
      
          grid: {
            borderColor: "#f1f1f1",
          },
        },
    };    
    return monthlySalesData ;
}

/**
 * The quotation status report need a customize set of response. For making it according to front end object.
 * This function will be used for customizing the function output.
 */

exports.customizeQuotationStatusReportForReactFrontEnd = (data) =>
{
    var OrderStatusData = [
        {
            id: 1,
            title: "Confirmed",
            icon: "ri-checkbox-circle-line",
            color: "success",
            width: data[0].total_confirmed,
        },
        {
            id: 2,
            title: "Not Confirmed",
            icon: "ri-close-circle-line",
            color: "warning",
            width: data[0].total_not_confirmed,
        },
        {
            id: 3,
            title: "Total Quotations",
            icon: "ri-add-circle-line",
            color: "primary",
            width: data[0].total_quotations,
        },
    ]
    return OrderStatusData;
}