import {
  RECEIVE_GROWLS,
  RECEIVE_USER_GROWLS,
  RECEIVE_NEW_GROWL,
  RECEIVE_GROWL_ERRORS,
} from "../actions/growl_actions";

const GrowlsReducer = (state = { all: {}, user: {}, new: undefined, errors:{} },action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GROWLS:
      newState.all = action.growls.data;
      return newState;
    case RECEIVE_USER_GROWLS:
      newState.user = action.growls.data;
      return newState;
    case RECEIVE_NEW_GROWL:
      newState.new = action.growl.data;
      return newState;
    case RECEIVE_GROWL_ERRORS:
      newState.errors = action.errors;
      return newState
    default:
      return state;
  }
};

export default GrowlsReducer;
