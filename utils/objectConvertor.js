////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//  This is the object convertor file. From here we can customize the response as per front-end requirement   //                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const time = require(`./helper/date`);
const constants = require(`./constants`);

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
            color: true,
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

exports.customizeResponseObjectForVehicleDetailInCustomerSide = (result, data, data2) =>
{
  var vehicleResponse =
  {
    "vehicle": [],
    "images" : [],
    "reviews":
    {
      "total_vehicle_reviews": '',
      "total_company_reviews": '',
      "total_text_reviews": '',
      "overall_company_rating": '',
      "overall_vehicle_rating": '',
      "reviews_list" : [],
      "star_rating":
      {
        "rating_one": '',
        "rating_two": '',
        "rating_three": '',
        "rating_four": '',
        "rating_five": ''
      }
    }
  };
  
  if(result.length != 0)
  {
    const uniqueImagesIds = new Set();
    for (let row of result)
    {
      if (vehicleResponse.vehicle.length === 0)
      {
        // If result has data, populate the vehicleResponse data
        vehicleResponse.vehicle.push
        ({
            "id" : result[0].id,
            "service_provider_id" : result[0].service_provider_id,
            "service_provider_name" : result[0].service_provider_name,
            "vehicle_number" : result[0].vehicle_number,
            "price" : result[0].price,
            "no_of_horses" : result[0].no_of_horse,
            "length" : result[0].length,
            "breadth" : result[0].breadth,
            "height" : result[0].height,
            "make" : result[0].make,
            "model" : result[0].model,
            "air_condition" : result[0].air_conditioner,
            "temperature_manageable" : result[0].temperature_manageable,
            "gcc_travel_allowed" : result[0].gcc_travel_allowed,
            "insurance_cover" : result[0].insurance_cover,
            "insurance_provider" : result[0].insurance_provider,
            "vehicle_type" : result[0].vehicle_type,
            "abbreviation" : result[0].abbreviation,
            "vehicle_registration_date" : time.formatDateToDDMMYYYY(result[0].vehicle_registration_date),
            "vehicle_expiration_date" : time.formatDateToDDMMYYYY(result[0].vehicle_exipration_date),
            "insurance_date" : time.formatDateToDDMMYYYY(result[0].insurance_date),
            "insurance_expiration_date" : time.formatDateToDDMMYYYY(result[0].insurance_expiration_date)
        });
      }
      
      if(row?.vehicle_image_id !== null && !uniqueImagesIds.has(row?.vehicle_image_id))
      {
        vehicleResponse.images.push
        ({
          "id": row.vehicle_image_id,
          "url" : `${process.env.PORT_SP}${constants?.attachmentLocation?.vehicle?.view?.image}${row?.image}`
        });
        uniqueImagesIds.add(row.vehicle_image_id);
      }     
       
      if (Array.isArray(data2) && data2.length > 0)
      {
        vehicleResponse.reviews.reviews_list = data2.map(item => 
        ({
          "id": item.review_id,
          "customer_name": item.customer_name,
          "review": item.review,
          "created_at": time.formatDateToDDMMYYYY(item.created_at)
        }));
      }
      else
      {
        // Handle the case when data2 is undefined or empty
        vehicleResponse.reviews.reviews_list = [];
      }
      
      vehicleResponse.reviews.total_vehicle_reviews = data.particular_vehicle_review_count !== 0 ? data.particular_vehicle_review_count : '--',
      vehicleResponse.reviews.total_company_reviews = data.particular_service_provider_count !== 0 ? data.particular_service_provider_count  : '--',
      vehicleResponse.reviews.overall_company_rating = data.total_service_provider_rating !== 0 ? data.total_service_provider_rating : '--',
      vehicleResponse.reviews.overall_vehicle_rating = data.total_vehicle_rating !== 0 ? data.total_vehicle_rating : '--',
      vehicleResponse.reviews.total_text_reviews = data.particular_text_review_count !== 0 ? data.particular_text_review_count : '--'     
      
      vehicleResponse.reviews.star_rating = 
      {
        "rating_one": data.one_star_percentage ? `${data.one_star_percentage}%` : '--',
        "rating_two": data.two_star_percentage ? `${data.two_star_percentage}%` : '--',
        "rating_three": data.three_star_percentage ? `${data.three_star_percentage}%` : '--',
        "rating_four": data.four_star_percentage ? `${data.four_star_percentage}%` : '--',
        "rating_five": data.five_star_percentage ? `${data.five_star_percentage}%` : '--'        
      }      
    }
  }
  return vehicleResponse;
}

exports.customizeResponseObjectOfVehicleAllReviewsForCustomerSide = (result) => {
  var vehicleResponse = 
  {
      "reviews": []
  };

  if (result.length !== 0) 
  {
    const uniqueReviewIds = new Set();
    for (let row of result) 
    {
      if (row.review_id !== null && !uniqueReviewIds.has(row.review_id))
      {
        vehicleResponse.reviews.push
        ({
          "id": row.review_id,
          "customer_name": row.customer_name,
          "review": row.review,
          "created_at": time.formatDateToDDMMYYYY(row.created_at)
        });
        uniqueReviewIds.add(row.review_id);
      }
    }
  }

  return vehicleResponse;
};

exports.customerSideDetialsPage = (data) =>
{
  let responseObj = 
  {
      name : data[0].name,
      userName : data[0].user_name, 
      email : data[0].email,               
      contact_no : data[0].contact_no, 
      birthday : time.formatDateToMMDDYYYY(data[0].date_of_birth),                
      id_proof_no : data[0].id_proof_no === 'undefined' ? '' : data[0].id_proof_no, 
      id_proof_image : `${process.env.PORT_SP}${constants.attachmentLocation.customer.view.idProof}${data[0].id_proof_image}`
  }
  return responseObj;
}

exports.vehicleGetOneResponseObject = (data, name) =>
{
  return {
    "id": data[0].id,
    "service_provider_id": data[0].service_provider_id,
    "service_provider" : name,
    "vehicle_number": data[0].vehicle_number,
    "make": data[0].make,
    "model": data[0].model,
    "color": data[0].color,
    "length": data[0].length,
    "breadth": data[0].breadth,
    "height": data[0].height,
    "price" : data[0].price,
    "no_of_horse": data[0].no_of_horse,
    "air_conditioner": data[0].air_conditioner,
    "temperature_manageable": data[0].temperature_manageable,
    "registration_no": data[0].registration_no,
    "gcc_travel_allowed": data[0].gcc_travel_allowed,
    "insurance_cover": data[0].insurance_cover,
    "insurance_policy_no": data[0].insurance_policy_no,
    "insurance_provider": data[0].insurance_provider,
    "safety_certicate": `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.scertificate}${data[0].safety_certicate}`,
    "vehicle_type": data[0].vehicle_type,
    "status": data[0].status,
    "insurance_expiration_date": time.formatDateToDDMMYYYY(data[0].insurance_expiration_date),
    "insurance_date": time.formatDateToDDMMYYYY(data[0].insurance_date),
    "vehicle_registration_date": time.formatDateToDDMMYYYY(data[0].vehicle_registration_date),
    "vehicle_exipration_date": time.formatDateToDDMMYYYY(data[0].vehicle_exipration_date),
    "created_at": time.formatDateToDDMMYYYY(data[0].created_at),
    "updated_at": time.formatDateToDDMMYYYY(data[0].updated_at),
    "deleted_at": time.formatDateToDDMMYYYY(data[0].deleted_at)
  }
}

exports.customizeGetOneCMSResponseObject = (data) =>
{
  return [{
    "id": data[0].id,
    "url": data[0].url,
    "menu":  data[0].menu,
    "title":  data[0].title,
    "caption":  data[0].caption,
    "description":  data[0].description,
    "image": `${process.env.PORT_SP}${constants.attachmentLocation.cms.about_us.view}${data[0].image}`,
  }]
}
