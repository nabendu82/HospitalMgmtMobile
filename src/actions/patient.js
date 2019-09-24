import {
  GET_ALL_PATIENT_LIST,
  GET_ALL_PATIENT_LIST_SUCCESS,
  GET_ALL_PATIENT_LIST_FAILURE,
  GET_PATIENT_DETAIL,
  GET_PATIENT_DETAIL_SUCCESS,
  GET_PATIENT_DETAIL_FAILURE,
  FETCHING_MY_PATIENT_LIST,
  FETCHING_MY_PATIENT_LIST_SUCCESS,
  FETCHING_MY_PATIENT_LIST_FAILURE,
  DELETING_PATIENT,
  DELETING_PATIENT_SUCCESS,
  DELETING_PATIENT_FAILURE,
  REGISTERING_PATIENT,
  REGISTERING_PATIENT_SUCCESS,
  REGISTERING_PATIENT_FAILURE,
  UPDATING_PATIENT,
  UPDATING_PATIENT_SUCCESS,
  UPDATING_PATIENT_FAILURE
} from "./constants";
import api from '../api';
import { handleErrors } from '../utils';

export const getAllPatients = (that) => {
  return dispatch => {
    dispatch({
      type: GET_ALL_PATIENT_LIST,
      payload: true
    });
    return api.get('patients')
      .then(response => {
          if(response.status === 200){
            dispatch({
              type: GET_ALL_PATIENT_LIST_SUCCESS,
              payload: response.data
            });
            dispatch({
              type: GET_ALL_PATIENT_LIST,
              payload: false
            });
          } else {
            dispatch({
              type: GET_ALL_PATIENT_LIST_FAILURE,
              payload: err
            });
            dispatch({
              type: GET_ALL_PATIENT_LIST,
              payload: false
            });
            handleErrors(response, that);
          }
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_PATIENT_LIST_FAILURE,
          payload: err
        });
        dispatch({
          type: GET_ALL_PATIENT_LIST,
          payload: false
        });
        handleErrors(response, that);
      });
  };
};

export const getMyPatients = (that) => {
  return dispatch => {
    dispatch({
      type: FETCHING_MY_PATIENT_LIST,
      payload: true
    });
    return api.get(`patients/me/`)
    .then((response) => {
      if(response.status === 200){
        dispatch({
          type: FETCHING_MY_PATIENT_LIST_SUCCESS,
          payload: response.data
        });
        dispatch({
          type: FETCHING_MY_PATIENT_LIST,
          payload: false
        });
      } else {
        dispatch({
          type: FETCHING_MY_PATIENT_LIST_FAILURE,
          payload: response.data
        });
        dispatch({
          type: FETCHING_MY_PATIENT_LIST,
          payload: false
        });
        handleErrors(response, that)
      }
    })
    .catch((err) => {
      dispatch({
        type: FETCHING_MY_PATIENT_LIST_FAILURE,
        payload: err
      });
      dispatch({
        type: FETCHING_MY_PATIENT_LIST,
        payload: false
      });
      handleErrors(response, that);
    })
  }
}

export const getPatientDetail = (id) => {
  return dispatch => {
    dispatch({
      type: GET_PATIENT_DETAIL,
      payload: true
    })
    return api.get(`patients/${id}`)
    .then((response) => {
      if(response.status === 200){
        dispatch({
          type: GET_PATIENT_DETAIL_SUCCESS,
          payload: response.data
        });
        dispatch({
          type: GET_PATIENT_DETAIL,
          payload: false
        });
      } else {
        dispatch({
          type: GET_PATIENT_DETAIL_FAILURE,
          payload: response.data
        });
        dispatch({
          type: GET_PATIENT_DETAIL,
          payload: false
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_PATIENT_DETAIL_FAILURE,
        payload: err
      });
      dispatch({
        type: GET_PATIENT_DETAIL,
        payload: false
      });
      
    })
  }
}

export const deletePatient = (id, that) => dispatch => {
  dispatch({
    type: DELETING_PATIENT,
    payload: true
  });
  return api.delete(`patients/${id}`)
  .then((res) => {
    if(res.status === 200){
      dispatch({
        type: DELETING_PATIENT_SUCCESS,
        payload: id
      });
      dispatch({
        type: DELETING_PATIENT,
        payload: false
      });
      that.refs.toast.show(res.msg || 'Patient Deleted');
    } else {
      dispatch({
        type: DELETING_PATIENT_FAILURE,
        payload: res
      })
      dispatch({
        type: DELETING_PATIENT,
        payload: false
      });
      handleErrors(res, that);
    }

  })
  .catch((err) => {
    console.log('err in deleting', err)
    dispatch({
      type: DELETING_PATIENT_FAILURE,
      payload: err
    });
    dispatch({
      type: DELETING_PATIENT,
      payload: false
    });
    handleErrors(err, that);
  })
}

export const registerPatient = (url, obj, that) => dispatch => {
  dispatch({
    type: REGISTERING_PATIENT,
    payload: true
  });
  console.log('url', url, obj)
  return api
    .post(url, obj)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: REGISTERING_PATIENT_SUCCESS,
          payload: res.data
        });
        dispatch({
          type: REGISTERING_PATIENT,
          payload: false
        });
        that.refs.toast.show("Patient Registered");
      } else {
        dispatch({
          type: REGISTERING_PATIENT_FAILURE,
          payload: res
        });
        dispatch({
          type: REGISTERING_PATIENT,
          payload: false
        });
        handleErrors(res, that);
      }
    })
    .catch(err => {
      console.log("err in deleting", err);
      dispatch({
        type: REGISTERING_PATIENT_FAILURE,
        payload: err
      });
      dispatch({
        type: REGISTERING_PATIENT,
        payload: false
      });
      handleErrors(err, that);
    });
}

export const updatePatientDetail = (id, obj, that) => dispatch => {
  dispatch({
    type: UPDATING_PATIENT,
    payload: true
  });
  return api.put(`patients/${id}`, obj)
  .then((res) => {
    if(res.status === 200){
      dispatch({
        type: UPDATING_PATIENT_SUCCESS,
        payload: true
      });
      dispatch({
        type: UPDATING_PATIENT,
        payload: false
      });
      that.refs.toast.show("Patient Updated");
    } else {
      dispatch({
        type: UPDATING_PATIENT_FAILURE,
        payload: res
      });
      dispatch({
        type: UPDATING_PATIENT,
        payload: false
      });
      handleErrors(err, that);
    }
  })
  .catch((err) => {
    dispatch({
      type: UPDATING_PATIENT_FAILURE,
      payload: false
    });
    dispatch({
      type: UPDATING_PATIENT,
      payload: false
    });
    handleErrors(err, that);
  })
}
