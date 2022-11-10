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

let globalCommentId = 100;

const allPosts = [];
const allComments = [];
const followMap = [];
const likeMap = [];

let followingMapId = 100;
const generateFollowingRelationship = () => {
    for (let i = 1; i <= allUsersNum; i++) {
        for (let j = 1; j <= allUsersNum; j++) {
            if (i === j) continue;
            if (Math.random() > 0.5) {
                followMap.push({id: followingMapId++, followerId: i, followingId: j});
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
    let postId = Math.floor(100000000 + Math.random() * 900000000);
    let post = {
        id: postId,
        username: username,
        postType: 0,
        postContent: getRandomArray(images),
        description: faker.lorem.sentence(),
        public: true,
        tagging: [],
        comments: getMultipleComments(username, postId, perComment),
    };

    allPosts.push(post);
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
            followerCount: followMap.filter(f => f.followingId === 1).length,
            followingCount: followMap.filter(f => f.followerId === 1).length,
            postCount: 22,
            posts: getMultiplePosts("demo", 22),
        }
    ]

    for (let i = 0; i < n - 1; i++) {
        let tmpUsername = allUsernames[i + 1];
        let postNum = Math.floor(Math.random() * 10) + 5;

        users.push({
            id: i + 2,
            username: tmpUsername,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            profilePicture: "https://ui-avatars.com/api/?rounded=true",
            followerCount: followMap.filter(f => f.followingId === i + 2).length,
            followingCount: followMap.filter(f => f.followerId === i + 2).length,
            postCount: postNum,
            posts: getMultiplePosts(tmpUsername, postNum),
        })
    }

    return users;
}

let likeMapId = 100;
const generateLikeRelationship = () => {
    for (let i = 1; i <= allUsersNum; i++) {
        for (let post of allPosts) {
            if (Math.random() > 0.5) {
                likeMap.push({id: likeMapId++, userId: i, postId: post.id});
            }
        }
    }
}

module.exports = () => {
    generateFollowingRelationship();

    let data = {
        signup: {success: true},
        login: {success: true},
        user: getUser(allUsersNum),
        post: sample(allPosts, allPosts.length),
        comment: allComments,
        following: followMap,
        follower: followMap,
    }

    generateLikeRelationship();
    data.like = likeMap;
    data.post.forEach(post => {
        post.totalLikes = likeMap.filter(l => l.postId === post.id).length
    });
    return data;
}
