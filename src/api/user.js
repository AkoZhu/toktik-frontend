import {client} from "./client";

// user
async function getUserByName(username) {
    const resp = await client.get("/user/" + username);
    return resp.data.data;

}

async function putUserByName(username, newUser) {
    const response = await client.put("/user/" + username, newUser);
    return response.data.data;
}

// follow
async function getFollowCountByUsername(username) {
    const response = await client.get(`/follow/follow-count/${username}`);
    return response.data.data;
}

async function getFollowerNamesByUsername(username) {
    const response = await client.get(`/follow/follower-names/${username}`);
    return response.data.data;
}

async function getFollowStatus(follower, following) {
    const response = await client.get(`/follow/is-following/${follower}/${following}`);
    return response.data.data;
}

async function postFollow(follower, following) {
    const response = await client.post('/follow/follow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function postUnfollow(follower, following) {
    const response = await client.post('/follow/unfollow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function getSuggestions(username) {
    const response = await client.get(`/follow/suggestions/${username}`);
    if (response.data.success) {
        return response.data.data;
    } else {
        return [];
    }
}

// like
async function getLikeStatus(username, postId) {
    const response = await client.get(`/like/is-like/${username}/${postId}`);
    return response.data.data;
}

async function getLikeCountByPostId(postId) {
    const response = await client.get(`/like/count/${postId}`);
    return response.data.data;
}

async function postLike(username, postId) {
    const response = await client.post('/like/like', {
        userLike: username, postId: postId
    });
    return response.data.data;
}

async function postUnlike(username, postId) {
    const response = await client.post('/like/unlike', {
        userLike: username, postId: postId
    });
    return response.data.data;
}


export {
    getUserByName, putUserByName,
    getFollowCountByUsername, getFollowerNamesByUsername, getFollowStatus, postFollow, postUnfollow, getSuggestions,
    getLikeCountByPostId, getLikeStatus, postLike, postUnlike
};