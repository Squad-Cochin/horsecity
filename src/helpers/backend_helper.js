import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();
// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};


// Login Method
const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);
// recoverPassword
const recoverPassword = data => api.create(url.RECOVER_PASSWORD, data);
//changePassword
const changePassword = data =>  api.create(url.POST_FAKE_CHANGE_PWD, data);
// postForgetPwd
const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);
// postResetpassword
const postFakeResetPwd = data => api.create(url.POST_FAKE_PASSWORD_RESET, data);
// Edit profile
const postJwtProfile = data => api.create(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = data => api.create(url.POST_EDIT_PROFILE, data);




// postForgetPwd
const postJwtForgetPwd = data => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);


// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => api.update(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
api.delete(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => api.get(url.GET_CATEGORIES);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postFakeResetPwd,
  postJwtForgetPwd,
  postJwtProfile,
  recoverPassword,
  changePassword
};
