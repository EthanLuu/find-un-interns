import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance;

const initAxios = (baseUrl = "https://un-api.ethanloo.cn") => {
    axiosInstance = axios.create({ baseURL: baseUrl });
};

export const useAxios = () => ({
    instance: axiosInstance,
    init: initAxios
});
