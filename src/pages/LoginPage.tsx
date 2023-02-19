import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginError, loginPending, loginSuccess } from "../actions";
import { fetchLogin } from "../services/authServices";
import { notify } from "../components/toast/ToastCustom";
import { useState } from "react";
export interface ValuesFormData {
    userName: string;
    password: string;
}
export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);
    const authstate = useSelector((state: RootState) => state.authReducer);
    const initialValues: ValuesFormData = {
        userName: "",
        password: "",
    };
    function validationSchema() {
        return Yup.object().shape({
            userName: Yup.string().required("Username is required"),
            password: Yup.string().required("password is required").min(6, "Password is too short - should be 6 chars minimum."),
        });
    }
    const hanldeSubmit = (values: ValuesFormData) => {
        const formData = new FormData();
        formData.append("userName", values.userName);
        formData.append("password", values.password);
        dispatch(loginPending());
        fetchLogin(formData)
            .then((res: any) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    dispatch(loginSuccess({ name: "admin", userName: values.userName }));
                    notify("Login successfully!", "Success");
                    navigate("/");
                } else {
                    dispatch(loginError(res.data?.message));
                    notify(res.data?.message, "Error");
                }
            })
            .catch((error) => {
                dispatch(loginError(error));
                notify(error, "Error");
                console.log({ error });
            });
    };
    return (
        <section className="h-screen bg-white">
            <div className="2xl:px-40 xl:px-20 lg:px-10 sm:px-0 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full gap-10">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-9/12 mb-12 md:mb-0">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="" />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div className="flex flex-row items-center justify-between lg:justify-between pb-4">
                                <div className="flex items-center ">
                                    <p className="text-lg mb-0 mr-4">Sign in with</p>
                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <span className="text-gray-500 ">Email: admin123 / Password: demo1234</span>
                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">Or</p>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) => {
                                    hanldeSubmit(values);
                                }}
                            >
                                {({ errors, touched, resetForm, submitForm, setFieldValue }) => (
                                    <Form className="flex flex-col" id="my-form">
                                        <div className="mb-6">
                                            <Field
                                                name="userName"
                                                type="text"
                                                className={
                                                    "form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none " +
                                                    (errors.userName && touched.userName ? " border-red-500" : " border-gray-300")
                                                }
                                                placeholder="Username"
                                            />
                                            <ErrorMessage name="userName" component="div" className="block mt-1 text-xs text-red-500" />
                                        </div>

                                        <div className="mb-6">
                                            <div className="relative">
                                                <Field
                                                    name="password"
                                                    type={showPass ? "text" : "password"}
                                                    className={
                                                        "form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none " +
                                                        (errors.password && touched.password ? " border-red-500" : " border-gray-300")
                                                    }
                                                    placeholder="Password"
                                                />
                                                {!showPass ? (
                                                    <svg
                                                        onClick={() => {
                                                            setShowPass(true);
                                                        }}
                                                        className="h-5 text-gray-700 absolute right-3 cursor-pointer top-[calc(50%-10px)]"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 576 512"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        onClick={() => {
                                                            setShowPass(false);
                                                        }}
                                                        className="h-5 text-gray-700 absolute right-3 cursor-pointer top-[calc(50%-10px)]"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 640 512"
                                                    >
                                                        <path
                                                            fill="currentColor"
                                                            d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                                                        ></path>
                                                    </svg>
                                                )}
                                            </div>
                                            <ErrorMessage name="password" component="div" className="block mt-1 text-xs text-red-500" />
                                        </div>

                                        <div className="flex justify-between items-center mb-6">
                                            <div className="form-group form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-600 checked:border-sky-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                    id="exampleCheck2"
                                                />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">
                                                    Remember me
                                                </label>
                                            </div>
                                            <a href="#!" className="text-gray-800 hover:text-sky-600">
                                                Forgot password?
                                            </a>
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    submitForm();
                                                }}
                                                disabled={authstate.pending ? true : false}
                                                type="button"
                                                className=" px-7 py-3 h-12 flex items-center justify-center bg-sky-600 w-28 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >
                                                {authstate.pending ? <ReactLoading type={"spin"} color={"#fff"} height={25} width={25} /> : "Login"}
                                            </button>
                                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                                Don't have an account?
                                                <a href="#!" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-2">
                                                    Register
                                                </a>
                                            </p>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
