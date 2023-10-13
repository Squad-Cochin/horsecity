import axios from "axios";
import * as url from "../url_helper";

/**Update previous service provider */
export async function updateSProvider(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.POST_SP_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return response;

    // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}/${id}`, updateData);
    // return { data };
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous taxation */
export async function updateTaxation(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.POST_TAXATION_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous customer */
export async function updateCustomer(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.POST_CUSTOMER_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous vehicle */
export async function updateVehicle(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.POST_VEHICLES_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous driver */
export async function updateDriver(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.POST_DRIVERS_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous report */
export async function updateMonthlyReport(data) {
  try {
    // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
    // return { data };
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous report */
export async function updatTripData(data) {
  try {
    // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
    // return { data };
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update quotaion  */
export async function updatQuotation(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.PUT_QUOTATION_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update settings page */
export async function updateSettings(data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(`${url.PUT_SETTINGS_EDIT_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update service provider status  */
export async function updateSPStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_SP_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**Update customer status */
export async function updateCustomerStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_CUSTOMER_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**Cunfime quotation */
export async function confirmQuotation(body) {
  try {
    const data = await axios.post(`${url.PUT_QUOTATION_CONFIRM_URL}`, body, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**update vehicle status */
export async function updateVechileStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_VEHICLES_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**Update vehicle image status */
export async function updateVechileImageStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_VEHICLES_IMAGE_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**Update taxation status */
export async function updateTaxationStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_TAXATION_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**update driver status */
export async function updateDriverStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_DRIVERS_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update discount status */
export async function updateDiscountStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_DISCOUNTS_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
/**Update language status */
export async function updateLanguageStatus(id) {
  try {
    const { data } = await axios.put(
      `${url.PUT_LANGUAGES_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );

    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous discounts */
export async function updateDiscounts(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.PUT_DISCOUNTS_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update previous language */
export async function updateLanguage(id, data) {
  try {
    const formData = new FormData();
    // Append the object data to the FormData instance
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // Send the form data as a POST request using Axios
    const response = await axios.put(
      `${url.PUT_LANGUAGES_EDIT_URL}/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return { error: "Faild !" };
  }
}

/**Update Review status */
export async function updateReviewStatus(id) {
  try {
    const data = await axios.put(
      `${url.PUT_REVIEW_UPDATE_STATUS}/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ADMIN_API_TOKEN}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: "Faild !" };
  }
}
