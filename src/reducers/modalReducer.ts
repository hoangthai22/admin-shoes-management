import { ActionType } from "../actions/types";
import { ICategory, IProduct } from "../common/type";

interface IModalReducer {
    pending: boolean,
    product: IProduct,
    category: ICategory,
    openModalDelete: boolean,
    openModalUpdate: boolean,
    openModalAddNew: boolean,
    error: any
}

const initialState: IModalReducer = {
    pending: false,
    product: { _id: "", image: "", name: "", price: 0, quantity: 0, status: true, category: { _id: "", name: "", status: true } },
    category: { _id: "", name: "", status: true },
    error: null,
    openModalDelete: false,
    openModalUpdate: false,
    openModalAddNew: false,
};
const modalReducer = (state: IModalReducer = initialState, action: any): IModalReducer => {
    switch (action.type) {
        case ActionType.OPEN_MODAL_DELETE_PRODUCT:
            return {
                ...state,
                openModalDelete: action.payload.open,
                product: action.payload.product
            }
        case ActionType.OPEN_MODAL_DELETE_CATEGORY:
            return {
                ...state,
                openModalDelete: action.payload.open,
                category: action.payload.category
            }
        case ActionType.OPEN_MODAL_UPDATE_PRODUCT:
            return {
                ...state,
                openModalUpdate: action.payload.open,
                product: action.payload.product
            }
        case ActionType.OPEN_MODAL_UPDATE_CATEGORY:
            return {
                ...state,
                openModalUpdate: action.payload.open,
                category: action.payload.category
            }
        case ActionType.OPEN_MODAL_ADD_NEW_CATEGORY:
            return {
                ...state,
                openModalAddNew: action.payload,
            }
        default:
            return state
    }
}
// export const getProducts = (state: ImodalReducer) => state.products;
// export const getProductsPending = (state: ImodalReducer) => state.pending;
// export const getProductsError = (state: ImodalReducer) => state.error;

export default modalReducer