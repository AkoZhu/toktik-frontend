import {client} from "./client";

async function login(username, password) {
    const response = await client.post('/auth/login', {username, password});
    if (response.data.success) {
        sessionStorage.setItem("CurrentUsername", username);
        sessionStorage.setItem("CurrentUserProfilePicture", response.data.data.profilePicture);
        sessionStorage.setItem("CurrentUserToken", response.data.data.token);
        return true;
    } else {
        return false;
    }
}

async function register(user) {
    const response = await client.post('/user', user);
    if (response.data) {
        sessionStorage.setItem("CurrentUsername", response.data.data.username);
        sessionStorage.setItem("CurrentUserProfilePicture", response.data.data.profilePicture);

        return true;
    } else {
        return false;
    }
}

export {login, register};