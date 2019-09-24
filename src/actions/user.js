import {
  GET_ALL_USER_LIST,
  GET_ALL_USER_LIST_SUCCESS,
  GET_ALL_USER_LIST_FAILURE,
  GET_USER_DETAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILURE,
  UPDATING_USER,
  UPDATING_USER_FAILURE,
  UPDATING_USER_SUCCESS,
  //   FETCHING_MY_PATIENT_LIST,
  //   FETCHING_MY_PATIENT_LIST_SUCCESS,
  //   FETCHING_MY_PATIENT_LIST_FAILURE,
  //   DELETING_PATIENT,
  //   DELETING_PATIENT_SUCCESS,
  //   DELETING_PATIENT_FAILURE,
    REGISTERING_USER,
    REGISTERING_USER_SUCCESS,
    REGISTERING_USER_FAILURE,
  //   UPDATING_PATIENT,
  //   UPDATING_PATIENT_SUCCESS,
  //   UPDATING_PATIENT_FAILURE
} from "./constants";
import api from "../api";
import { handleErrors } from "../utils";
import { login } from "./login";

export const getAllUsers = that => {
  return dispatch => {
    dispatch({
      type: GET_ALL_USER_LIST,
      payload: true
    });
    return api
      .get("users")
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: GET_ALL_USER_LIST_SUCCESS,
            payload: response.data
          });
          dispatch({
            type: GET_ALL_USER_LIST,
            payload: false
          });
        } else {
          dispatch({
            type: GET_ALL_USER_LIST_FAILURE,
            payload: err
          });
          dispatch({
            type: GET_ALL_USER_LIST,
            payload: false
          });
          handleErrors(response, that);
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_USER_LIST_FAILURE,
          payload: err
        });
        dispatch({
          type: GET_ALL_USER_LIST,
          payload: false
        });
        handleErrors(response, that);
      });
  };
};

export const getUserDetail = id => {
  return dispatch => {
    dispatch({
      type: GET_USER_DETAIL,
      payload: true
    });
    return api
      .get(`users/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: GET_USER_DETAIL_SUCCESS,
            payload: response.data
          });
          dispatch({
            type: GET_USER_DETAIL,
            payload: false
          });
        } else {
          dispatch({
            type: GET_USER_DETAIL_FAILURE,
            payload: response.data
          });
          dispatch({
            type: GET_USER_DETAIL,
            payload: false
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_USER_DETAIL_FAILURE,
          payload: err
        });
        dispatch({
          type: GET_USER_DETAIL,
          payload: false
        });
      });
  };
};

// export const deletePatient = (id, that) => dispatch => {
//   dispatch({
//     type: DELETING_PATIENT,
//     payload: true
//   });
//   return api
//     .delete(`patients/${id}`)
//     .then(res => {
//       if (res.status === 200) {
//         dispatch({
//           type: DELETING_PATIENT_SUCCESS,
//           payload: id
//         });
//         dispatch({
//           type: DELETING_PATIENT,
//           payload: false
//         });
//         that.refs.toast.show(res.msg || "Patient Deleted");
//       } else {
//         dispatch({
//           type: DELETING_PATIENT_FAILURE,
//           payload: res
//         });
//         dispatch({
//           type: DELETING_PATIENT,
//           payload: false
//         });
//         handleErrors(res, that);
//       }
//     })
//     .catch(err => {
//       console.log("err in deleting", err);
//       dispatch({
//         type: DELETING_PATIENT_FAILURE,
//         payload: err
//       });
//       dispatch({
//         type: DELETING_PATIENT,
//         payload: false
//       });
//       handleErrors(err, that);
//     });
// };

export const registerUser = (url, obj, that) => dispatch => {
  dispatch({
    type: REGISTERING_USER,
    payload: true
  });
  console.log("url", url, obj);
  return api
    .post(url, obj)
    .then(res => {
      console.log('res done', res.data);
      if (res.status === 200 && res.data && res.data.token) {
        dispatch({
          type: REGISTERING_USER_SUCCESS,
          payload: res.data
        });
        dispatch({
          type: REGISTERING_USER,
          payload: false
        });
        that.refs.toast.show("User Registered");
        console.log('================reached=========================');
        dispatch(login(obj.email, obj.password, that));
      } else {
        dispatch({
          type: REGISTERING_USER_FAILURE,
          payload: res
        });
        dispatch({
          type: REGISTERING_USER,
          payload: false
        });
        handleErrors(res, that);
      }
    })
    .catch(err => {
      console.log("err in deleting", err);
      dispatch({
        type: REGISTERING_USER_FAILURE,
        payload: err
      });
      dispatch({
        type: REGISTERING_USER,
        payload: false
      });
      handleErrors(err, that);
    });
};

export const updateUserDetail = (id, obj, that) => dispatch => {
  dispatch({
    type: UPDATING_USER,
    payload: true
  });
  return api
    .put(`users/${id}`, obj)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: UPDATING_USER_SUCCESS,
          payload: true
        });
        dispatch({
          type: UPDATING_USER,
          payload: false
        });
        that.refs.toast.show("User Updated");
      } else {
        dispatch({
          type: UPDATING_USER_FAILURE,
          payload: res
        });
        dispatch({
          type: UPDATING_USER,
          payload: false
        });
        handleErrors(err, that);
      }
    })
    .catch(err => {
      dispatch({
        type: UPDATING_USER_FAILURE,
        payload: false
      });
      dispatch({
        type: UPDATING_USER,
        payload: false
      });
      handleErrors(err, that);
    });
};
