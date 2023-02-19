import { ActionType } from "../actions/types";
import { IUser } from "../common/type";

interface IAuthReducer {
    pending: boolean,
    user: IUser,
    isLogin: boolean,
    error: any
}

const initialState: IAuthReducer = {
    pending: true,
    user: { name: "", userName: "" },
    isLogin: false,
    error: null
};
const authReducer = (state: IAuthReducer = initialState, action: any): IAuthReducer => {
    switch (action.type) {
        case ActionType.FETCH_LOGIN_PENDING:
            return {
                ...state,
                pending: true,
            }
        case ActionType.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.payload,
                isLogin: true
            }
        case ActionType.FETCH_LOGIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ActionType.FETCH_CHECK_LOGIN_PENDING:
            return {
                ...state,
                pending: true,
            }
        case ActionType.FETCH_CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                user: action.payload,
                isLogin: true
            }
        case ActionType.FETCH_CHECK_LOGIN_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ActionType.FETCH_LOGOUT_PENDING:
            return {
                ...state,
                pending: true,
            }
        case ActionType.FETCH_LOGOUT_SUCCESS:
            return {
                ...state,
                pending: false,
                user: { name: "", userName: "" },
                isLogin: false
            }
        case ActionType.FETCH_LOGOUT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state
    }
}


export default authReducer