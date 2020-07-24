import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";
import {getData, saveData, remove} from './async_storage';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user,
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const clearSessionErros = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const login = (userData) => dispatch => {
    return APIUtil.login(userData)
    .then(res => {
        debugger;
        const { token } = res.data;
        saveData("jwtToken", token);
        APIUtil.setAuthToken(token);
         dispatch(receiveCurrentUser(jwt_decode(token)));
    })
     .catch(err => {
         debugger;
        dispatch(receiveSessionErrors(err.response.data));
    })
};

export const signup = user => dispatch => (
    APIUtil.signup(user).then(() => (
        dispatch(receiveUserSignIn())
    )), err => (dispatch(receiveErrors(err.response.data)))
);

export const logout = () => (dispatch) => {
    remove("jwtToken");
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
};


