import {v4 as uuid} from 'uuid'

const x = ['tech', 'nature', 'people', 'animals', 'plane', 'piece']
export const friendsDemo = [
    {username: 'Jason'},
    {username: 'Joe'},
    {username: 'Port'},
    {username: 'Fam'},

];

let numx = shuffle(x)

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

export const defaultUser = {
    id: uuid(),
    username: 'demouser',
    name: 'name',
    profileImage: 'https://ui-avatars.com/api/?rounded=true',
    // profileImage:
    // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
}

const defaultComment = {
    id: uuid(),
    user: defaultUser,
    content: "This is the comment. "
}

export function getUser(x) {
    return {
        id: uuid(),
        username: numx[x],
        name: 'name',
        profileImage: 'https://ui-avatars.com/api/?rounded=true',
    }
}

export const defaultPost = {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    postContent:
        'https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/80126161_2456912044637768_8188145638093587415_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=GAkCBeSLLnwAX_Xn25U&oh=58af570f5ad051b24583c388b946784a&oe=5EA44484',
    comments: [],
    type: 0,                // added
    public: true,                   // privacy, true if public, true if private
    created_at: '2020-02-28T03:08:14.522421+00:00',
}

export function getDefaultPost() {
    let imgArr = ['tech', 'nature', 'people', 'animals']

    let num = shuffle(imgArr)

    return {
        id: uuid(),
        likes: 10,
        caption: `<span class="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.🔥</span>`,
        user: defaultUser,
        username: defaultUser.username,
        media: `http://placeimg.com/640/480/${num}`,
        type: "image",                // added
        privacy: false,                   // privacy, false if public, true if private
        comments: [defaultComment, defaultComment, defaultComment, defaultComment, defaultComment, defaultComment, defaultComment
        , defaultComment, defaultComment, defaultComment],
        created_at: '2020-02-28T03:08:14.522421+00:00',
    }
}

export const defaultNotifications = [
    {
        id: uuid(),
        type: 'follow',
        user: defaultUser,
        created_at: '2020-02-29T03:08:14.522421+00:00',
    },
    {
        id: uuid(),
        type: 'like',
        user: defaultUser,
        post: defaultPost,
        created_at: '2020-02-29T03:08:14.522421+00:00',
    },
]

export const defaultCurrentUser = {
    id: uuid(),
    username: 'Sam',
    name: 'myself',
    profileImage: 'https://ui-avatars.com/api/?rounded=true',
    email: 'me@gmail.com',
    bio: 'This is my bio',
    phone_number: '555-555-5555',
    posts: Array.from({length: 10}, () => getDefaultPost()),
    followers: [defaultUser],
    following: [defaultUser],
    website: "www.google.com",
}
