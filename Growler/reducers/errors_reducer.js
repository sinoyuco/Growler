import { combineReducers } from "redux";

import sessionErrorsReducer from "./sessions_errors_reducer";
// import growlErrorsReducer from './growl_errors_reducer';

export default errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  // growls: growlErrorsReducer
});

