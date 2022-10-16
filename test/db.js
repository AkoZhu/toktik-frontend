const faker = require('@faker-js/faker').faker;
const fs = require('fs');
const images = fs.readFileSync('image_urls.txt', 'utf-8').split(/\r?\n/);
const comments = fs.readFileSync('comments.txt', 'utf-8').split(/\r?\n/);

const allUsersNum = 15;
const perComment = 5;

const sample = (array, size) => {
    const shuffled = array.slice(0);
    let i = array.length;
    let min = i - size;
    let temp;
    let index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

const getAllUsernames = (allUsersNum) => {
    let usernames = ["demo"];
    for (let i = 0; i < allUsersNum - 1; i++) {
        usernames.push(faker.internet.userName());
    }
    return usernames;
}

const allUsernames = getAllUsernames(allUsersNum);

let globalPostId = 100;
let globalCommentId = 100;

const allPosts = [];
const allComments = [];
const followingMap = {};
const follwerMap = {};

const generateFollowingRelationship = () => {
    for (let i = 1; i <= allUsersNum; i++) {
        for (let j = 1; j <= allUsersNum; j++) {
            if (i === j) continue;
            if (followingMap[i] === undefined) {
                followingMap[i] = [];
            }
            if (follwerMap[j] === undefined) {
                follwerMap[j] = [];
            }

            if (Math.random() > 0.5) {
                followingMap[i].push(j);
                follwerMap[j].push(i);
            }
        }
    }
}

const getRandomArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const getComment = (postUsername, postId) => {
    let comment = {
        id: globalCommentId++,
        username: getRandomArray(allUsernames),
        postId: postId,
        message: getRandomArray(comments),
        mention: postUsername,
    };
    allComments.push(comment);
    return comment;
}

const getMultipleComments = (postUsername, postId, n) => {
    let comments = [];
    for (let i = 0; i < n; i++) {
        comments.push(getComment(postUsername, postId));
    }
    return comments;
}

const getPost = (username) => {
    let post = {
        id: globalPostId,
        username: username,
        postType: 0,
        postContent: getRandomArray(images),
        description: faker.lorem.sentence(),
        public: true,
        totalLikes: Math.floor(Math.random() * allUsersNum),
        tagging: [],
        comments: getMultipleComments(username, globalPostId, perComment),
    };

    allPosts.push(post);
    globalPostId++;
    return post;
}

const getMultiplePosts = (username, n) => {
    let posts = [];
    for (let i = 0; i < n; i++) {
        posts.push(getPost(username));
    }
    return posts;
}

const getUser = (n) => {
    let users = [
        {
            id: 1,
            username: "demo",
            firstName: "Jack",
            lastName: "J",
            email: "abc@gmail.com",
            password: "123456",
            profilePicture: "https://ui-avatars.com/api/?rounded=true",
            followerCount: follwerMap[1].length,
            followingCount: followingMap[1].length,
            postCount: 22,
            posts: getMultiplePosts("demo", 22),
        }
    ]

    for (let i = 0; i < n-1; i++) {
        let tmpUsername = allUsernames[i+1];
        let postNum = Math.floor(Math.random() * 10) + 5;

        users.push({
            id: i+2,
            username: tmpUsername,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            profilePicture: "https://ui-avatars.com/api/?rounded=true",
            followerCount: follwerMap[i+2].length,
            followingCount: followingMap[i+2].length,
            postCount: postNum,
            posts: getMultiplePosts(tmpUsername, postNum),
        })
    }

    return users;
}



module.exports = () => {
    generateFollowingRelationship();

    const data = {
        signup: {success: true},
        login: {success: true},
        user: getUser(allUsersNum),
        post: sample(allPosts, allPosts.length),
        activity: allPosts,
        comment: allComments,
        following: followingMap,
        follower: follwerMap,
    }

    return data
}
