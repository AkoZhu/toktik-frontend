import {client} from "./client";

// user
async function getDefaultUser() {
    return await client.get(
        "http://localhost:4000/api/user?username=" + sessionStorage.getItem("CurrentUsername")
    );
}

async function getUserByName(username) {
    const resp = await client.get(
        "http://localhost:4000/api/user?username=" + username
    );
    return resp.data.data[0];

}

async function getUserById(userId) {
    const response = await client.get(`http://localhost:4000/api/user/${userId}`);
    return response.data.data;
}

async function putUserById(userId, newUser) {
    const response = await client.put("http://localhost:4000/api/user/" + userId, newUser);
    return response.data.data;
}

// follow
async function getFollowCountByUsername(username) {
    const response = await client.get(`http://localhost:4000/api/follow/follow-count/${username}`);
    return response.data.data;
}

async function getFollowerNamesByUsername(username) {
    const response = await client.get(`http://localhost:4000/api/follow/follower-names/${username}`);
    return response.data.data;
}

async function getFollowStatus(follower, following) {
    const response = await client.get(`http://localhost:4000/api/follow/is-following/${follower}/${following}`);
    return response.data.data;
}

async function postFollow(follower, following) {
    const response = await client.post('http://localhost:4000/api/follow/follow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function postUnfollow(follower, following) {
    const response = await client.post('http://localhost:4000/api/follow/unfollow', {
        follower: follower, following: following
    });
    return response.data.data;
}

async function getSuggestions(username) {
    const response = (await client.get(`http://localhost:4000/api/suggestions/${username}`)).data;
    if (response.success) {
        return response.data;
    } else {
        return [];
    }
}

// like
async function getLikeMapRelationshipItem(userId, postId) {
    const response = await client.get(`http://localhost:4000/like?postId=${postId}&userId=${userId}`);
    return response.data;
}

async function getLikeMapRelationshipItemByPostId(postId) {
    const response = await client.get(`http://localhost:4000/like?postId=${postId}`);
    return response.data;
}

async function postLikeMapRelationshipItem(likeMapItem) {
    const response = await client.post("http://localhost:4000/like", likeMapItem);
    return !!response.data;
}

async function deleteLikeMapRelationshipItemById(itemId) {
    const response = await client.delete(`http://localhost:4000/like/${itemId}`);
    return !!response.data;
}


export {
    getDefaultUser, getUserByName, getUserById, putUserById,
    getFollowCountByUsername, getFollowerNamesByUsername, getFollowStatus, postFollow, postUnfollow, getSuggestions,
    getLikeMapRelationshipItem, postLikeMapRelationshipItem, deleteLikeMapRelationshipItemById,
    getLikeMapRelationshipItemByPostId
};