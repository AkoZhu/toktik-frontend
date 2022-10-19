import axios from "axios";

export const sample = (array, size) => {
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

export function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function updateAllPosts(posts, user) {
    let promises = [];

    posts.forEach(function (post) {
        promises.push(axios.post('http://localhost:4000/post', post).then(r => {
            user.posts.push(r.data);
            return r;
        }));
    });

    return promises;
}

export function sortById(posts) {
    return Array.from(posts).sort((a, b) => {
        return b.id - a.id;
    });
}
