import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// // Calendar
// import calendar from "./calendar/reducer";

// Authentication
import forgetPassword from "./auth/forgetpwd/reducer";
import login from "./auth/login/reducer";
import profile from "./auth/profile/reducer";
import account from "./auth/register/reducer";
import settings from "./dashboard/settings/reducer";
const rootReducer = combineReducers({
  // public
  Layout,
  forgetPassword,
  login,
  profile,
  account,
  settings
});

export default rootReducer;
