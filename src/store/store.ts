import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import { reducers } from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];
export const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
)