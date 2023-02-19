import { useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductsError, getAllProductsPending, getAllProductsSuccess, hanldePagingProductsList, openModalDeleteProduct, openModalUpdateProduct } from "../actions";
import { TypeDeleteModal } from "../actions/types";
import { IProduct } from "../common/type";
import { DeleteModal } from "../components/modal/DeleteModal";
import { UpdateProductModal } from "../components/modal/UpdateProductModal";
import { notify } from "../components/toast/ToastCustom";
import { RootState } from "../reducers";
import { getAllProducts } from "../services/productServices";

type Props = {};

const ProductsPage = (props: Props) => {
    const productState = useSelector((state: RootState) => state.productReducer);
    const modalState = useSelector((state: RootState) => state.modalReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pageIndex = 1;
    const pageLimit = 5;
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

    useEffect(() => {
        if (productState.products?.length === 0) {
            fetchProducts(pageIndex);
        }
        return () => {};
    }, []);

    return (
        <div>
            <section className="antialiased bg-gray-100 text-gray-600 pr-4 pt-20 pb-10 overflow-auto">
                <div className="flex flex-col  h-full">
                    <div className="pb-8 pt-4 pl-2 font-bold text-2xl">
                        <span>List of products</span>
                    </div>
                    <div className="w-full  mx-auto bg-white shadow-lg rounded-lg border border-gray-200 " style={{}}>
                        <header className="px-5 py-4 border-b border-gray-100 flex-row flex items-center justify-between">
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus-visible:border-blue-500 outline-none"
                                    placeholder="Search for items"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        navigate("/add-product");
                                    }}
                                    className="bg-gradient-to-r from-sky-600 to-cyan-400 py-3 px-4 rounded-lg text-white flex items-center shadow-xl font-medium "
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        className="h-5 w-5 mr-2 fill-white "
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                                    </svg>
                                    New Product
                                </button>
                            </div>
                        </header>
                        <div className=" ">
                            <div className="overflow-x-auto p-3 ">
                                <table className="table-auto w-full relative">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">No</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Name</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Category</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Price</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Stock</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Status</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Action</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <div
                                        className="flex items-center justify-center absolute ease-in-out duration-100 left-0 right-0 bottom-0 top-0 bg-white"
                                        style={{ display: productState.pending ? "flex" : "none" }}
                                    >
                                        <ReactLoading type={"spin"} color={"#0284c7"} height={50} width={50} />
                                    </div>
                                    {!productState.products && (
                                        <div className="flex items-center justify-center absolute ease-in-out duration-100 left-0 right-0 bottom-0 top-0 bg-white">
                                            <span className="font-semibold text-xl">Not Found!</span>
                                        </div>
                                    )}
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {productState.products && productState.products.length > 0 ? (
                                            [...productState.products].map((data: IProduct, index) => {
                                                return (
                                                    <tr className="hover:bg-slate-50" key={index}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left font-medium ">{productState.limit * productState.page - productState.limit + index + 1}</div>
                                                        </td>
                                                        <td className="px-2 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                {/* <div className="w-16 h-16 flex-shrink-0 mr-2 sm:mr-3">
                                                                <img className="rounded-full w-full h-full object-cover" src={data.image} alt="Alex Shatov" />
                                                            </div> */}
                                                                <div className="w-20 h-20 flex-shrink-0 mr-2 sm:mr-3">
                                                                    <img className="rounded-full" src={data.image} width="70" height="70" alt="Alex Shatov" />
                                                                </div>

                                                                <div className="font-medium text-gray-800">{data.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left font-medium ">{data.category ? data.category.name : "..."}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="font-medium text-center">${data.price}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{data.quantity}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className={`text-left ${data.status ? "text-green-500" : "text-red-500"}`}>{data.status ? "Active" : "Inactive"}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="flex gap-2">
                                                                <svg
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    className="h-6 w-6 cursor-pointer"
                                                                    stroke-width="1.5"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    aria-hidden="true"
                                                                    onClick={() => {
                                                                        dispatch(openModalUpdateProduct(true, data));
                                                                    }}
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                                    ></path>
                                                                </svg>

                                                                {modalState.openModalUpdate ? <UpdateProductModal /> : null}
                                                                <svg
                                                                    fill="none"
                                                                    stroke="red"
                                                                    className="h-6 w-6 cursor-pointer "
                                                                    stroke-width="1.5"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    aria-hidden="true"
                                                                    onClick={() => {
                                                                        dispatch(openModalDeleteProduct(true, data));
                                                                    }}
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                    ></path>
                                                                </svg>
                                                                {modalState.openModalDelete ? <DeleteModal type={TypeDeleteModal.product} data={data} /> : null}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <div style={{ minHeight: 250 }}></div>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex justify-end mt-5">
                                    <nav aria-label="Page navigation example">
                                        <ul className="flex list-style-none gap-1">
                                            <li className={`page-item ${productState.page === 1 ? "disabled" : ""}`}>
                                                <span
                                                    className={`page-link relative block py-1.5 px-3 cursor-pointer border-0 bg-transparent outline-none transition-all duration-300 ${
                                                        productState.page === 1
                                                            ? "text-gray-500 pointer-events-none focus:shadow-none"
                                                            : "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                    }`}
                                                >
                                                    Previous
                                                </span>
                                            </li>
                                            {Array(productState.total)
                                                .fill(null)
                                                .map((_, i) => i + 1)
                                                .map((index: number) => {
                                                    return (
                                                        <li
                                                            className="page-item"
                                                            key={index}
                                                            onClick={() => {
                                                                if (productState.page !== index) {
                                                                    fetchProducts(index);
                                                                }
                                                            }}
                                                        >
                                                            <span
                                                                className={`page-link relative block py-1.5 px-3 cursor-pointer rounded-lg border-0 duration-200 transition-all ${
                                                                    productState.page === index
                                                                        ? "bg-gradient-to-r from-sky-600 to-cyan-400 outline-none text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                                                                        : "bg-transparent outline-none  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                                                }`}
                                                            >
                                                                {index}
                                                            </span>
                                                        </li>
                                                    );
                                                })}

                                            <li className="page-item">
                                                <span className="page-link relative block py-1.5 px-3 cursor-pointer rounded-lg border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                                                    Next
                                                </span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
