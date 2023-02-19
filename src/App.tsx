import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { checkLoginError, checkLoginPending, checkLoginSuccess } from "./actions";
import "./App.css";
import ReactLoading from "react-loading";
import { AdminLayout } from "./layouts/AdminLayout";
import { RootState } from "./reducers";
import { privateRoutes, publicRoutes } from "./routes";
import { fetchCheckLogin } from "./services/authServices";
import Dashboard from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            dispatch(checkLoginPending());
            fetchCheckLogin()
                .then((res: any) => {
                    dispatch(checkLoginSuccess({ name: res.data?.name, userName: res.data.userName }));
                })
                .catch((error) => {
                    dispatch(checkLoginSuccess(error));
                });
        } else {
            navigate("/login");
            setTimeout(() => {
                dispatch(checkLoginError(null));
            }, 500);
        }
        return () => {};
    }, []);

    return (
        <div className="App">
            <div className="min-h-screen bg-gray-100 relative">
                <div
                    className="flex items-center justify-center absolute ease-in-out duration-100 left-0 right-0 bottom-0 top-0 bg-white z-50"
                    style={{ display: authState.pending ? "flex" : "none" }}
                >
                    <ReactLoading type={"spin"} color={"#0284c7"} height={50} width={50} />
                </div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page: JSX.Element = route.component;
                        return <Route key={index} path={route.path} element={Page} />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page: JSX.Element = route.component;
                        return <Route key={index} path={route.path} element={<AdminLayout component={Page} />} />;
                    })}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
