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

