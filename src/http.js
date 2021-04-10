import axios from 'axios';

export const BaseUrl = "https://tradedepottest.herokuapp.com/dev/v1"

export const signIn = async (payload) => axios.post(`${BaseUrl}/auth`, payload)
export const reg = async (payload) => axios.post(`${BaseUrl}/auth/createAccount`, payload);
export const uploadProduct = async (token, payload) => axios.post(`${BaseUrl}/auth/createAccount`, payload, {
    headers: {
        AUTHORIZATION: `Bearer ${token}`,
    }
});

export const getAllProducts = async (token, payload) => axios.post(`${BaseUrl}/product/all`, payload, {
    headers: {
        AUTHORIZATION: `Bearer ${token}`,
    }
});

export const getMyProducts = async (token, payload) => axios.post(`${BaseUrl}/product/userProducts`, payload, {
    headers: {
        AUTHORIZATION: `Bearer ${token}`,
    }
});

export const getProductsByLocation = async (token, payload) => axios.post(`${BaseUrl}/product/getProductByLocation`, payload, {
    headers: {
        AUTHORIZATION: `Bearer ${token}`,
    }
});
