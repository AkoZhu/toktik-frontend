import {client} from "./client";

async function login(username, password) {
    const response = await client.get(`http://localhost:4000/user?username=${username}&password=${password}`);

    if (response.data.length > 0) {
        sessionStorage.setItem("CurrentUserId", response.data[0].id);
        sessionStorage.setItem("CurrentUsername", username);
        sessionStorage.setItem("CurrentUserProfilePicture", response.data[0].profilePicture);

        return true;
    } else {
        return false;
    }
}

async function register(user) {
    const response = await client.post('http://localhost:4000/user', user);

    if (response.data) {
        sessionStorage.setItem("CurrentUsername", response.data.username);
        sessionStorage.setItem("CurrentUserId", response.data.id);
        sessionStorage.setItem("CurrentUserProfilePicture", response.data.profilePicture);
        const following = await client.get('http://localhost:4000/following');
        let followingMap = following.data;
        followingMap[response.data.id] = [];
        await client.post('http://localhost:4000/following', followingMap);

        let follower = await client.get('http://localhost:4000/follower');
        let followerMap = follower.data;
        followerMap[response.data.id] = [];
        await client.post('http://localhost:4000/following', followerMap);

        return true;
    } else {
        return false;
    }
}

export {login, register};