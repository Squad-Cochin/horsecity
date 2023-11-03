import {
  SETTINGS_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  data : "",

};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_SUCCESS:
      state = {
        ...state,
        data : action.payload,
      };
      break;
    case API_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;


    default:
      state = { ...state };
      break;
  }
  return state;
};

export default settings;
