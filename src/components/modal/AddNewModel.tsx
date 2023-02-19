import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
    addNewCategoryError,
    addNewCategoryPending,
    addNewCategorySuccess,
    getAllCategoriesError,
    getAllCategoriesPending,
    getAllCategoriesSuccess,
    getAllProductsError,
    getAllProductsPending,
    getAllProductsSuccess,
    hanldePagingProductsList,
    openModalAddNewCategory,
} from "../../actions";
import { ICategory, IProduct, Option } from "../../common/type";
import { RootState } from "../../reducers";
import { addNewCategory, getAllCategories } from "../../services/categoryServices";
import { getAllProducts } from "../../services/productServices";
import { notify } from "../toast/ToastCustom";

export interface ValuesFormData {
    name: string;
}
export const AddNewCategoryModal = () => {
    const dispatch = useDispatch();
    const categoryState = useSelector((state: RootState) => state.categoryReducer);
    const modalState = useSelector((state: RootState) => state.modalReducer);

    const handleConfirm = (values: ValuesFormData) => {
        const formData = new FormData();
        formData.append("name", values.name);
        dispatch(addNewCategoryPending());

        addNewCategory(formData)
            .then((res: any) => {
                if (typeof res === "string") {
                    notify("Oops something went wrong!", "Error");
                    dispatch(addNewCategoryError(res));
                    return;
                } else {
                    const data: ICategory = res.category;
                    if (data) {
                        fetchCategories(categoryState.page, categoryState.limit);
                        dispatch(addNewCategorySuccess(data));
                        dispatch(openModalAddNewCategory(false));
                        notify("Successfully added new product!", "Success");
                    } else {
                        dispatch(addNewCategoryError(data));
                    }
                }
            })
            .catch((error) => {
                notify("Oops something went wrong!", "Error");
                dispatch(addNewCategoryError(error));
            });
    };
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

    const initialValues: ValuesFormData = {
        name: "",
    };
    function validationSchema() {
        return Yup.object().shape({
            name: Yup.string().required("Category name is required"),
        });
    }

    return (
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-70"
                onClick={() => {
                    dispatch(openModalAddNewCategory(false));
                }}
            ></div>
            <div className="flex items-center min-h-screen">
                <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex gap-2">
                        <div className=" text-center sm:text-left flex-1">
                            <h4 className="text-lg font-medium text-gray-800">Add New Category</h4>
                            <div className="flex justify-between w-full">
                                <form action="#" method="POST" className="w-full">
                                    <div className=" sm:rounded-md sm:overflow-hidden">
                                        <div className=" pt-6 rounded-lg  bg-white flex flex-col">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, actions) => {
                                                    handleConfirm(values);
                                                }}
                                            >
                                                {({ errors, touched, resetForm, submitForm, setFieldValue }) => (
                                                    <Form className="flex flex-col" id="my-form">
                                                        <div className="flex ">
                                                            <div className="flex flex-col w-full">
                                                                <div className="flex ">
                                                                    <div className="form-group mb-6 flex-1">
                                                                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 font-medium text-gray-700">
                                                                            Name <span className="text-red-500">*</span>
                                                                        </label>
                                                                        <div>
                                                                            <Field
                                                                                name="name"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control block w-full px-3 py-1.5 text-base font-normal ext-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form-control " +
                                                                                    (errors.name && touched.name ? " border-red-500" : " border-gray-300")
                                                                                }
                                                                            />
                                                                            <ErrorMessage name="name" component="div" className=" mt-1 text-xs text-red-500 " />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex justify-end">
                                                                    <div className="flex gap-4 w-3/5 justify-end items-end">
                                                                        <button
                                                                            type="submit"
                                                                            form="my-form"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                dispatch(openModalAddNewCategory(false));
                                                                                // navigate("/products");
                                                                                // resetForm();
                                                                            }}
                                                                            className="
                                                                        flex-1 justify-center items-center h-10 px-6 py-2.5 bg-white text-sky-600 font-medium text-xs leading-tight uppercase rounded shadow-md
                                                                        hover:shadow-lg border-sky-600 
                                                                        "
                                                                            style={{ borderWidth: 1 }}
                                                                        >
                                                                            {"Close"}
                                                                        </button>
                                                                        <button
                                                                            disabled={categoryState.pendingModal ? true : false}
                                                                            type="submit"
                                                                            form="my-form"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();

                                                                                submitForm();
                                                                                // resetForm();
                                                                            }}
                                                                            className="
                                                                        flex flex-1 justify-center items-center h-10 px-6 py-2.5
                                                                        bg-gradient-to-r from-sky-600 to-cyan-400
                                                                        text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                                                                        hover:bg-sky-600 hover:shadow-lg
                                                                        focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0
                                                                        active:bg-sky-600 active:shadow-lg transition duration-150 ease-in-out"
                                                                        >
                                                                            {categoryState.pendingModal ? <ReactLoading type={"spin"} color={"#fff"} height={25} width={25} /> : "Update"}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
