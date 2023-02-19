import { ActionType } from "../actions/types";
import { ICategoriesList } from "../common/type";

interface ICategoryReducer {
    pending: boolean,
    pendingModal: boolean,
    categories: ICategoriesList,
    limit: number,
    page: number,
    total: number,
    error: any
}

const initialState: ICategoryReducer = {
    pending: false,
    pendingModal: false,
    categories: [],
    limit: 10,
    page: 1,
    total: 0,
    error: null
};
const categoryReducer = (state: ICategoryReducer = initialState, action: any): ICategoryReducer => {
    switch (action.type) {
        case ActionType.FETCH_GETALL_CATEGORY_PENDING:
            return {
                ...state,
                pending: true
            };
        case ActionType.FETCH_GETALL_CATEGORY_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload.categories,
                limit: action.payload.limit,
                page: action.payload.page,
                total: action.payload.total,
            }
        case ActionType.FETCH_GETALL_CATEGORY_ERROR:
            return {
                ...state,
                categories: [],
                pending: false,
                error: action.error
            }
        case ActionType.FETCH_ADD_CATEGORY_PENDING:
            return {
                ...state,
                pendingModal: true
            };
        case ActionType.FETCH_ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                pendingModal: false,

            }
        case ActionType.FETCH_ADD_CATEGORY_ERROR:
            return {
                ...state,
                pendingModal: false,
                error: action.error
            }
        case ActionType.FETCH_UPDATE_CATEGORY_PENDING:
            return {
                ...state,
                pendingModal: true
            };
        case ActionType.FETCH_UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                pendingModal: false,

            }
        case ActionType.FETCH_UPDATE_CATEGORY_ERROR:
            return {
                ...state,
                pendingModal: false,
                error: action.error
            }
        case ActionType.FETCH_DELETE_CATEGORY_PENDING:
            return {
                ...state,
                pendingModal: true
            };
        case ActionType.FETCH_DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                pendingModal: false,

            }
        case ActionType.FETCH_DELETE_CATEGORY_ERROR:
            return {
                ...state,
                pendingModal: false,
                error: action.error
            }
        default:
            return state
    }
}


export default categoryReducer