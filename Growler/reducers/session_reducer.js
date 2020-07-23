import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRORS,
  RECEIVE_USER_LOGOUT
} from "../actions/session_actions";

const _nullErrors = [];

const SessionReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return Object.assign({}, action.errors);
    case RECEIVE_CURRENT_USER:
      debugger;
      return Object.assign({}, action.user);
    case RECEIVE_USER_LOGOUT:
      debugger;
      return {};
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
};

export default SessionReducer;
