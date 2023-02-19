import { ActionType, fetchProductPendingAction } from "../actions/types";
import { IProductsList } from "../common/type";

interface IProductReducer {
    pending: boolean,
    pendingModal: boolean,
    products: IProductsList,
    limit: number,
    page: number,
    total: number,
    openModal: boolean,
    error: any
}

const initialState: IProductReducer = {
    pending: false,
    pendingModal: false,
    products: [],
    limit: 10,
    page: 1,
    total: 0,
    error: null,
    openModal: false,
};
const productReducer = (state: IProductReducer = initialState, action: any): IProductReducer => {
    switch (action.type) {
        case ActionType.FETCH_GETALL_PRODUCT_PENDING:
            return {
                ...state,
                pending: true
            };
        case ActionType.FETCH_GETALL_PRODUCT_SUCCESS:
            return {
                ...state,
                pending: false,
                products: action.payload.products,
                limit: action.payload.limit,
                page: action.payload.page,
                total: action.payload.total,
            }
        case ActionType.FETCH_GETALL_PRODUCT_ERROR:
            return {
                ...state,
                pending: false,
                products: [],
                error: action.error
            }
        case ActionType.FETCH_ADD_PRODUCT_PENDING:
            return {
                ...state,
                pending: true
            };
        case ActionType.FETCH_ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                pending: false,
                // products: [action.payload, ...state.products],
            }
        case ActionType.FETCH_ADD_PRODUCT_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ActionType.FETCH_DELETE_PRODUCT_PENDING:
            return {
                ...state,
                pendingModal: true
            };
        case ActionType.FETCH_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                pendingModal: false,
                // products: [action.payload, ...state.products],
            }
        case ActionType.FETCH_DELETE_PRODUCT_ERROR:
            return {
                ...state,
                pendingModal: false,
                error: action.error
            }
        case ActionType.FETCH_UPDATE_PRODUCT_PENDING:
            return {
                ...state,
                pendingModal: true
            };
        case ActionType.FETCH_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                pendingModal: false,
                // products: [action.payload, ...state.products],
            }
        case ActionType.FETCH_UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                pendingModal: false,
                error: action.error
            }
        case ActionType.HANLDE_PAGING_PRODUCTS:
            return {
                ...state,
                page: action.payload
            }

        default:
            return state
    }
}
// export const getProducts = (state: IProductReducer) => state.products;
// export const getProductsPending = (state: IProductReducer) => state.pending;
// export const getProductsError = (state: IProductReducer) => state.error;

export default productReducer