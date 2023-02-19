import { DefaultLayout } from "./layouts/DefaultLayout";
import CategoriesPage from "./pages/CategoriesPage";
import Dashboard from "./pages/DashboardPage";
import NewProductPage from "./pages/NewProductPage";
import ProductsPage from "./pages/ProductsPage";

interface IRoute {
    path: string;
    component: JSX.Element;
}

const publicRoutes: IRoute[] = [{ path: "/login", component: <DefaultLayout /> }];
const privateRoutes: IRoute[] = [
    // { path: "/", component: <Dashboard /> },
    { path: "/", component: <ProductsPage /> },
    { path: "/categories", component: <CategoriesPage /> },
    { path: "/add-product", component: <NewProductPage /> },
];

export { publicRoutes, privateRoutes };
