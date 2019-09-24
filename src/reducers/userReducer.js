import {
  GET_ALL_USER_LIST,
  GET_ALL_USER_LIST_SUCCESS,
  GET_ALL_USER_LIST_FAILURE,
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAILURE,
  GET_USER_DETAIL_SUCCESS,
  UPDATING_USER,
  UPDATING_USER_FAILURE,
  UPDATING_PATIENT_SUCCESS,
  UPDATING_USER_SUCCESS
} from "../actions/constants";

const INITIAL_VALUE = {
  isLoading: false,
  isError: false,
  errorDetail: {},
  userList: [],
  userDetail: {},
  isDeleting: false,
//   isRegistering: false,
//   isPatientRegistrationDone: false,
  isUserUpdating: false,
  isUserUpdated: false
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case GET_ALL_USER_LIST:
      return { ...state, isLoading: true };
    case GET_ALL_USER_LIST_FAILURE:
      return {
        ...state,
        errorDetail: action.payload.data,
        isError: true,
        isLoading: false
      };
    case GET_ALL_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload,
        isError: false,
        errorDetail: {},
        isLoading: false
      };
    case GET_USER_DETAIL:
      return { ...state, isLoading: true };
    case GET_USER_DETAIL_FAILURE:
      return {
        ...state,
        isError: true,
        errorDetail: action.payload,
        isLoading: false,
        userDetail: {}
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorDetail: {},
        userDetail: action.payload
      };
    // case DELETING_PATIENT:
    //   return { ...state, isDeleting: action.payload };
    // case DELETING_PATIENT_FAILURE:
    //   return {
    //     ...state,
    //     isError: true,
    //     errorDetail: action.payload
    //   };
    // case DELETING_PATIENT_SUCCESS:
    //   let index = state.myPatientsList.findIndex(
    //     x => x._id === action.payload
    //   );
    //   let index1 = state.patientList.findIndex(x => x._id === action.payload);
    //   let newState = { ...state };
    //   if (index >= 0) {
    //     newState.myPatientsList.splice(index, 1);
    //   }
    //   if (index1 >= 0) {
    //     newState.patientList.splice(index1, 1);
    //   }
    //   return {
    //     ...newState,
    //     isError: false,
    //     errorDetail: {}
    //   };
    // case REGISTERING_PATIENT:
    //   return { ...state, isRegistering: action.payload, isPatientRegistrationDone: false };
    // case REGISTERING_PATIENT_SUCCESS:
    //   let newPatientState = { ...state };
    //   newPatientState.patientList.push(action.payload);
    //   return { ...newPatientState, isError: false, errorDetail: {}, isPatientRegistrationDone: true };
    // case REGISTERING_PATIENT_FAILURE:
    //   return { ...state, isError: true, errorDetail: action.payload, isPatientRegistrationDone: false };
    case UPDATING_USER: 
      return { ...state, isPatientUpdating: action.payload};
    case UPDATING_USER_FAILURE: 
      return {
        ...state,
        isError: true,
        errorDetail: action.payload,
        isPatientUpdated: false,
      }
    case UPDATING_USER_SUCCESS:
      let updatedUserState = {...state};
      let id = (action.payload && action.payload._id) || '';
      let itemIndex = null;
      if(id){
        itemIndex = state.userList.findIndex(x => x._id === id);
      }
      if (id && itemIndex >= 0) {
        for (var i in updatedUserState.userList) {
          if (updatedUserState.userList[i]._id == id) {
            updatedUserState.userList[i] = action.payload;
            break; //Stop this loop, we found it!
          }
        }
      }
      return {
        ...updatedUserState,
        isError: false,
        errorDetail: {}
      }
    default:
      return state;
  }
};
