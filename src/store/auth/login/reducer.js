import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  CHANGE_PASSWORD_SUCCESS
} from "./actionTypes";

const initialState = {
  error: "",
  user : "",
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        error: "",
        user : action.payload,
        loading: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case CHANGE_PASSWORD_SUCCESS ://
      state = {
        ...state,
        error: "",
        loading: false,
      };
      break ;
    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        isUserLogout: false,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
