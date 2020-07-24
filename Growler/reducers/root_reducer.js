import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import growlsReducer from "./growls_reducer";


const RootReducer = combineReducers({
  errors: errorsReducer,
  session: sessionReducer,
  growls: growlsReducer,
});

export default RootReducer;
