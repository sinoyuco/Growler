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

export const receiveUserSignIn = (user) => ({
  type: RECEIVE_USER_SIGN_IN,
  user
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
        const { token } = res.data;
        saveData("jwtToken", token);
        APIUtil.setAuthToken(token);
        return dispatch(receiveCurrentUser(jwt_decode(token)));
    })
     .catch(err => {
         debugger;
        return dispatch(receiveSessionErrors(err.response.data));
    })
};

export const signup = user => dispatch => {
    debugger;
    return APIUtil.signup(user).then(() => {
        debugger;
        return dispatch(receiveCurrentUser(user))
    }, err => {
        debugger;
        return dispatch(receiveSessionErrors(err.response.data))}
    ).catch(err => {
        debugger;
        console.log(err);
    });
};

export const logout = () => (dispatch) => {
    remove("jwtToken");
    APIUtil.setAuthToken(false);
    return dispatch(logoutUser());
};


