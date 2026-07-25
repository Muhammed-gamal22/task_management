import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({
    baseURL: apiUrl,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const getData = async (url, queryObj) => {
    try {
        const response = await api.get(url, queryObj ? { params: queryObj } : undefined)
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const postData = async (url, data) => {
    try {
        const response = await api.post(url, data)
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error;
    }
}
export const putData = async (url, data) => {
    try {
        const response = await api.put(url, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const patchData = async (url, data) => {
    try {
        const response = await api.patch(url, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteData = async (url) => {
    try {
        const response = await api.delete(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}