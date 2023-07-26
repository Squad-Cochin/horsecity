import {
  SETTINGS_SUCCESS,
  // API_ERROR,
} from "./actionTypes"

export const uploadSettings = (data) => {

  return {
    type: SETTINGS_SUCCESS,
    payload: data,
  }
}


// export const apiError = error => {
//   return {
//     type: API_ERROR,
//     payload: error,
//   }
// }








// export const logoutUser = history => {
//   return {
//     type: LOGOUT_USER,
//     payload: { history },
//   }
// }

// export const logoutUserSuccess = () => {
//   return {
//     type: LOGOUT_USER_SUCCESS,
//     payload: {},
//   }
// }


// export const socialLogin = (data, history, type) => {
//   return {
//     type: SOCIAL_LOGIN,
//     payload: { data, history, type },
//   }
// }
