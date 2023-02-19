import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../reducers";

type Props = {};

export const SideBar = (props: Props) => {
    let location = useLocation();
    const getPathname = (pathname: string): number => {
        switch (pathname) {
            case "/categories":
                return 2;
            case "/":
                return 1;
            case "/add-product":
                return 1;
            default:
                return 0;
        }
    };
    const [sideActive, setSideActive] = useState(getPathname(location.pathname));
    const state = useSelector((state: RootState) => state.sideBarReducer);
    const navigate = useNavigate();

    return (
        <>
            <div
                className={`sidebar min-h-screen ${!state ? "w-[3.35rem]" : "w-56"} overflow-hidden border-r hover:w-56 hover:bg-white ease-in-out duration-300 fixed z-10 bg-white`}
                style={{ boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)" }}
            >
                <div className="flex h-screen flex-col justify-between pt-2 pb-6">
                    <div>
                        <div className="w-max p-2.5">
                            <img src="https://tailus.io/images/logo.svg" className="w-32" alt="" />
                        </div>
                        <ul className="mt-4 space-y-2 tracking-wide">
                            {/* <li className="min-w-max">
                                <a
                                    onClick={() => {
                                        setSideActive(0);
                                        navigate("/");
                                    }}
                                    aria-label="dashboard"
                                    className={`cursor-pointer relative flex items-center space-x-4 px-4 py-4 text-white ${sideActive === 0 ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
                                >
                                    <svg
                                        className="h-6 w-6 group-hover:fill-cyan-600"
                                        fill="none"
                                        stroke={`${sideActive === 0 ? "#fff" : "rgb(75 85 99 / var(--tw-text-opacity))"}`}
                                        stroke-width="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        ></path>
                                    </svg>
                                    <span className={`-mr-1 ${sideActive === 0 ? "font-medium" : " text-gray-600 hover:text-cyan-600"}`}>Dashboard</span>
                                </a>
                            </li> */}
                            <li className="min-w-max">
                                <a
                                    onClick={() => {
                                        setSideActive(1);
                                        navigate("/");
                                    }}
                                    className={`cursor-pointer bg group flex items-center space-x-4  px-4 py-4 text-gray-600 ${sideActive === 1 ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
                                >
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className={`h-6 w-6 ${sideActive === 1 ? "font-medium text-white" : " text-gray-600 group-hover:text-cyan-600"}`}
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                        ></path>
                                    </svg>
                                    <span className={`${sideActive === 1 ? "font-medium text-white" : " text-gray-600 group-hover:text-cyan-600"}`}>Products</span>
                                </a>
                            </li>
                            <li className="min-w-max">
                                <a
                                    onClick={() => {
                                        setSideActive(2);
                                        navigate("/categories");
                                    }}
                                    className={`cursor-pointer bg group flex items-center space-x-4  px-4 py-4 text-gray-600 ${sideActive === 2 ? "bg-gradient-to-r from-sky-600 to-cyan-400" : ""}`}
                                >
                                    <svg
                                        fill="none"
                                        className={`h-6 w-6 ${sideActive === 2 ? "font-medium text-white" : " text-gray-600 group-hover:text-cyan-600"}`}
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                                        ></path>
                                    </svg>
                                    {/* <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        stroke-width="1.5"
                                        className={`h-6 w-6 ${sideActive === 1 ? "font-medium text-white" : " text-gray-600 group-hover:text-cyan-600"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clip-rule="evenodd"
                                            fill-rule="evenodd"
                                            d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                                        ></path>
                                    </svg> */}
                                    <span className={`${sideActive === 2 ? "font-medium text-white" : " text-gray-600 group-hover:text-cyan-600"}`}>Categories</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-max -mb-3">
                        <a href="#" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:fill-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span className="group-hover:text-gray-700">Settings</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
