import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD,RESET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError,userResetPasswordSuccess,userResetPasswordError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';

import {
  postFakeForgetPwd,
  postFakeResetPwd
} from "../../../helpers/backend_helper"


const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {

      const response = yield call(postFakeForgetPwd,{ email: user.email })
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        )
      }
    
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

//If user is send successfully reset password link then dispatch redux action's are directly from here.
function* resetPasswordUser({ payload: { data, history } }) {
  try {

      const response = yield call(postFakeResetPwd,data)
      if (response) {
        console.log("res",response);
        yield put(
          userResetPasswordSuccess(
            "Password updated successfully ,"
          )
        )
      }
    
  } catch (error) {
    yield put(userResetPasswordError(error))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
  yield takeEvery(RESET_PASSWORD, resetPasswordUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga;
