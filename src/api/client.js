import axios from 'axios';

export const saveFileServeEndpoint = "http://localhost:4000/api/save/serve/";
export const apiEndpoint = "http://localhost:4000/api";

export const client = axios.create({
    baseURL: apiEndpoint,
    timeout: 1000
})