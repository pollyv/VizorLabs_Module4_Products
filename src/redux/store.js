import { createStore, combineReducers } from "redux";
import { authReducer } from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);
