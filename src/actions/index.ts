import { ICategoriesList, ICategory, IProduct, IProductsList, IUser } from "../common/type";
import { ActionType } from "./types";

export const sideBar = (sideBar: boolean) => {
    return {
        type: ActionType.OPEN_SIDEBAR,
        payload: sideBar
    };
}
//------- Get all products---------//
export const getAllProductsPending = () => {
    return {
        type: ActionType.FETCH_GETALL_PRODUCT_PENDING,
    };
}
export const getAllProductsSuccess = (products: IProductsList, limit: number, page: number, total: number) => {
    return {
        type: ActionType.FETCH_GETALL_PRODUCT_SUCCESS,
        payload: { products, limit, page, total }
    };
}
export const getAllProductsError = (error: any) => {
    return {
        type: ActionType.FETCH_GETALL_PRODUCT_SUCCESS,
        error: error
    };
}
//------- Add new product---------//
export const addNewProductPending = () => {
    return {
        type: ActionType.FETCH_ADD_PRODUCT_PENDING,
    };
}
export const addNewProductSuccess = (products: IProduct) => {
    return {
        type: ActionType.FETCH_ADD_PRODUCT_SUCCESS,
        payload: products
    };
}
export const addNewProductError = (error: any) => {
    return {
        type: ActionType.FETCH_ADD_PRODUCT_ERROR,
        error: error
    };
}

//------- Hanlde Paging---------//
export const hanldePagingProductsList = (pageNext: number) => {

    return {
        type: ActionType.HANLDE_PAGING_PRODUCTS,
        payload: pageNext
    };
}
//------- Hanlde Paging---------//
export const hanldePagingCategoriesList = (pageNext: number) => {

    return {
        type: ActionType.HANLDE_PAGING_CATEGORIES,
        payload: pageNext
    };
}
//------- Open Modal---------//
export const openModalDeleteProduct = (open: boolean, product: IProduct) => {

    return {
        type: ActionType.OPEN_MODAL_DELETE_PRODUCT,
        payload: { open, product }
    };
}
export const openModalDeleteCategory = (open: boolean, category: ICategory) => {

    return {
        type: ActionType.OPEN_MODAL_DELETE_CATEGORY,
        payload: { open, category }
    };
}
//------- Open Modal---------//
export const openModalUpdateProduct = (open: boolean, product: IProduct) => {

    return {
        type: ActionType.OPEN_MODAL_UPDATE_PRODUCT,
        payload: { open, product }
    };
}
//------- Open Modal---------//
export const openModalUpdateCategory = (open: boolean, category: ICategory) => {

    return {
        type: ActionType.OPEN_MODAL_UPDATE_CATEGORY,
        payload: { open, category }
    };
}

//------- Open Modal---------//
export const openModalAddNewCategory = (open: boolean) => {

    return {
        type: ActionType.OPEN_MODAL_ADD_NEW_CATEGORY,
        payload: open
    };
}

//------- Delete new product---------//
export const deleteProductPending = () => {
    return {
        type: ActionType.FETCH_DELETE_PRODUCT_PENDING,
    };
}
export const deleteProductSuccess = (products: IProduct) => {
    return {
        type: ActionType.FETCH_DELETE_PRODUCT_SUCCESS,
        payload: products
    };
}
export const deleteProductError = (error: any) => {
    return {
        type: ActionType.FETCH_DELETE_PRODUCT_ERROR,
        error: error
    };
}
//------- Update new product---------//
export const updateProductPending = () => {
    return {
        type: ActionType.FETCH_UPDATE_PRODUCT_PENDING,
    };
}
export const updateProductSuccess = (products: IProduct) => {
    return {
        type: ActionType.FETCH_UPDATE_PRODUCT_SUCCESS,
        payload: products
    };
}
export const updateProductError = (error: any) => {
    return {
        type: ActionType.FETCH_UPDATE_PRODUCT_ERROR,
        error: error
    };
}
//------- Get all categories---------//
export const getAllCategoriesPending = () => {
    return {
        type: ActionType.FETCH_GETALL_CATEGORY_PENDING,
    };
}
export const getAllCategoriesSuccess = (categories: ICategoriesList, limit: number, page: number, total: number) => {
    return {
        type: ActionType.FETCH_GETALL_CATEGORY_SUCCESS,
        payload: { categories, limit, page, total }
    };
}
export const getAllCategoriesError = (error: any) => {
    return {
        type: ActionType.FETCH_GETALL_CATEGORY_ERROR,
        error: error
    };
}

//------- Add new category---------//
export const addNewCategoryPending = () => {
    return {
        type: ActionType.FETCH_ADD_CATEGORY_PENDING,
    };
}
export const addNewCategorySuccess = (categories: ICategory) => {
    return {
        type: ActionType.FETCH_ADD_CATEGORY_SUCCESS,
        payload: categories
    };
}
export const addNewCategoryError = (error: any) => {
    return {
        type: ActionType.FETCH_ADD_CATEGORY_ERROR,
        error: error
    };
}

//------- Add category---------//
export const updateCategoryPending = () => {
    return {
        type: ActionType.FETCH_UPDATE_CATEGORY_PENDING,
    };
}
export const updateCategorySuccess = (categories: ICategory) => {
    return {
        type: ActionType.FETCH_UPDATE_CATEGORY_SUCCESS,
        payload: categories
    };
}
export const updateCategoryError = (error: any) => {
    return {
        type: ActionType.FETCH_UPDATE_CATEGORY_ERROR,
        error: error
    };
}

//------- Delete category---------//
export const deleteCategoryPending = () => {
    return {
        type: ActionType.FETCH_DELETE_CATEGORY_PENDING,
    };
}
export const deleteCategorySuccess = (categories: ICategory) => {
    return {
        type: ActionType.FETCH_DELETE_CATEGORY_SUCCESS,
        payload: categories
    };
}
export const deleteCategoryError = (error: any) => {
    return {
        type: ActionType.FETCH_DELETE_CATEGORY_ERROR,
        error: error
    };
}
//------- Login---------//
export const loginPending = () => {
    return {
        type: ActionType.FETCH_LOGIN_PENDING,
    };
}
export const loginSuccess = (user: IUser) => {
    return {
        type: ActionType.FETCH_LOGIN_SUCCESS,
        payload: user
    };
}
export const loginError = (error: any) => {
    return {
        type: ActionType.FETCH_LOGIN_ERROR,
        error: error
    };
}
//------- Check Login---------//
export const checkLoginPending = () => {
    return {
        type: ActionType.FETCH_CHECK_LOGIN_PENDING,
    };
}
export const checkLoginSuccess = (user: IUser) => {
    return {
        type: ActionType.FETCH_CHECK_LOGIN_SUCCESS,
        payload: user
    };
}
export const checkLoginError = (error: any) => {
    return {
        type: ActionType.FETCH_CHECK_LOGIN_ERROR,
        error: error
    };
}
//------- Logout---------//
export const logoutPending = () => {
    return {
        type: ActionType.FETCH_LOGOUT_PENDING,
    };
}
export const logoutSuccess = () => {
    return {
        type: ActionType.FETCH_LOGOUT_SUCCESS,
        payload: null
    };
}
export const logoutError = (error: any) => {
    return {
        type: ActionType.FETCH_LOGOUT_ERROR,
        error: error
    };
}