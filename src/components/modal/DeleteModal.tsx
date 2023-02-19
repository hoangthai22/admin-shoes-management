import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategoryPending,
    deleteCategorySuccess,
    deleteProductPending,
    deleteProductSuccess,
    getAllCategoriesError,
    getAllCategoriesPending,
    getAllCategoriesSuccess,
    getAllProductsError,
    getAllProductsPending,
    getAllProductsSuccess,
    hanldePagingProductsList,
    openModalDeleteCategory,
    openModalDeleteProduct,
} from "../../actions";
import { TypeDeleteModal } from "../../actions/types";
import { ICategory, IProduct } from "../../common/type";
import { RootState } from "../../reducers";
import { deleteCategory, getAllCategories } from "../../services/categoryServices";
import { deleteProduct, getAllProducts } from "../../services/productServices";
import { notify } from "../toast/ToastCustom";

type Props = {
    data: IProduct | ICategory;
    type: TypeDeleteModal;
};

export const DeleteModal = (props: Props) => {
    const dispatch = useDispatch();
    const pageLimit = 5;
    const productState = useSelector((state: RootState) => state.productReducer);
    const categoryState = useSelector((state: RootState) => state.categoryReducer);
    const modalState = useSelector((state: RootState) => state.modalReducer);
    function fetchProducts(pageNext: number, limitPage: number) {
        dispatch(getAllProductsPending());
        getAllProducts(pageNext, pageLimit)
            .then((res: any) => {
                const data = res.products;
                const limit = res.limit;
                const page = res.page;
                const total = res.total;
                dispatch(getAllProductsSuccess(data, limit, page, total));
                dispatch(hanldePagingProductsList(pageNext));
            })
            .catch((error) => {
                notify("Oops something went wrong!", "Error");
                dispatch(getAllProductsError(error));
            });
    }
    function fetchCategories(pageNext: number, limitPage: number) {
        dispatch(getAllCategoriesPending());
        getAllCategories(pageNext, limitPage)
            .then((res: any) => {
                const data = res.categories;
                const limit = res.limit;
                const page = res.page;
                const total = res.total;
                dispatch(getAllCategoriesSuccess(data, limit, page, total));
            })
            .catch((error) => {
                dispatch(getAllCategoriesError(error));
            });
    }
    const handleConfirm = (open: boolean) => {
        if (props.type === TypeDeleteModal.product) {
            dispatch(deleteProductPending());
            deleteProduct(modalState.product._id)
                .then((res: any) => {
                    console.log(res);
                    if (res.message === "Deleted") {
                        dispatch(deleteProductSuccess(modalState.product));
                        dispatch(openModalDeleteProduct(open, modalState.product));
                        fetchProducts(productState.page, productState.limit);
                        notify("Successfully deleted product!", "Success");
                    }
                })
                .catch((error) => {
                    notify("Oops something went wrong!", "Error");
                    dispatch(openModalDeleteProduct(open, modalState.product));
                });
        } else {
            dispatch(deleteCategoryPending());
            deleteCategory(modalState.category._id)
                .then((res: any) => {
                    console.log(res);
                    if (res.message === "Deleted") {
                        dispatch(deleteCategorySuccess(modalState.category));
                        dispatch(openModalDeleteCategory(open, modalState.category));
                        fetchCategories(categoryState.page, categoryState.limit);
                        notify("Successfully deleted category!", "Success");
                    }
                })
                .catch((error) => {
                    notify("Oops something went wrong!", "Error");
                    dispatch(openModalDeleteCategory(open, modalState.category));
                });
        }
    };
    return (
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-20"
                onClick={() => {
                    dispatch(openModalDeleteProduct(false, modalState.product));
                }}
            ></div>
            <div className="flex items-center min-h-screen">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 flex gap-2">
                        <div className="flex items-center justify-center  w-12 h-12  bg-red-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className=" text-center sm:ml-4 sm:text-left flex-1">
                            <h4 className="text-lg font-medium text-gray-800">Delete item ?</h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                Are you sure you want to delete <span className="font-bold">{props.type === TypeDeleteModal.product ? modalState.product.name : modalState.category.name}</span>
                            </p>
                            <div className="items-center gap-2 mt-8 sm:flex">
                                <button
                                    disabled={(props.type === TypeDeleteModal.product ? productState.pendingModal : categoryState.pendingModal) ? true : false}
                                    className="w-full flex flex-1 justify-center items-center h-10 px-6 py-2.5 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                    onClick={() => {
                                        handleConfirm(false);
                                    }}
                                >
                                    {(props.type === TypeDeleteModal.product ? productState.pendingModal : categoryState.pendingModal) ? (
                                        <ReactLoading type={"spin"} color={"#fff"} height={25} width={25} />
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                                <button
                                    className="w-full h-10 px-6 py-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={() => dispatch(openModalDeleteProduct(false, modalState.product))}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
