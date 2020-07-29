import {
  RECEIVE_GROWLS,
  RECEIVE_USER_GROWLS,
  RECEIVE_NEW_GROWL,
} from "../actions/growl_actions";

const GrowlsReducer = (state = { all: {}, user: {}, new: undefined },action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GROWLS:
    debugger;
      newState.all = action.growls.data;
      return newState;
    case RECEIVE_USER_GROWLS:
    debugger;
      newState.user = action.growls.data;
      return newState;
    case RECEIVE_NEW_GROWL:
      newState.new = action.growl.data;
      return newState;
    default:
      return state;
  }
};

export default GrowlsReducer;
