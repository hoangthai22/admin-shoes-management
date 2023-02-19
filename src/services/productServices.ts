import axios from "axios";
import { BASE_URL, makeApiRequest, PRODUCT, PRODUCT_LIST } from ".";
import { notify } from "../components/toast/ToastCustom";
import { ValuesFormData } from "../pages/NewProductPage";


export const addNewProduct = async (formData: FormData) => {
    try {
        const { data } = await makeApiRequest({
            method: 'post',
            url: `${PRODUCT}`,
            data: formData
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            notify(error.message, "Error");
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export const getAllProducts = async (page: number, limit: number) => {
    try {
        const { data } = await makeApiRequest({
            method: 'get',
            url: `${PRODUCT_LIST}?page=${page}&limit=${limit}`,
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            notify(error.message, "Error");
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
export const deleteProduct = async (id: string) => {
    try {
        const { data } = await makeApiRequest({
            method: 'delete',
            url: `${PRODUCT}/${id}`,
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            notify(error.message, "Error");
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
export const updateProduct = async (id: string, formData: FormData) => {
    try {
        const { data, } = await axios.put<ValuesFormData>(
            `${BASE_URL}/${PRODUCT}/${id}`, formData,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            notify(error.message, "Error");
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}