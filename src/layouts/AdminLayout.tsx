import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../components/header/Header";
import { SideBar } from "../components/sidebar/SideBar";
import { RootState } from "../reducers";
type Props = {
    component: JSX.Element | null;
};
export const AdminLayout = (props: Props) => {
    const sideBarState = useSelector((state: RootState) => state.sideBarReducer);
    const authState = useSelector((state: RootState) => state.authReducer);

    // useEffect(() => {
    //     console.log("Admin");
    //     if (!authState.isLogin) {
    //         console.log("login");
    //         <Navigate to="/login" />;
    //     }

    //     return () => {};
    // }, [authState.isLogin]);

    if (!authState.isLogin) {
        <Navigate to="/login" />;
    }
    return (
        <>
            <header className="App-header relative z-20">
                <SideBar />
                <Header />
            </header>
            <div className="flex justify-end" style={{}}>
                <div className=" w-full ease-in-out duration-300 pl-4" style={{ width: !sideBarState ? "calc(100% - 53px)" : "calc(100% - 14rem)", height: "calc(100% - 53px)" }}>
                    {props.component}
                </div>
            </div>
            ;
        </>
    );
};
