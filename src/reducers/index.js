import { combineReducers } from "redux";
import patientReducer from "./patientReducer";
import loginReducer from "./loginReducer";
import hospitalReducer from "./hospitalReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  patientReducer,
  loginReducer,
  hospitalReducer,
  userReducer
});

export default rootReducer;
