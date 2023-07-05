import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  RECOVER_PASSWORD,
  CHANGE_NEW_PASSWORD,
  CHANGE_PASSWORD_SUCCESS
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}
export const userRecoverPassword = (user ) => {
  return {
    type: RECOVER_PASSWORD,
    payload: { user },
  }
}

export const updateNewPwd = (user) => {
  return {
    type: CHANGE_NEW_PASSWORD,
    payload: { user },
  }
}


export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const updatePWDSuccess = user => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: user,
  }
}



export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
