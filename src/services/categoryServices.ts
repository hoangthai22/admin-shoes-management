import axios from "axios";
import { CATEGORIES, CATEGORY, makeApiRequest } from ".";
import { notify } from "../components/toast/ToastCustom";

export const addNewCategory = async (formData: FormData) => {
    try {
        const { data } = await makeApiRequest({
            method: 'post',
            url: `${CATEGORY}`,
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
export const deleteCategory = async (id: string) => {
    try {
        const { data } = await makeApiRequest({
            method: 'delete',
            url: `${CATEGORY}/${id}`,
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
export const updateCategory = async (id: string, formData: FormData) => {
    try {
        const { data } = await makeApiRequest({
            method: 'put',
            url: `${CATEGORY}/${id}`,
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



export const getAllCategories = async (page: number, limit: number) => {
    try {
        const { data } = await makeApiRequest({
            method: 'get',
            url: `${CATEGORIES}?page=${page}&limit=${limit}`,
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}
