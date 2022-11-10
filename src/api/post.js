import {client} from "./client";
import {deleteObjectInListById} from "../utils";
import {getUserByName} from "./user";

// Posts related
async function getPostByPage(page) {
    const response = await client.get("http://localhost:4000/post?_sort=id&_order=desc&_limit=5&_page=" + page);
    return response.data;
}

async function getPostByUsername(username) {
    const response = await client.get("http://localhost:4000/user?username=" + username);
    return response.data;
}

async function putPostsById(postId, postBody) {
    const response = await client.put("http://localhost:4000/post/" + postId, postBody);
    return !!response.data;
}

async function getPostById(postId) {
    const response = await client.get("http://localhost:4000/post/" + postId);
    return response.data;
}

async function deletePostById(postId) {
    const response = await client.delete("http://localhost:4000/post/" + postId);
    return !!response.data;
}


// Comments related
async function getCommentByPostId(postId) {
    let res = await client.get("http://localhost:4000/post/" + postId);
    return res.data.comments;
}

async function postComment(postId, commentId, newComment) {
    let response = await client.get("http://localhost:4000/post/" + postId);
    let isNewComment = true;
    let post = response.data;
    let newComments = post.comments;

    for (let c of newComments) {
        if (c.id === commentId) {
            newComment.id = commentId;
            isNewComment = false;
            break;
        }
    }

    let postComment;
    if (isNewComment) {
        postComment = await client.post("http://localhost:4000/comment", newComment);
        newComment = postComment.data;
        newComments.push(newComment);
    } else {
        postComment = await client.put("http://localhost:4000/comment/" + newComment.id, newComment);
        for (let i = 0; i < newComments.length; i++) {
            if (newComments[i].id === newComment.id) {
                newComments[i] = postComment.data;
                break;
            }
        }
    }

    const postBody = {
        id: post.id,
        username: post.username,
        postContent: post.postContent,
        postType: post.postType,
        description: post.description,
        public: post.public,
        totalLikes: post.totalLikes,
        tagging: post.tagging,
        comments: newComments,
    }

    await client.put("http://localhost:4000/post/" + post.id, postBody);

    let userResp = await client.get("http://localhost:4000/user?username=" + sessionStorage.getItem("CurrentUsername"));
    let curUser = userResp.data[0];

    let newPosts = curUser.posts;
    if (isNewComment) {
        newPosts.push(postBody);
    } else {
        for (let i = 0; i < newPosts.length; i++) {
            if (newPosts[i].id === post.id) {
                newPosts[i] = postBody;
                break;
            }
        }
    }

    curUser.posts = newPosts;
    let userPut = await client.put("http://localhost:4000/user/" + curUser.id, curUser);
    return !!userPut.data;
}

async function deleteCommentById(commentId, postId, username) {
    // delete comment in post
    let response = await client.get("http://localhost:4000/post/" + postId);
    let newPost = response.data;
    let comments = deleteObjectInListById(newPost.comments, commentId);
    newPost.comments = comments;
    await client.put("http://localhost:4000/post/" + postId, newPost);

    // delete comment in user
    const userId = (await getUserByName(username)).id;
    response = await client.get("http://localhost:4000/user/" + userId);
    let user = response.data;
    let posts = user.posts;
    let curPost = posts.filter((item) => {
        return item.id === newPost.id;
    })[0];

    curPost.comments = comments;
    posts = deleteObjectInListById(posts, newPost.id);
    posts.push(newPost);
    user.posts = posts;
    await client.put("http://localhost:4000/user/" + userId, user);

    // delete comment in comments
    return !!(await client.delete("http://localhost:4000/comment/" + commentId)).data;
}


async function postSave(formData) {
    return client.post("http://localhost:8080/save", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}


export {
    getPostByPage, putPostsById, getPostById,
    getPostByUsername, deletePostById,
    getCommentByPostId, postComment, deleteCommentById, postSave
};