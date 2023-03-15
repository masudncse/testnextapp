import {combineReducers} from "redux";
import authReducer from "../slices/authSlice";
import themeReducer from "../slices/themeSlice";

export default combineReducers({
    auth: authReducer,
    theme: themeReducer,
    // any other reducers here
})