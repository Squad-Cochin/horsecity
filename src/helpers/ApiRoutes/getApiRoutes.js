/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
//                                      Get api routes                                             //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Import Files
import axios from "axios";
import * as url from "../url_helper";
import config from "../../config";
// import { serviceProviders} from "../../CommonData/Data";

/** get roughts */
/**Get Serviceprovider list Data */
export async function getSPAllData(pageNumber, userId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_SP_ALL_DATA_URL}/${userId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        serviceProvider: [],
      },
    };
    return errorObj.data;
  }
}
/**Get Particular ServiceProvider */
export async function getSPSingleData(spId) {
  try {
    const { data } = await axios.get(`${url.GET_SP_SINGLE_DATA_URL}/${spId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
/**Get Serviceprovider Vehicle Data */
export async function getSPVehiclesData(spId) {
  try {
    const { data } = await axios.get(
      `${url.GET_SP_VEHICLES_DATA_URL}/${spId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for giving service provider names */
export async function getSPUserName() {
  try {
    const { data } = await axios.get(`${url.GET_SP_USER_NAME}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return {
      serviceProviders: [],
    };
  }
}
/**Below route for giving customer list page data  */
export async function getCustomersData(pageNumber, uId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_CUSTOMER_ALL_DATA_URL}/${uId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        customers: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving particular customer data  */
export async function getSingleCustomerData(cId) {
  try {
    const { data } = await axios.get(
      `${url.GET_CUSTOMER_SINGLE_DATA_URL}/${cId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for giving vehicle list page data  */
export async function getVehiclesData(pageNumber, vId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_VEHICLES_ALL_DATA_URL}/${vId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data.vehicles;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving single vehicle  data  */
export async function getSingleVechileData(vId) {
  try {
    const { data } = await axios.get(
      `${url.GET_VEHICLES_SINGLE_DATA_URL}/${vId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for giving taxation list page data  */
export async function getTaxationsData(pageNumber) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.POST_TAXATION_ALL_DATA_URL}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving  settings page data  */
export async function getSettingsPageData() {
  try {
    // let pageLimit = config.pageLimit;

    const { data } = await axios.get(`${url.POST_SETTINGS_ALL_DATA_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving single taxation  data  */
export async function getSingleTaxationData(tId) {
  try {
    const { data } = await axios.get(
      `${url.GET_TAXATION_SINGLE_DATA_URL}/${tId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for giving  discount list page data  */
export async function getDiscountsPageData(pageNumber) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_DISCOUNTS_ALL_DATA_URL}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving single discount  data  */
export async function getSingleDiscountData(dscId) {
  try {
    const { data } = await axios.get(
      `${url.GET_DISCOUNTS_SINGLE_DATA_URL}/${dscId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for giving  language names  */
export async function getLanguagesNames() {
  try {
    const { data } = await axios.get(`${url.GET_LANGUAGES_ALL_DATA_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting currencies  */
export async function getCurrenciesNames() {
  try {
    const { data } = await axios.get(`${url.GET_CURRENCIES_ALL_DATA_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting taxation names  */
export async function getTaxationsNames() {
  try {
    const { data } = await axios.get(`${url.GET_TAXATION_ALL_DATA_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting invoice list page data  */
export async function getInvoicesData(pageNumber, uId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.POST_INVOICE_ALL_DATA_URL}/${uId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        serviceProvider: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting dashboard data  */
export async function getDashboardData(iId) {
  try {
    const { data } = await axios.get(`${url.GET_DASHBOARD_DATA}/${iId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message:
        "Server error when we are trying to make connection with the backend at the time dashboard",
      data: {
        totalCount: 0,
        data: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting latest enquiry data for showing dashboard */
export async function getLatestEnquiryData(uId) {
  try {
    let { data } = await axios.get(
      `${url.GET_LATEST_ENQUIRIRES_FOR_DASHBOARD}/${uId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message:
        "Server error when we are trying to make connection with the backend at the time dashboard",
      data: {
        totalCount: 0,
        data: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting monthly sales for showing dashboard */
export async function getMonthlySalesData(uId) {
  try {
    const { data } = await axios.get(`${url.GET_MONTHLY_SALES_DATA}/${uId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message:
        "Server error when we are trying to make connection with the backend at the time dashboard",
      data: {
        totalCount: 0,
        data: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting quotation details  for showing dashboard */
export async function getQuotationReportForDashboard(uId) {
  try {
    const { data } = await axios.get(`${url.GET_QUOTATION_REPORT}/${uId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message:
        "Server error when we are trying to make connection with the backend at the time dashboard",
      data: {
        totalCount: 0,
        data: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting driver list  for showing drivers page */
export async function getDriversData(pageNumber, uId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_DRIVERS_ALL_DATA_URL}/${uId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        serviceProvider: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting quotation data */
export async function getQuotationData(pageNumber, userId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_QUOTATION_ALL_DATA_URL}/${userId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        serviceProvider: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting confirm quotation */
export async function getConfirmQut(id) {
  try {
    const { data } = await axios.get(
      `${url.GET_QUOTATION_SINGLE_DATA_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting single driver data */
export async function getSingleDriverData(dId) {
  try {
    const { data } = await axios.get(
      `${url.GET_DRIVERS_SINGLE_DATA_URL}/${dId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting single quotation data */
export async function getSingleQuotationData(id) {
  try {
    const { data } = await axios.get(
      `${url.GET_QUOTATION_FULL_DATA_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting template quotation data for showing send email */
export async function getTemplateQuotationData(id) {
  try {
    const { data } = await axios.get(`${url.GET_QUOTATION_TEMPLATE_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting single invoice data  */
export async function getSingleInvoiceData(iId) {
  try {
    const { data } = await axios.get(
      `${url.GET_INVOICE_SINGLE_DATA_URL}/${iId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting particular serviceprovider drivers  */
export async function getSPDriverData(dId) {
  try {
    const { data } = await axios.get(`${url.GET_SP_DRIVER_DATA_URL}/${dId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for active discount  */
export async function getDiscounts() {
  try {
    const { data } = await axios.get(`${url.GET_DISCOUNTS}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting serviceprovider assigned drivers */
export async function getAssignedProviders(aId) {
  try {
    const { data } = await axios.get(`${url.GET_ASSIGNED_DRIVERS}/${aId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting single invoice payment history */
export async function getSingleInvoicePaymentHistroy(pId) {
  try {
    const { data } = await axios.get(
      `${url.GET_INVOICE_SINGLE_INVOICE_PAYMENT_HISTROY}/${pId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting language page data */
export async function getLanguagesPageData(pageNumber) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.POST_LANGUAGES_ALL_DATA_URL}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting single language data */
export async function getSingleLanguageData(tId) {
  try {
    const { data } = await axios.get(
      `${url.GET_LANGUAGES_SINGLE_DATA_URL}/${tId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting vehicle image data  */
export async function getVehicleImageData(pageNumber, id) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_VEHICLES_IMAGES_DATA_URL}/${id}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}
/**Below route for getting enquiries data */
export async function getEnquiriesData(pageNumber, userId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_ENQUIRY_ALL_DATA_URL}/${userId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting single enquiry data */
export async function getSingleEnquiryData(dId) {
  try {
    const { data } = await axios.get(
      `${url.GET_ENQUIRY_SINGLE_DATA_URL}/${dId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getLatestPayementHistroy(iId) {
  try {
    const { data } = await axios.get(
      `${url.GET_LATEST_PAYMENT_HISTROY_OF_INVOICE}/${iId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getSendEmailButtonData(iId) {
  try {
    const { data } = await axios.get(
      `${url.GET_SEND_EMAIL_BUTTON_DATA_OF_INVOICE}/${iId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function startTrip(iId) {
  try {
    const data = await axios.get(`${url.GET_START_TRIP}/${iId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errObj = {
      code: error.response ? error.response.status : 500,
      error: error.message || "Failed!",
    };
    return errObj;
  }
}
/**Below route for cancel trip */
export async function cancelTrip(iId) {
  try {
    const data = await axios.put(`${url.PUT_CANCEL_INVOICE}/${iId}`, null, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    let errObj = {
      code: error.response ? error.response.status : 500,
      error: error.message || "Failed!",
    };
    return errObj;
  }
}
/**Below route for getting trip details */
export async function getTripDeatails(pageNumber, userId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.GET_TRIP_ALL_DATA_URL}/${userId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting break down vehicles */
export async function getLIstBreakDownVehicles(bkId) {
  try {
    const { data } = await axios.get(
      `${url.GET_VEHICLE_BREAKDOWN_ALL_DATA_URL}/${bkId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting Accounts page data */
export async function getAccountsData(pageNumber, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const { data } = await axios.post(
      `${url.POST_ACCOUNTS_ALL_DATA_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "serviceProvider": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting single  account data */
export async function getSingleAccountsData(id) {
  try {
    const { data } = await axios.get(
      `${url.GET_ACCOUNTS_SINGLE_DATA_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // return null
  }
}
/**Below route for getting serviceprovider report */
export async function getSeviceProviderReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_SERVICE_PROVIDER_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        serviceProviders: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for getting customer report */
export async function getCustomerReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_CUSTOMER_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting driver report */
export async function getDriverReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_DRIVERS_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting vehicle report */
export async function getVehicleReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_VEHICLES_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting enquiry report */
export async function getEnquiryReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_ENQUIRIES_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting quotation report */
export async function getQuotationReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_QUOTATIONS_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting trip details  report */
export async function getTripDetailsReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_TRIP_DETAILS_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting Accounts report */
export async function getAccountsReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_ACCOUNTS_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting invoice report */
export async function getInvoiceReport(pageNumber, val, spId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = val;
    reqObj.page = pageNumber;
    reqObj.limit = pageLimit;
    const { data } = await axios.post(
      `${url.POST_INVOICE_REPORT_URL}/${spId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    // let errorObj =  {
    //     "code": 500,
    //     "status": false,
    //     "message": "Server error",
    //     "data": {
    //         "totalCount": 0,
    //         "vehicles": []
    //     }
    // }
    // return errorObj.data
  }
}
/**Below route for getting  active role list report */
export async function getRoleList() {
  try {
    const response = await axios.get(`${url.GET_SP_ROLELIST}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return response;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
    };
    return errorObj.data;
  }
}
/**Below route  for verify reset password */
export async function verifyResetPasswordUrl(userId, token, reqObj) {
  try {
    const response = await axios.post(
      `${url.VERIFY_TOKEN_URL}/${userId}/${token}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
    };
    return errorObj.data;
  }
}
/**Below route for getting review data */
export async function getReviewsData(pageNumber, userId) {
  try {
    let pageLimit = config.pageLimit;
    let reqObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    const data = await axios.post(
      `${url.GET_REVIEWS_DATA_URL}/${userId}`,
      reqObj,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        reviews: [],
      },
    };
    return errorObj.data;
  }
}
/**Below route for giving  aboutUs page data  */
export async function getAboutUsPageData(URL) {
  try {
    // let pageLimit = config.pageLimit;

    const data  = await axios.get(`${url.GET_CMS_ABOUT_US_DATA_URL}/${URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });

    return data;
  } catch (error) {
    let errorObj = {
      code: 500,
      status: false,
      message: "Server error",
      data: {
        totalCount: 0,
        vehicles: [],
      },
    };
    return errorObj.data;
  }
}