import {getClient} from "./client";

// user
async function getUserByName(username) {
    const resp = await getClient().get("/user/" + username);
    return resp.data.data;

}

async function putUserByName(username, newUser) {
    const response = await getClient().put("/user/" + username, newUser);
    return response.data.data;
}

async function getUserBySearch(search) {
    const response = await getClient().get(`/user/search/${search}`);
    return response.data.data;
}

// follow
async function getFollowerCountByUsername(username) {
    const response = await getClient().get(`/follow/follower-count/${username}`);
    return response.data.data;
}

async function getFollowingCountByUsername(username) {
    const response = await getClient().get(`/follow/following-count/${username}`);
    return response.data.data;
}

async function getFollowerNamesByUsername(username) {
    const response = await getClient().get(`/follow/follower-names/${username}`);
    return response.data.data;
}

async function getFollowStatus(follower, following) {
    const response = await getClient().get(`/follow/is-following/${follower}/${following}`);
    return response.data.data;
}

async function postFollow(follower, following) {
    const response = await getClient().post('/follow/follow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function postUnfollow(follower, following) {
    const response = await getClient().post('/follow/unfollow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function getSuggestions(username) {
    const response = await getClient().get(`/follow/suggestions/${username}`);
    if (response.data.success) {
        return response.data.data;
    } else {
        return [];
    }
}

// like
async function getLikeStatus(username, postId) {
    const response = await getClient().get(`/like/is-like/${username}/${postId}`);
    return response.data.data;
}

async function getLikeCountByPostId(postId) {
    const response = await getClient().get(`/like/count/${postId}`);
    return response.data.data;
}

async function postLike(username, postId) {
    const response = await getClient().post('/like/like', {
        userLike: username, postId: postId
    });
    return response.data.data;
}

async function postUnlike(username, postId) {
    const response = await getClient().post('/like/unlike', {
        userLike: username, postId: postId
    });
    return response.data.data;
}


export {
    getUserByName, putUserByName, getUserBySearch,
    getFollowerCountByUsername, getFollowingCountByUsername, getFollowerNamesByUsername,
    getFollowStatus, postFollow, postUnfollow, getSuggestions,
    getLikeCountByPostId, getLikeStatus, postLike, postUnlike
};