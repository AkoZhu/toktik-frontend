import {getClient} from "./client";

// user
async function getUserByName(username) {
    const resp = await getClient().get("/user/" + username);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }

}

async function putUserByName(username, newUser) {
    const resp = await getClient().put("/user/" + username, newUser);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function getUserBySearch(search) {
    const resp = await getClient().get(`/user/search/${search}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return [];
    }
}

// follow
async function getFollowerCountByUsername(username) {
    const resp = await getClient().get(`/follow/follower-count/${username}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return 0;
    }
}

async function getFollowingCountByUsername(username) {
    const resp = await getClient().get(`/follow/following-count/${username}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return 0;
    }
}

async function getFollowerNamesByUsername(username) {
    const resp = await getClient().get(`/follow/follower-names/${username}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return [];
    }
}

async function getFollowStatus(follower, following) {
    const resp = await getClient().get(`/follow/is-following/${follower}/${following}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
}

async function postFollow(follower, following) {
    const resp = await getClient().post('/follow/follow', {
        follower: follower, following: following
    });
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
}

async function postUnfollow(follower, following) {
    const resp = await getClient().post('/follow/unfollow', {
        follower: follower, following: following
    });
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
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
    const resp = await getClient().get(`/like/is-like/${username}/${postId}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
}

async function getLikeCountByPostId(postId) {
    const resp = await getClient().get(`/like/count/${postId}`);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return 0;
    }
}

async function postLike(username, postId) {
    const resp = await getClient().post('/like/like', {
        userLike: username, postId: postId
    });
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
}

async function postUnlike(username, postId) {
    const resp = await getClient().post('/like/unlike', {
        userLike: username, postId: postId
    });
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return false;
    }
}


export {
    getUserByName, putUserByName, getUserBySearch,
    getFollowerCountByUsername, getFollowingCountByUsername, getFollowerNamesByUsername,
    getFollowStatus, postFollow, postUnfollow, getSuggestions,
    getLikeCountByPostId, getLikeStatus, postLike, postUnlike
};