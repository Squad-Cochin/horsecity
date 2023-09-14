import { call, put, takeEvery} from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER , RECOVER_PASSWORD, CHANGE_NEW_PASSWORD} from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess, updatePWDSuccess } from "./actions";
//Include Both Helper File with needed methods

import {
  postFakeLogin,
  recoverPassword,
  changePassword,
} from "../../../helpers/backend_helper";



function* loginUser({ payload: { user, history } }) {
  try {

    // if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        userName: user.userName,
        password: user.password,
      });

      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    // }
    const data = new Promise((resolve, reject)=>{
      let storeData = localStorage.getItem("authUser")
      resolve(storeData)
      reject("")
    })

    data.then((e) => {
      if(e === `"expired"`){
        history("/change-password");
      }else{
        history("/dashboard");
      }
    })
  } catch (error) {
    yield put(apiError(error));
  }
}

/**RECOVER NEW PASSWORD */
function* recoverNewPassword({ payload: { user } }) {
  try{
  yield call(recoverPassword, {
    email: user.email,
  });
}catch (error) {

  yield put(apiError(error));
}
}

/**RECOVER NEW PASSWORD */
function* updateNewPassword({ payload: { user } }) {
  try{
   const response =   yield call(changePassword, user);
   console.log("RES",response);
      yield put(updatePWDSuccess(response.message));
}catch (error) {
  yield put(apiError(error));
}
}


function* logoutUser() {
  try {
       localStorage.removeItem("authUser");
      yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}


function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(RECOVER_PASSWORD, recoverNewPassword);
  yield takeEvery(CHANGE_NEW_PASSWORD, updateNewPassword);
}

export default authSaga;
