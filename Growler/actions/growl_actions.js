import * as APIUtil from '../util/growl_api_util';

export const RECEIVE_GROWL = 'RECEIVE_GROWL';
export const RECEIVE_GROWL_ERRORS = 'RECEIVE_GROWL_ERRORS'

const receiveGrowl = (growl) => ({
    type: RECEIVE_GROWL,
    growl
});

const receiveGrowlErrors = (errors) => ({
    type: RECEIVE_GROWL_ERRORS,
    errors
})

export const postGrowl = (growl) => dispatch => {
    return APIUtil.postGrowl(growl)
    .then(growl => dispatch(receiveGrowl(growl)))
    .catch(err => receiveGrowlErrors(err));
}