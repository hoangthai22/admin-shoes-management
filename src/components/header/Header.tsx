import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { bindActionCreators } from "redux";
import { logoutError, logoutPending, logoutSuccess, sideBar } from "../../actions/index";
import { useNavigate } from "react-router-dom";
import { fetchLogout } from "../../services/authServices";
import { notify } from "../toast/ToastCustom";
// import { actionCreators } from "../../store";
type Props = {};

const Header = (props: Props) => {
    const [open, setOpen] = useState(false);
    const state = useSelector((state: RootState) => state.sideBarReducer);
    const authState = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hanldeLogout = () => {
        dispatch(logoutPending());
        fetchLogout()
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(logoutSuccess());
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate("/login");
                } else {
                    notify("Oops something went wrong!", "Error");
                    dispatch(logoutError(res.message));
                }
            })
            .catch((error) => {
                notify("Oops something went wrong!", "Error");
                dispatch(logoutError(error));
            });
    };
    return (
        <nav
            className=" bg-white flex fixed justify-between items-center mx-auto px-8 h-16 right-0 ease-in-out duration-300"
            style={{
                boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
                width: !state ? "calc(100% - 53px)" : "calc(100% - 14rem)",
            }}
            tabIndex={0}
            onBlur={() => {
                setOpen(false);
            }}
        >
            <div className="block flex-grow-0 flex-shrink-0 h-10 w-10 py-1">
                <svg
                    onClick={() => {
                        dispatch(sideBar(!state));
                    }}
                    fill="none"
                    stroke="currentColor"
                    className="w-7 h-7 cursor-pointer"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    {!state ? (
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"></path>
                    ) : (
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                    )}
                </svg>
            </div>

            <div className="flex-initial">
                <div className="flex justify-end items-center relative">
                    <div className="  flex justify-center items-center ">
                        <div className=" w-64 flex justify-end items-center mr-3">
                            <div onClick={() => setOpen(!open)} className={`relative border-b-4 border-transparent ${open ? "transform transition duration-300" : ""}`}>
                                <div className="flex justify-center items-center space-x-3 cursor-pointer">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
                                        <img
                                            src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="font-semibold dark:text-white text-gray-900 text-base">
                                        <div className="cursor-pointer">{authState.user.userName}</div>
                                    </div>
                                </div>
                                {open && (
                                    <div className="absolute px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-3">
                                        <ul className="space-y-3 dark:text-white">
                                            <li className=" text-base cursor-pointer">
                                                <span className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:text-sky-600">
                                                    <div className="mr-4">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.5"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    Account
                                                </span>
                                            </li>
                                            <li
                                                className=" py-2 cursor-pointer"
                                                onClick={() => {
                                                    hanldeLogout();
                                                }}
                                            >
                                                <span className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:text-sky-600">
                                                    <div className="mr-4">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="1.5"
                                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    Logout
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
