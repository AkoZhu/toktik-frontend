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
    const response = await getClient().post('/auth/register', user);
    if (response.data.success) {
        console.log("response.data: ", JSON.stringify(response.data));
        localStorage.setItem("CurrentUsername", response.data.data.username);
        localStorage.setItem("CurrentUserProfilePicture", response.data.data.profilePicture);
        localStorage.setItem("CurrentUserToken", response.data.data.token);

        console.log("frontend token: " + JSON.stringify(response.data.data.token));

        return true;
    } else {
        return false;
    }
}

export {login, register};