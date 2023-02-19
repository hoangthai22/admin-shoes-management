import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from "yup";
import {
    getAllCategoriesError,
    getAllCategoriesPending,
    getAllCategoriesSuccess,
    getAllProductsError,
    getAllProductsPending,
    getAllProductsSuccess,
    hanldePagingProductsList,
    openModalUpdateProduct,
    updateProductError,
    updateProductPending,
    updateProductSuccess,
} from "../../actions";
import { IProduct, Option } from "../../common/type";
import { ValuesFormData } from "../../pages/NewProductPage";
import { RootState } from "../../reducers";
import { getAllCategories } from "../../services/categoryServices";
import { getAllProducts, updateProduct } from "../../services/productServices";
import { notify } from "../toast/ToastCustom";
type Props = {
    data: IProduct;
};
export const UpdateProductModal = () => {
    const [categoriesList, setCategoriesList] = useState<Option[]>([]);
    const dispatch = useDispatch();
    const pageLimit = 5;
    const [preview, setPreview] = useState("");
    const productState = useSelector((state: RootState) => state.productReducer);
    const categoryState = useSelector((state: RootState) => state.categoryReducer);
    const modalState = useSelector((state: RootState) => state.modalReducer);
    function fetchProducts(pageNext: number) {
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
    const handleConfirm = (values: ValuesFormData, id: string) => {
        let { image } = values;
        const formData = new FormData();
        formData.append("name", values.productName);
        formData.append("price", values.price.toString());
        formData.append("quantity", values.quantity.toString());
        formData.append("categoryId", values.category !== null ? values.category.value : "");
        dispatch(updateProductPending());
        if (image !== null) {
            formData.append("image", values.image || new File([], ""), values.image?.name || "");
        }
        updateProduct(id, formData)
            .then((res: any) => {
                const data: IProduct = res.product;
                if (data) {
                    fetchProducts(productState.page);
                    dispatch(updateProductSuccess(data));
                    dispatch(openModalUpdateProduct(false, modalState.product));
                    notify("Successfully updated product!", "Success");
                } else {
                    dispatch(updateProductError(data));
                }
            })
            .catch((error) => {
                notify("Oops something went wrong!", "Error");
                dispatch(updateProductError(error));
            });
    };
    function fetchCategories() {
        dispatch(getAllCategoriesPending());
        getAllCategories(1, 99)
            .then((res: any) => {
                const data = res.categories;
                let categories: Option[] = data.map((i: any) => {
                    return { label: i.name, value: i._id };
                });
                setCategoriesList(categories);
                dispatch(getAllCategoriesSuccess(data, 99, 1, 99));
            })
            .catch((error) => {
                dispatch(getAllCategoriesError(error));
            });
    }
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: "red",
        }),
    };
    const SelectField = (props: any) => {
        const [field, state, { setValue, setTouched }] = useField(props.field.name);
        const onChange = ({ value, label }: any) => {
            setValue({ label: label || "", value: value || "" });
        };
        return <Select {...props} maxMenuHeight={200} onChange={onChange} value={field.value} onBlur={setTouched} options={categoriesList} styles={state.error && state.touched ? customStyles : ""} />;
    };

    useEffect(() => {
        if (categoryState.categories.length === 0) {
            fetchCategories();
        } else {
            let categories: Option[] = categoryState.categories.map((i: any) => {
                return { label: i.name, value: i._id };
            });
            setCategoriesList(categories);
        }
        setPreview(modalState.product.image);
        return () => {};
    }, []);

    const initialValues: ValuesFormData = {
        productName: modalState.product.name,
        price: modalState.product.price,
        quantity: modalState.product.quantity,
        category: { value: modalState.product.category._id, label: modalState.product.category.name },
        image: null,
    };
    function validationSchema() {
        return Yup.object().shape({
            productName: Yup.string().required("Product name is required"),
            price: Yup.number().required("Price is required"),
            image: Yup.mixed().nullable(),
            quantity: Yup.number().required("Quantity is required"),
            category: Yup.object()
                .shape({
                    label: Yup.string().required("Category is required"),
                    value: Yup.string().required("Category is required"),
                })
                .nullable()
                .required("Category is required"),
        });
    }

    function onSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
        let img = e.target.files || [];
        let url = URL.createObjectURL(img[0]) || "";
        setPreview(url);
    }
    return (
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-20"
                onClick={() => {
                    dispatch(openModalUpdateProduct(false, modalState.product));
                }}
            ></div>
            <div className="flex items-center min-h-screen">
                <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 flex gap-2">
                        <div className=" text-center sm:ml-4 sm:text-left flex-1">
                            <h4 className="text-lg font-medium text-gray-800">Product Detail</h4>
                            <div className="flex justify-between w-full">
                                <form action="#" method="POST" className="w-full">
                                    <div className=" sm:rounded-md sm:overflow-hidden">
                                        <div className=" p-6 rounded-lg  bg-white flex flex-col">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={validationSchema}
                                                onSubmit={(values, actions) => {
                                                    if (values.image === null && preview === "") {
                                                        actions.setErrors({ image: "Image is required" });
                                                    } else {
                                                        handleConfirm(values, modalState.product._id);
                                                    }
                                                }}
                                            >
                                                {({ errors, touched, resetForm, submitForm, setFieldValue }) => (
                                                    <Form className="flex flex-col" id="my-form">
                                                        <div className="flex gap-12">
                                                            <div className=" bg-white flex-1 ">
                                                                <div className="relative">
                                                                    <label className="block  font-medium text-gray-700">
                                                                        Image <span className="text-red-500">*</span>
                                                                    </label>
                                                                    <div
                                                                        className={
                                                                            (errors.image && touched.image ? "border-red-500 " : "border-gray-300 ") +
                                                                            "mt-1 flex justify-center items-center px-6 py-6 border-2  border-dashed rounded-md"
                                                                        }
                                                                        style={{ width: 250, height: 250 }}
                                                                    >
                                                                        {preview !== "" ? (
                                                                            <div className="">
                                                                                <img src={preview} alt="" />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="space-y-1 text-center">
                                                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                                                    <path
                                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                        stroke-width="2"
                                                                                        stroke-linecap="round"
                                                                                        stroke-linejoin="round"
                                                                                    />
                                                                                </svg>
                                                                                <div className="flex text-sm text-gray-600">
                                                                                    <label
                                                                                        htmlFor="file-upload"
                                                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                                    >
                                                                                        <span>Upload a file</span>
                                                                                        <Field
                                                                                            id="file-upload"
                                                                                            name="image"
                                                                                            type="file"
                                                                                            onChange={(e: any) => {
                                                                                                let img = e.target.files || [];

                                                                                                setFieldValue("image", img[0]);
                                                                                                onSelectImage(e);
                                                                                            }}
                                                                                            className={
                                                                                                "sr-only " + (errors.image && touched.image && preview === "" ? " border-red-500" : " border-gray-300")
                                                                                            }
                                                                                        />
                                                                                    </label>
                                                                                    <p className="pl-1">or drag and drop</p>
                                                                                </div>
                                                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                                            </div>
                                                                        )}
                                                                        {preview !== "" && (
                                                                            <div
                                                                                onClick={() => {
                                                                                    setFieldValue("image", null);
                                                                                    setPreview("");
                                                                                }}
                                                                                className="absolute right-14 top-8 rounded-full border-stone-400 border-2"
                                                                            >
                                                                                <svg
                                                                                    fill="none"
                                                                                    className="h-6 w-6 cursor-pointer"
                                                                                    stroke="rgb(120,120,120)"
                                                                                    stroke-width="1.5"
                                                                                    viewBox="0 0 24 24"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    aria-hidden="true"
                                                                                >
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                                                </svg>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <ErrorMessage name="image" component="div" className=" mt-2 text-xs text-red-500" />
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="flex gap-10">
                                                                    <div className="form-group mb-6 flex-1">
                                                                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 font-medium text-gray-700">
                                                                            Name <span className="text-red-500">*</span>
                                                                        </label>
                                                                        <div className="h-20">
                                                                            <Field
                                                                                name="productName"
                                                                                type="text"
                                                                                className={
                                                                                    "form-control block w-full px-3 py-1.5 text-base font-normal ext-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form-control " +
                                                                                    (errors.productName && touched.productName ? " border-red-500" : " border-gray-300")
                                                                                }
                                                                            />
                                                                            <ErrorMessage name="productName" component="div" className=" mt-1 text-xs text-red-500 " />
                                                                        </div>

                                                                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 font-medium text-gray-700">
                                                                            Price <span className="text-red-500">*</span>
                                                                        </label>
                                                                        <div className="h-20">
                                                                            <Field
                                                                                name="price"
                                                                                type="number"
                                                                                className={
                                                                                    "form-control block w-full px-3 py-1.5 text-base font-normal ext-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form-control " +
                                                                                    (errors.price && touched.price ? " border-red-500" : " border-gray-300")
                                                                                }
                                                                            />
                                                                            <ErrorMessage name="price" component="div" className="block mt-1 text-xs text-red-500" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group mb-6 flex-1">
                                                                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 font-medium text-gray-700">
                                                                            Category <span className="text-red-500">*</span>
                                                                        </label>
                                                                        <div className="h-20">
                                                                            <Field
                                                                                name="category"
                                                                                type="text"
                                                                                component={SelectField}
                                                                                className={errors.category && touched.category ? " border-red-500" : " border-gray-300"}
                                                                            />

                                                                            <ErrorMessage name="categoryId" component="div" className="block mt-1 text-xs text-red-500" />
                                                                        </div>
                                                                        <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 font-medium text-gray-700">
                                                                            Quanity <span className="text-red-500">*</span>
                                                                        </label>
                                                                        <div className="h-20">
                                                                            <Field
                                                                                name="quantity"
                                                                                type="number"
                                                                                className={
                                                                                    "form-control block w-full px-3 py-1.5 text-base font-normal ext-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form-control " +
                                                                                    (errors.quantity && touched.quantity ? " border-red-500" : " border-gray-300")
                                                                                }
                                                                            />
                                                                            <ErrorMessage name="quantity" component="div" className="block mt-1 text-xs text-red-500" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex justify-end">
                                                                    <div className="flex gap-4 w-3/5 justify-end items-end">
                                                                        <button
                                                                            disabled={productState.pending ? true : false}
                                                                            type="submit"
                                                                            form="my-form"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                dispatch(openModalUpdateProduct(false, modalState.product));
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
                                                                            disabled={productState.pendingModal ? true : false}
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
                                                                            {productState.pendingModal ? <ReactLoading type={"spin"} color={"#fff"} height={25} width={25} /> : "Update"}
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
