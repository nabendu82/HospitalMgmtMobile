import {
  FETCHING_HOSPITAL_LIST,
  FETCHING_HOSPITAL_LIST_FAILURE,
  FETCHING_HOSPITAL_LIST_SUCCESS,
  ADDING_HOSPITAL,
  ADDING_HOSPITAL_SUCCESS,
  ADDING_HOSPITAL_FAILURE,
} from "../actions/constants";

const INITIAL_VALUE = {
  isLoading: false,
  isError: false,
  errorDetail: {},
  hospitalList: [],
  hospitalAdded: false
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case FETCHING_HOSPITAL_LIST:
      return { ...state, isLoading: true };
    case FETCHING_HOSPITAL_LIST_FAILURE:
      return {
        ...state,
        errorDetail: action.payload,
        isError: true,
        isLoading: false
      };
    case FETCHING_HOSPITAL_LIST_SUCCESS:
      return {
        ...state,
        hospitalList: action.payload,
        isError: false,
        isLoading: false,
        errorDetail: {}
      };
    case ADDING_HOSPITAL:
      return { ...state, isLoading: action.payload };
    case ADDING_HOSPITAL_FAILURE:
      return {
        ...state,
        errorDetail: action.payload,
        hospitalAdded: false,
        isError: true,
        isLoading: false
      };
    case ADDING_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospitalAdded: true,
        isError: false,
        isLoading: false,
        errorDetail: {}
      };
    default:
      return state;
  }
};
