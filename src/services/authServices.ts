import axios from "axios";
import { makeApiRequest } from ".";

export const fetchLogin = async (formData: FormData) => {
    try {
        const data = await makeApiRequest({
            method: 'post',
            url: `/login`,
            data: formData
        });
        console.log({ data });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.response);
            return error.response;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}
export const fetchCheckLogin = async () => {
    try {
        const data = await makeApiRequest({
            method: 'post',
            url: `/checklogin`,
        });
        console.log({ data });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.response);
            return error.response;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}
export const fetchLogout = async () => {
    try {
        const data = await makeApiRequest({
            method: 'post',
            url: `/logout`,
        });

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.response);
            return error.response;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}