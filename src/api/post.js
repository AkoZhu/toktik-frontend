import {client} from "./client";

// Posts related
async function getPostByPage(page) {
    const response = await client.get("/post/page/" + page);
    return response.data.data;
}

async function getPostByUsername(username) {
    const response = await client.get("/post/username/" + username);
    return response.data.data;
}

async function postPost(post) {
    const response = await client.post("/post", post);
    return response.data.data;
}

async function putPostsById(postId, postBody) {
    const response = await client.put("/post/" + postId, postBody);
    return response.data.data;
}

async function getPostById(postId) {
    const response = await client.get("/post/" + postId);
    return response.data.data;
}

async function deletePostById(postId) {
    const response = await client.delete("/post/" + postId);
    return response.data.success;
}


// Comments related
async function getCommentByPostId(postId) {
    let res = await client.get("/comment/post/" + postId);
    return res.data.data;
}

async function postComment(commentId, newComment) {
    let response;
    if (!commentId || commentId === -1) {
        response = await client.post("/comment", newComment);
    } else {
        response = await client.put("/comment/" + commentId, newComment);
    }


    return response.data.data;
}

async function deleteCommentById(commentId) {
    let res = await client.delete("/comment/" + commentId);
    return res.data.success;
}


async function postSaveMultiple(formData) {
    const response = await client.post("/save/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    return response.data.data;
}

async function postSaveOne(formData) {
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