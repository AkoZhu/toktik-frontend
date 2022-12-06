import axios from 'axios';

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000/api";

export const client = axios.create({
    baseURL: apiEndpoint,
    timeout: 1000
})

client.interceptors.response.use((response) => response, (error) => {
    console.log("Error: " + error);
    if (error.response.status === 403 && window.location.href !== "/login") {
        window.location.href = "/login";
    }

    return Promise.reject(error);
});

export const getClient = () => {
    if (localStorage.getItem("CurrentUserToken")) {
        client.defaults.headers.common['token'] = localStorage.getItem("CurrentUserToken");
    }
    return client;
}
