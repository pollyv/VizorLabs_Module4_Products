import { createStore, combineReducers } from "redux";
import { authReducer } from "./authSlice";
import { productsReducer } from "./productsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

export const store = createStore(rootReducer);
