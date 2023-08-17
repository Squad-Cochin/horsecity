import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN , RECOVER_PASSWORD, CHANGE_NEW_PASSWORD} from "./actionTypes";

import { apiError, loginSuccess, logoutUserSuccess, updatePWDSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  recoverPassword,
  changePassword,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.userName,
        user.password
      );
      console.log("RRR",response);
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        userName: user.userName,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        userName: user.userName,
        password: user.password,
      });
      console.log("response",response)

   
      localStorage.setItem("authUser", JSON.stringify(response));


      yield put(loginSuccess(response));
    }
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
    console.log("err",error);

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

/**rECOVER NEW PASSWORD */
function* updateNewPassword({ payload: { user } }) {
  try{
    console.log("yy")
   const response =   yield call(changePassword, user);
   console.log("RESPO",response);
      yield put(updatePWDSuccess(response));
}catch (error) {
  console.log("RESPOERR",error);
  yield put(apiError(error));
}
}


function* logoutUser() {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(LOGOUT_USER, response));
    } else {
      yield put(logoutUserSuccess(LOGOUT_USER, true));
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, data, type);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    const data2 = new Promise((resolve, reject)=>{
      resolve(
        localStorage.getItem("authUser")
      )
      reject("")
      
    })
    console.log(data)
    if(data2 === "expired"){
      history("/change-password");
    }else{
      history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(RECOVER_PASSWORD, recoverNewPassword);
  yield takeEvery(CHANGE_NEW_PASSWORD, updateNewPassword);
}

export default authSaga;
