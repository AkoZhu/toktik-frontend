import {client} from "./client";

async function getDefaultUser() {
    return await client.get(
        "http://localhost:4000/user?username=" + sessionStorage.getItem("CurrentUsername")
    );
}

async function getUserByName(username) {
    const resp = await client.get(
        "http://localhost:4000/user?username=" + username
    );
    return resp.data[0];

}

async function getUserById(userId) {
    const response = await client.get(`http://localhost:4000/user/${userId}`);
    return response.data;
}


async function getAllUserByIds(ids) {
    let users = [];
    for (let id of ids) {
        let resp = await client.get(`http://localhost:4000/user/${id}`);
        users.push(resp.data)
    }
    return users;
}

async function putUserById(userId, newUser) {
    const response = await client.put("http://localhost:4000/user/" + userId, newUser);
    return response.data;
}

async function getFollowersById(userId) {
    const response = await client.get(`http://localhost:4000/follower?followingId=${userId}`);
    let friendsId = []
    for (let follower of response.data) {
        friendsId.push(follower.followerId);
    }

    return friendsId;
}

// Following relationship
async function getFollowMapRelationshipItem(followerId, followingId) {
    const response = await client.get(`http://localhost:4000/following?followerId=${followerId}&followingId=${followingId}`);
    return response.data;
}

async function getFollowMap() {
    return (await client.get(`http://localhost:4000/following`)).data;
}

async function deleteFollowMapRelationshipItem(followingMapId) {
    const response = await client.delete(`http://localhost:4000/following/${followingMapId}`);
    return response.data;
}

async function postFollowMapRelationshipItem(followMapItem) {
    const response = await client.post(`http://localhost:4000/following`, followMapItem);
    return response.data;
}

// Likes relationship
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
    getDefaultUser, getUserByName, getUserById,
    getAllUserByIds, getFollowersById, putUserById,
    getFollowMapRelationshipItem, deleteFollowMapRelationshipItem, postFollowMapRelationshipItem,
    getLikeMapRelationshipItem, postLikeMapRelationshipItem, deleteLikeMapRelationshipItemById,
    getFollowMap, getLikeMapRelationshipItemByPostId
};