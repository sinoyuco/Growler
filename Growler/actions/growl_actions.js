import * as APIUtil from '../util/growl_api_util';

export const RECEIVE_GROWLS = 'RECEIVE_GROWLS';
export const RECEIVE_GROWL_ERRORS = 'RECEIVE_GROWL_ERRORS'
export const RECEIVE_USER_GROWLS = "RECEIVE_USER_GROWLS";
export const RECEIVE_NEW_GROWL = "RECEIVE_NEW_GROWL";

const receiveGrowls = (growls) => ({
    type: RECEIVE_GROWLS,
    growl
});

export const receiveUserGrowls = (growls) => ({
  type: RECEIVE_USER_GROWLS,
  growls,
});

export const receiveNewGrowl = (growl) => ({
  type: RECEIVE_NEW_GROWL,
  growl,
});

const receiveGrowlErrors = (errors) => ({
    type: RECEIVE_GROWL_ERRORS,
    errors
});

export const fetchGrowls = () => (dispatch) => {
    return APIUtil.getGrowls()
        .then((growls) => dispatch(receiveGrowls(growls)))
        .catch((err) => console.log(err))};

export const fetchUserGrowls = (id) => (dispatch) =>{
    return APIUtil.getUserGrowls(id)
        .then((growls) => dispatch(receiveUserGrowls(growls)))
        .catch((err) => console.log(err))};

export const postGrowl = (data) => dispatch => {
    debugger
    return APIUtil.postGrowl(data)
    .then(growl => {
        debugger;
        dispatch(receiveNewGrowl(growl))})
    .catch(err => {
        debugger 
        return dispatch(receiveGrowlErrors(err))}
        )};


