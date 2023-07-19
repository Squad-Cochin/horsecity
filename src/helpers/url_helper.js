//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

/**
 * The below one is Hari's Computer Details
 */
// export const API_BASE_URL = "http://192.168.200.88:8080";
// const apiBaseUrl = "http://192.168.200.88:8080";

/**
 * The below one is Shaheer's Computer Details
 */
export const API_BASE_URL = "http://192.168.200.211:8000";
const apiBaseUrl = "http://192.168.200.211:8000";

/**
 * The below one is Saurabh's Computer Details
 */
// export const API_BASE_URL = "http://192.168.200.130:8080";
// const apiBaseUrl = "http://192.168.200.130:8080";

/**
 * The below one is own Computer Details
 */

// const apiBaseUrl = "http://localhost:8000";
// export const API_BASE_URL = "http://localhost:8000";

const token = "/horsecity661809"

export const LOGIN_URL = apiBaseUrl + token + "/login"
export const RECOVER_PWD_URL = apiBaseUrl + token + "/recoveryPassword"
export const CHANGE_PASSWORD_URL = apiBaseUrl + token + "/changePassword"

/**NEW */
export const RECOVER_PASSWORD = "/fake-recover-password";
export const POST_FAKE_CHANGE_PWD = "/post-fake-change-password";

/**SERVICE PROVIDER */
export const GET_SP_ALL_DATA_URL = apiBaseUrl + token + "/getAll/serviceproviders"
export const POST_SP_ADD_URL = apiBaseUrl + token + "/add/serviceprovider"
export const PUT_SP_UPDATE_STATUS = apiBaseUrl + token + "/update-status/serviceprovider"
export const POST_SP_EDIT_URL = apiBaseUrl + token + "/edit:id"
export const PUT_SP_REMOVE = apiBaseUrl + token + "/remove/serviceprovider"



export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";


