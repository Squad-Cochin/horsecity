import {
  MENU_IMAGE,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  file : "",
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case MENU_IMAGE:
      state = {
        ...state,
        error: "",
        file : action.payload.file,
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
