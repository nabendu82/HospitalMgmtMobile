import {
  GET_TOKEN,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  LOADING,
  ERROR,
  USER_LOGGING_IN,
  USER_LOGGING_IN_SUCCESS,
  USER_LOGGING_IN_FAILURE
} from "./constants";
import api from "../api";
import { setHeader } from "../api";
import { AsyncStorage } from "react-native";
import { handleErrors } from '../utils';

export const getToken = token => ({
  type: "GET_TOKEN",
  token
});

export const saveToken = token => ({
  type: "SAVE_TOKEN",
  token
});

export const removeToken = () => ({
  type: "REMOVE_TOKEN"
});

export const loading = bool => ({
  type: "LOADING",
  payload: bool
});

export const error = error => ({
  type: "ERROR",
  error
});

export const getUserToken = () => dispatch => {
   return AsyncStorage.getItem("userToken")
     .then(data => {
       dispatch(loading(false));
       dispatch(getToken(data));
     })
     .catch(err => {
       dispatch(loading(false));
       dispatch(error(err.message || "ERROR"));
     });
}
   

export const saveUserToken = data => dispatch =>
  AsyncStorage.setItem("userToken", data)
    .then(data => {
      dispatch(loading(false));
      dispatch(saveToken(data));
    })
    .catch(err => {
      dispatch(loading(false));
      dispatch(error(err.message || "ERROR"));
    });

export const removeUserToken = (that) => dispatch =>
  AsyncStorage.removeItem("userToken")
    .then(data => {
      dispatch(loading(false));
      dispatch(removeToken(data));
    })
    .catch(err => {
      dispatch(loading(false));
      dispatch(error(err.message || "ERROR"));
    });

export const login = (email, password, that) => {
  let obj = {
    email,
    password
  }
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGGING_IN,
      payload: true
    });
    return api
      .post("auth", obj)
      .then(response => {
        if (response.status === 200 && response.data && response.data.token) {
          let token = response.data.token;
          setHeader(token);
          api.get('auth')
          .then((res) => {
            if(res.status === 200){
              dispatch({
                type: USER_LOGGING_IN_SUCCESS,
                payload: res.data
              });
              // handle respective user role based redirection
              let redirectAppType = "NormalUser";
              if(res.data && res.data.role && res.data.role.toString() === 'Normal'){
                redirectAppType = "NormalUser";
              } else if(res.data && res.data.role && res.data.role.toString() === 'Admin'){
                redirectAppType = "App";
              }
              console.log("user logged in ", res.data);
              console.log("redirectAppType", redirectAppType);
              // handle respective user role based redirection
              that.props.navigation.navigate(redirectAppType);
              dispatch({
                type: USER_LOGGING_IN,
                payload: false
              });
            } else {
              dispatch({
                type: USER_LOGGING_IN_FAILURE,
                payload: response
              });
              dispatch({
                type: USER_LOGGING_IN,
                payload: false
              });
            }
          })
          .catch((err) => {
            dispatch({
              type: USER_LOGGING_IN_FAILURE,
              payload: err
            });
            dispatch({
              type: USER_LOGGING_IN,
              payload: false
            });
            handleErrors(err, that);
          })
        } else {
          dispatch({
            type: USER_LOGGING_IN_FAILURE,
            payload: response
          });
          dispatch({
            type: USER_LOGGING_IN,
            payload: false
          });
          handleErrors(response, that);
        }
      })
      .catch(err => {
        dispatch({
          type: USER_LOGGING_IN_FAILURE,
          payload: err
        });
        dispatch({
          type: USER_LOGGING_IN,
          payload: false
        });
        handleErrors(err, that)
      });
  };
};

export const resetPassword = (email, password, that) => {
  let obj = {
    email,
    password
  }
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGGING_IN,
      payload: true
    });
    return api
      .put("users", obj)
      .then(response => {
        if (response.status === 200 && response.data && response.data.token) {
          let token = response.data.token;
          setHeader(token);
          api.get('auth')
          .then((res) => {
            if(res.status === 200){
              dispatch({
                type: USER_LOGGING_IN_SUCCESS,
                payload: res.data
              });
              that.props.navigation.navigate('App');
              dispatch({
                type: USER_LOGGING_IN,
                payload: false
              });
            } else {
              dispatch({
                type: USER_LOGGING_IN_FAILURE,
                payload: response
              });
              dispatch({
                type: USER_LOGGING_IN,
                payload: false
              });
            }
          })
          .catch((err) => {
            dispatch({
              type: USER_LOGGING_IN_FAILURE,
              payload: err
            });
            dispatch({
              type: USER_LOGGING_IN,
              payload: false
            });
            handleErrors(err, that);
          })
        } else {
          dispatch({
            type: USER_LOGGING_IN_FAILURE,
            payload: response
          });
          dispatch({
            type: USER_LOGGING_IN,
            payload: false
          });
          handleErrors(response, that);
        }
      })
      .catch(err => {
        dispatch({
          type: USER_LOGGING_IN_FAILURE,
          payload: err
        });
        dispatch({
          type: USER_LOGGING_IN,
          payload: false
        });
        handleErrors(err, that)
      });
  }
}