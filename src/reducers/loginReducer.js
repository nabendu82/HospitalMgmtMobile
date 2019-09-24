import {
  GET_TOKEN,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  LOADING,
  ERROR,
  USER_LOGGING_IN,
  USER_LOGGING_IN_SUCCESS,
  USER_LOGGING_IN_FAILURE
} from "../actions/constants";

const INITIAL_VALUE = {
  token: {},
  loading: false,
  error: null,
  user: {}
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state, token: action.token };
    case SAVE_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_TOKEN:
      return { ...state, token: action.token };
    case LOADING:
      return { ...state, loading: action.payload };
    case ERROR:
      return { ...state, error: action.error };
    case USER_LOGGING_IN:
      return { ...state, loading: action.payload };
    case USER_LOGGING_IN_FAILURE:
      return { ...state, error: action.error };
    case USER_LOGGING_IN_SUCCESS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
