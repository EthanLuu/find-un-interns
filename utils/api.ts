import axios, { AxiosInstance } from "axios";

let axiosInstance: AxiosInstance;

const initAxios = (baseUrl: string) => {
    axiosInstance = axios.create({ baseURL: baseUrl });
};

export const useAxios = () => ({
    instance: axiosInstance,
    init: initAxios
});
