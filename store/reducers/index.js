import {combineReducers} from "redux";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/authSlice";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    // any other reducers here
})