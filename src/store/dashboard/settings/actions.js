import {
  SETTINGS_SUCCESS,
  // API_ERROR,
  DIR_UPDATED
} from "./actionTypes"

export const uploadSettings = (data) => {

  return {
    type: SETTINGS_SUCCESS,
    payload: data,
  }
}



