import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RootState } from "../reducers";
import { useEffect } from "react";

export const DefaultLayout = () => {
    const authState = useSelector((state: RootState) => state.authReducer);

    // useEffect(() => {
    //     console.log("Default");
    //     if (authState.isLogin) {
    //         <Navigate to="/" />;
    //     }

    //     return () => {};
    // }, [authState.isLogin]);
    if (authState.isLogin) {
        return <Navigate to="/" />;
    }
    return <LoginPage />;
};
