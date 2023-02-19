import { combineReducers } from "redux";
import sideBarReducer from "./sideBarReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";

export const reducers = combineReducers({
    sideBarReducer,
    productReducer,
    authReducer,
    categoryReducer, modalReducer
});
export type RootState = ReturnType<typeof reducers>
