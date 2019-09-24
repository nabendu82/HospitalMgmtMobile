import {
  FETHING_HOSPITAL_LIST,
  FETCHING_HOSPITAL_LIST_SUCCESS,
  FETCHING_HOSPITAL_LIST_FAILURE,
  ADDING_HOSPITAL,
  ADDING_HOSPITAL_SUCCESS,
  ADDING_HOSPITAL_FAILURE
} from "./constants";
import api from "../api";
import { handleErrors } from "../utils";

export const getHospitalList = (that) => dispatch => {
    dispatch({
      type: FETHING_HOSPITAL_LIST,
      payload: true
    });
    return api.get('hospitals')
    .then((res) => {
        if(res.status === 200){
           dispatch({
             type: FETCHING_HOSPITAL_LIST_SUCCESS,
             payload: res.data
           }); 
           dispatch({
             type: FETHING_HOSPITAL_LIST,
             payload: false
           });
        } else {
            dispatch({
              type: FETCHING_HOSPITAL_LIST_FAILURE,
              payload: res
            });
            dispatch({
              type: FETHING_HOSPITAL_LIST,
              payload: false
            });
            handleErrors(err, that);
        }
    })
    .catch((err) => {
        console.log('err', err);
        dispatch({
          type: FETCHING_HOSPITAL_LIST_FAILURE,
          payload: err
        });
        dispatch({
          type: FETHING_HOSPITAL_LIST,
          payload: false
        });
        handleErrors(err, that);
    })
}

export const addHospital = (url, obj, that) => dispatch => {
  dispatch({
    type: ADDING_HOSPITAL,
    payload: true
  })
  console.log("add hospital called", url);
  return api
    .post(url, obj)
    .then(res => {
      if (res.status === 200) {
        console.log("res:-- ", res.status);
        dispatch({
          type: ADDING_HOSPITAL_SUCCESS,
          payload: true
        });
        dispatch({
          type: ADDING_HOSPITAL,
          payload: false
        });
      } else {
        dispatch({
          type: ADDING_HOSPITAL_FAILURE,
          payload: res
        });
        dispatch({
          type: ADDING_HOSPITAL,
          payload: false
        });
        handleErrors(err, that);
      }
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: ADDING_HOSPITAL_FAILURE,
        payload: err
      });
      dispatch({
        type: ADDING_HOSPITAL,
        payload: false
      });
      handleErrors(err, that);
    });
}
