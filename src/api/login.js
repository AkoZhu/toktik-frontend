import {getClient} from "./client";

async function login(username, password) {
    const response = await getClient().post('/auth/login', {username, password});
    if (response.data.success) {
        localStorage.setItem("CurrentUsername", username);
        localStorage.setItem("CurrentUserProfilePicture", response.data.data.profilePicture);
        localStorage.setItem("CurrentUserToken", response.data.data.token);

        return true;
    } else {
        return false;
    }
}

async function register(user) {
    const response = await getClient().post('/user', user);
    if (response.data) {
        localStorage.setItem("CurrentUsername", response.data.data.username);
        localStorage.setItem("CurrentUserProfilePicture", response.data.data.profilePicture);

        return true;
    } else {
        return false;
    }
}

export {login, register};