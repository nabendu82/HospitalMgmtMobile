import {
  GET_ALL_PATIENT_LIST,
  GET_ALL_PATIENT_LIST_FAILURE,
  GET_ALL_PATIENT_LIST_SUCCESS,
  GET_PATIENT_DETAIL,
  GET_PATIENT_DETAIL_SUCCESS,
  GET_PATIENT_DETAIL_FAILURE,
  FETCHING_MY_PATIENT_LIST,
  FETCHING_MY_PATIENT_LIST_SUCCESS,
  FETCHING_MY_PATIENT_LIST_FAILURE,
  DELETING_PATIENT,
  DELETING_PATIENT_FAILURE,
  DELETING_PATIENT_SUCCESS,
  REGISTERING_PATIENT,
  REGISTERING_PATIENT_FAILURE,
  REGISTERING_PATIENT_SUCCESS,
  UPDATING_PATIENT,
  UPDATING_PATIENT_FAILURE,
  UPDATING_PATIENT_SUCCESS
} from "../actions/constants";

const INITIAL_VALUE = {
  isLoading: false,
  isError: false,
  errorDetail: {},
  patientList: [],
  patientDetail: {},
  myPatientsList: [],
  isDeleting: false,
  isRegistering: false,
  isPatientRegistrationDone: false,
  isPatientUpdating: false,
  isPatientUpdated: false
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case GET_ALL_PATIENT_LIST:
      return { ...state, isLoading: true };
    case GET_ALL_PATIENT_LIST_FAILURE:
      return {
        ...state,
        errorDetail: action.payload.data,
        isError: true,
        isLoading: false
      };
    case GET_ALL_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        patientList: action.payload,
        isError: false,
        errorDetail: {},
        isLoading: false
      };
    case GET_PATIENT_DETAIL:
      return { ...state, isLoading: true };
    case GET_PATIENT_DETAIL_FAILURE:
      return {
        ...state,
        isError: true,
        errorDetail: action.payload,
        isLoading: false,
        patientDetail: {}
      };
    case GET_PATIENT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorDetail: {},
        patientDetail: action.payload
      };
    case FETCHING_MY_PATIENT_LIST:
      return { ...state, isLoading: true };
    case FETCHING_MY_PATIENT_LIST_FAILURE:
      return {
        ...state,
        isError: true,
        errorDetail: action.payload,
        isLoading: false,
        myPatientsList: []
      };
    case FETCHING_MY_PATIENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorDetail: {},
        myPatientsList: action.payload
      };
    case DELETING_PATIENT:
      return { ...state, isDeleting: action.payload };
    case DELETING_PATIENT_FAILURE:
      return {
        ...state,
        isError: true,
        errorDetail: action.payload
      };
    case DELETING_PATIENT_SUCCESS:
      let index = state.myPatientsList.findIndex(
        x => x._id === action.payload
      );
      let index1 = state.patientList.findIndex(x => x._id === action.payload);
      let newState = { ...state };
      if (index >= 0) {
        newState.myPatientsList.splice(index, 1);
      }
      if (index1 >= 0) {
        newState.patientList.splice(index1, 1);
      }
      return {
        ...newState,
        isError: false,
        errorDetail: {}
      };
    case REGISTERING_PATIENT:
      return { ...state, isRegistering: action.payload, isPatientRegistrationDone: false };
    case REGISTERING_PATIENT_SUCCESS:
      let newPatientState = { ...state };
      newPatientState.patientList.push(action.payload);
      return { ...newPatientState, isError: false, errorDetail: {}, isPatientRegistrationDone: true };
    case REGISTERING_PATIENT_FAILURE:
      return { ...state, isError: true, errorDetail: action.payload, isPatientRegistrationDone: false };
    case UPDATING_PATIENT: 
      return { ...state, isPatientUpdating: action.payload};
    case UPDATING_PATIENT_FAILURE: 
      return {
        ...state,
        isError: true,
        errorDetail: action.payload,
        isPatientUpdated: false,
      }
    case UPDATING_PATIENT_SUCCESS:
      let updatedPatientState = {...state};
      let id = (action.payload && action.payload._id) || '';
      let itemIndex = null;
      if(id){
        itemIndex = state.patientList.findIndex(x => x._id === id);
      }
      if (id && itemIndex >= 0) {
        for (var i in updatedPatientState.patientList) {
          if (updatedPatientState.patientList[i]._id == id) {
            updatedPatientState.patientList[i] = action.payload;
            break; //Stop this loop, we found it!
          }
        }
      }
      return {
        ...updatedPatientState,
        isError: false,
        errorDetail: {}
      }
    default:
      return state;
  }
};
