
import { ActionType, sideBarAction } from "../actions/types";

const initialState: boolean = true;
const sideBarReducer = (state: boolean = initialState, action: sideBarAction): boolean => {
    switch (action.type) {
        case ActionType.OPEN_SIDEBAR:
            return state = action.payload;
        default:
            return state
    }
}

export default sideBarReducer