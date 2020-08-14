import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import growlsReducer from "./growls_reducer";
import likesReducer from './likes_reducer';


const RootReducer = combineReducers({
  errors: errorsReducer,
  session: sessionReducer,
  growls: growlsReducer,
  likes: likesReducer
});

export default RootReducer;
