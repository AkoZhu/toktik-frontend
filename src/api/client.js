import axios from 'axios';

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:8080/api";

export const client = axios.create({
    baseURL: apiEndpoint,
    timeout: 1000
})

client.interceptors.response.use((response) => response, (error) => {
    console.log("Error: " + error);
    if (error.response && error.response.status === 403) {
        if (window.location.href !== "/login") window.location.href = "/login";
    }

    if (error.response && error.response.status === 429) {
        alert(error.response.data);
    }

    return Promise.reject(error);
});

export const getClient = () => {
    if (localStorage.getItem("CurrentUserToken")) {
        client.defaults.headers.common['token'] = localStorage.getItem("CurrentUserToken");
    }
    return client;
}
