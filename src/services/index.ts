import axios, { AxiosInstance, AxiosResponse } from "axios";

// export const BASE_URL = 'http://localhost:4500';
export const BASE_URL = 'https://shoes-mongodb-express-typescript.onrender.com';
export const PRODUCT_LIST = 'products';
export const PRODUCT = 'product';
export const CATEGORIES = 'categories';
export const CATEGORY = 'category';


const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken) {
            config.headers["x-access-token"] = `${accessToken}`;
        }
        if (refreshToken) {
            config.headers["x-refresh-token"] = `${refreshToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Do something with response data
        return response;
    },
    async (error) => {
        // const navigate = useNavigate();
        // Handle 401 errors
        if (error.response.status === 401) {
            console.log({ error });

            // Refresh token is invalid or expired, prompt user to login
            if (error.response.data.message === "invalid_token" || error.response.data.message === "expired_refreshtoken" || error.response.data.message === "invalid_refreshtoken") {
                console.log("invalid_token");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.replace("/login")
            }

            // Refresh token is valid, get new access token
            if (error.response.data.message === "access_token_expired") {
                try {
                    const refreshToken = localStorage.getItem("refreshToken");
                    const { data } = await api.post("/refresh-token", { refreshToken });
                    localStorage.setItem("accessToken", data.newAccessToken);
                    error.config.headers["x-access-token"] = `${data.newAccessToken}`;
                    return api(error.config);
                } catch (e) {
                    console.error(e);
                }
            }
        }
        return Promise.reject(error);
    }
);
export function makeApiRequest(config: any) {
    return api(config);
}
export default api;