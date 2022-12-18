import {getClient} from "./client";

// Posts related
async function getPostByPage(page) {
    const resp = await getClient().get("/post/page/" + page);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return [];
    }
}

async function getPostByUsername(username) {
    const resp = await getClient().get("/post/username/" + username);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return [];
    }
}

async function postPost(post) {
    const resp = await getClient().post("/post", post);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function putPostsById(postId, postBody) {
    const resp = await getClient().put("/post/" + postId, postBody);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function getPostById(postId) {
    const resp = await getClient().get("/post/" + postId);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function deletePostById(postId) {
    const resp = await getClient().delete("/post/" + postId);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}


// Comments related
async function getCommentByPostId(postId) {
    let resp = await getClient().get("/comment/post/" + postId);
    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function postComment(commentId, newComment) {
    let resp;
    if (!commentId || commentId === -1) {
        resp = await getClient().post("/comment", newComment);
    } else {
        resp = await getClient().put("/comment/" + commentId, newComment);
    }

    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function deleteCommentById(commentId) {
    const resp = await getClient().delete("/comment/" + commentId);

    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}


async function postSaveMultiple(formData) {
    const client = getClient();
    client.defaults.timeout = 1000 * 60;
    const resp = await client.post("/save/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}

async function postSaveOne(formData) {
    const client = getClient();
    client.defaults.timeout = 1000 * 5;
    const resp = await client.post("/save/one", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    if (resp?.data?.success) {
        return resp.data.data;
    } else {
        return {};
    }
}


export {
    getPostByPage, putPostsById, getPostById, postPost,
    getPostByUsername, deletePostById,
    getCommentByPostId, postComment, deleteCommentById,
    postSaveMultiple, postSaveOne
};