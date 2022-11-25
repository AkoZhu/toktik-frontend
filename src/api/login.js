import {client} from "./client";

async function login(username, password) {
    // TODO: login
    sessionStorage.setItem("CurrentUsername", username);
    sessionStorage.setItem("CurrentUserProfilePicture", "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png");

    return true;
}

async function register(user) {
    const response = await client.post('http://localhost:4000/user', user);

    if (response.data) {
        sessionStorage.setItem("CurrentUsername", response.data.username);
        sessionStorage.setItem("CurrentUserProfilePicture", response.data.profilePicture);

        return true;
    } else {
        return false;
    }
}

export {login, register};