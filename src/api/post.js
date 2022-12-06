import {getClient} from "./client";

// Posts related
async function getPostByPage(page) {
    const response = await getClient().get("/post/page/" + page);
    return response.data.data;
}

async function getPostByUsername(username) {
    const response = await getClient().get("/post/username/" + username);
    return response.data.data;
}

async function postPost(post) {
    const response = await getClient().post("/post", post);
    return response.data.data;
}

async function putPostsById(postId, postBody) {
    const response = await getClient().put("/post/" + postId, postBody);
    return response.data.data;
}

async function getPostById(postId) {
    const response = await getClient().get("/post/" + postId);
    return response.data.data;
}

async function deletePostById(postId) {
    const response = await getClient().delete("/post/" + postId);
    return response.data.success;
}


// Comments related
async function getCommentByPostId(postId) {
    let res = await getClient().get("/comment/post/" + postId);
    return res.data.data;
}

async function postComment(commentId, newComment) {
    let response;
    if (!commentId || commentId === -1) {
        response = await getClient().post("/comment", newComment);
    } else {
        response = await getClient().put("/comment/" + commentId, newComment);
    }


    return response.data.data;
}

async function deleteCommentById(commentId) {
    let res = await getClient().delete("/comment/" + commentId);
    return res.data.success;
}


async function postSaveMultiple(formData) {
    const client = getClient();
    client.defaults.timeout = 1000 * 60;
    const response = await client.post("/save/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return response.data.data;
}

async function postSaveOne(formData) {
    const client = getClient();
    client.defaults.timeout = 1000 * 5;
    const response = await client.post("/save/one", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return response.data.data;
}


export {
    getPostByPage, putPostsById, getPostById, postPost,
    getPostByUsername, deletePostById,
    getCommentByPostId, postComment, deleteCommentById,
    postSaveMultiple, postSaveOne
};