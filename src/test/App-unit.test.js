import {client} from "../api/client";
import {
    getFollowerNamesByUsername,
    getFollowStatus,
    getLikeCountByPostId,
    getLikeStatus,
    getSuggestions,
    postFollow,
    postLike,
    postUnfollow,
    postUnlike
} from "../api/user";

const MockAdapter = require("axios-mock-adapter");

const mockAxios = new MockAdapter(client);

const postLib = require('../api/post');
const userLib = require('../api/user');
const loginLib = require('../api/login');

function mockSessionStorage() {
    sessionStorage.setItem("CurrentUsername", "demo");
    sessionStorage.setItem("CurrentUserId", "1");
}

describe("login", () => {
    test("login", async () => {
        mockAxios.onGet("http://localhost:4000/api/user?username=demo&password=demo").reply(200, [{
            id: 1
        }]);

        mockAxios.onGet("http://localhost:4000/api/user?username=demo&password=demo1").reply(200, []);

        const data1 = await loginLib.login("demo", "demo");
        expect(data1).toBe(true);

        const data2 = await loginLib.login("demo", "demo1");
        expect(data2).toBe(true);
    });

    test("register success", async () => {
        const registerUser = {
            id: 1,
            username: "demo",
            profilePicture: "demo"
        }
        mockAxios.onPost("http://localhost:4000/user").reply(200, registerUser);
        mockAxios.onGet("http://localhost:4000/api/following").reply(200, {});
        mockAxios.onGet("http://localhost:4000/api/follower").reply(200, {});
        mockAxios.onPost("http://localhost:4000/api/following").reply(200, {});

        const data = await loginLib.register(registerUser);
         expect(sessionStorage.getItem("CurrentUsername")).toBe('demo');
        expect(data).toBe(true);
    });

    test("register failure", async () => {
        const registerUser = {
            id: 1,
            username: "demo",
            profilePicture: "demo"
        }
        mockAxios.onPost("http://localhost:4000/user").reply(200, false);

        const data = await loginLib.register(registerUser);
        expect(data).toBe(false);
    })
});

describe("post", () => {
    const sampleComment = {
        success : true,
        id:{
        username: "Chasity.Larkin",
        postId: 136387455,
        message: "You’re a machine 💪",
        mention: "Johathan.Legros78"
    }};

    const sampleCommentResponse = {
        success: true,
        data:{
        id: 208,
        ...sampleComment
    }}

    const samplePost = {
        success:true,
        data:{
        id: 998797540,
        username: "Johathan.Legros78",
        postType: 0,
        postContent: "https://images.unsplash.com/photo-1665323759004-43c9f3b941dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NTc3OTI0OQ&ixlib=rb-1.2.1&q=80&w=1080",
        description: "Minima voluptatum velit cupiditate.",
        public: true,
        tagging: [],
        comments: [
            {
                id: 690,
                username: "demo",
                postId: 998797540,
                message: "This outfit is absoultely insane 🔥",
                mention: "Johathan.Legros78"
            },
            {
                id: 691,
                username: "Camren34",
                postId: 998797540,
                message: "So dreamy",
                mention: "Johathan.Legros78"
            },
            {
                id: 692,
                username: "Hailee.Kessler",
                postId: 998797540,
                message: "You got it 💪",
                mention: "Johathan.Legros78"
            },
            {
                id: 693,
                username: "Cesar.Weissnat",
                postId: 998797540,
                message: "You’re the man",
                mention: "Johathan.Legros78"
            },
            {
                id: 694,
                username: "Colten.Streich29",
                postId: 998797540,
                message: "What a babe ❤️",
                mention: "Johathan.Legros78"
            },
            sampleCommentResponse
        ],
        totalLikes: 8
    }};

    const sampleUser = {
        success:true,
        data:{
        id: 1,
        username: "demo",
        firstName: "Jack",
        lastName: "J",
        email: "abc@gmail.com",
        password: "123456",
        profilePicture: "https://ui-avatars.com/api/?rounded=true",
        followerCount: 5,
        followingCount: 7,
        postCount: 2,
        posts: [
            {
                id: 743790487,
                username: "demo",
                postType: 0,
                postContent: "https://images.unsplash.com/photo-1665396695736-4c1a7eb96597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NTc3OTAzOA&ixlib=rb-1.2.1&q=80&w=1080",
                description: "Ipsam est laudantium necessitatibus aut corrupti a sapiente magnam atque.",
                public: true,
                tagging: [],
                comments: [
                    {
                        id: 100,
                        username: "Mattie.Schoen16",
                        postId: 743790487,
                        message: "Classy dude"
                    },
                    {
                        id: 101,
                        username: "demo",
                        postId: 743790487,
                        message: "My heart ❤️"
                    },
                ],
                totalLikes: 7
            },
            samplePost
        ]
    }};

    mockSessionStorage();

    test('getPostByPage', async () => {
        mockAxios.onGet("/post/page/1").reply(200,samplePost
        );

        const data = await postLib.getPostByPage(1);
        // expect(data.length).toBe(1);
        expect(data.username).toBe("Johathan.Legros78");
        expect(data.postType).toBe(0);
        expect(data.comments[0]).toMatchObject({
            "id": 690,
            "username": "demo",
            "postId": 998797540,
            "message": "This outfit is absoultely insane 🔥",
            "mention": "Johathan.Legros78"
        });
    })

    test('getPostByUsername', async () => {
        mockAxios.onGet('/post/username/demo').reply(200, sampleUser);
        const data = await postLib.getPostByUsername("demo");
        // expect(data.length).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");
        expect(data.lastName).toBe("J");
        expect(data.email).toBe("abc@gmail.com");
        expect(data.password).toBe("123456");
        expect(data.profilePicture).toBe("https://ui-avatars.com/api/?rounded=true");
        expect(data.followerCount).toBe(5);
        expect(data.followingCount).toBe(7);
        expect(data.postCount).toBe(2);
        expect(data.posts[0]).toMatchObject({
            id: 743790487,
            username: "demo",
        });
    })

    test('putPostsById', async () => {
        mockAxios.onPut("/post/998797540").reply(200, samplePost);

        const data = await postLib.putPostsById(998797540, {});
        expect(data).toStrictEqual({
            "comments": [
                {
                    "id": 690,
                    "mention": "Johathan.Legros78",
                    "message": "This outfit is absoultely insane 🔥",
                    "postId": 998797540,
                    "username": "demo"
                },
                {
                    "id": 691,
                    "mention": "Johathan.Legros78",
                    "message": "So dreamy",
                    "postId": 998797540,
                    "username": "Camren34"
                },
                {
                    "id": 692,
                    "mention": "Johathan.Legros78",
                    "message": "You got it 💪",
                    "postId": 998797540,
                    "username": "Hailee.Kessler"
                },
                {
                    "id": 693,
                    "mention": "Johathan.Legros78",
                    "message": "You’re the man",
                    "postId": 998797540,
                    "username": "Cesar.Weissnat"
                },
                {
                    "id": 694,
                    "mention": "Johathan.Legros78",
                    "message": "What a babe ❤️",
                    "postId": 998797540,
                    "username": "Colten.Streich29"
                },
                {
                    "data": {
                        "id": {
                            "mention": "Johathan.Legros78",
                            "message": "You’re a machine 💪",
                            "postId": 136387455,
                            "username": "Chasity.Larkin"
                        },
                        "success": true
                    },
                    "success": true
                }
            ],
            "description": "Minima voluptatum velit cupiditate.",
            "id": 998797540,
            "postContent": "https://images.unsplash.com/photo-1665323759004-43c9f3b941dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2NTc3OTI0OQ&ixlib=rb-1.2.1&q=80&w=1080",
            "postType": 0,
            "public": true,
            "tagging": [],
            "totalLikes": 8,
            "username": "Johathan.Legros78"
        });
    });

    test('getPostById', async () => {
        mockAxios.onGet("/post/998797540").reply(200, samplePost);
        const data = await postLib.getPostById(998797540);
        expect(data).toMatchObject(samplePost.data);
    });

    test('deletePostById', async () => {
        mockAxios.onDelete("/post/998797540").reply(200, samplePost);
        const data = await postLib.deletePostById(998797540);
        expect(data).toBe(true);
    });

    test('getCommentByPostId', async () => {
        mockAxios.onGet("/comment/post/998797540").reply(200, samplePost);
        const data = await postLib.getCommentByPostId(998797540);
        expect(data).toMatchObject(samplePost.data);
    });

    test('postComment', async () => {
        mockAxios.onGet("/post/998797540").reply(200, samplePost);
        mockAxios.onPost("/comment").reply(200, sampleCommentResponse);
        mockAxios.onPut("/comment/998797540").reply(200, sampleCommentResponse);
        mockAxios.onPut("/post/998797540").reply(200, samplePost);
        mockAxios.onPut("/user/1").reply(200, sampleUser);

        const data1 = await postLib.postComment(998797540,sampleComment);
        expect(data1).toStrictEqual({
            "id": {
                "mention": "Johathan.Legros78",
                "message": "You’re a machine 💪",
                "postId": 136387455,
                "username": "Chasity.Larkin"
            },
            "success": true
        });

        const data2 = await postLib.postComment(-1,sampleComment);
        expect(data2).toStrictEqual({
            "id": {
                "mention": "Johathan.Legros78",
                "message": "You’re a machine 💪",
                "postId": 136387455,
                "username": "Chasity.Larkin"
            },
            "success": true
        });
    });

    test('deleteCommentById', async () => {
        mockAxios.onGet("/post/998797540").reply(200, samplePost);
        mockAxios.onPut("/post/998797540").reply(200, samplePost);
        mockAxios.onGet("/user/1").reply(200, sampleUser);
        mockAxios.onPut("/user/1").reply(200, sampleUser);
        mockAxios.onDelete("/comment/998797540").reply(200, sampleUser);

        const data = await postLib.deleteCommentById( 998797540);
        expect(data).toBe(true);
    })

    test('postSave', async () => {
        mockAxios.onPost("/save/multiple").reply(200, true);
        const data = await postLib.postSaveMultiple({});
        expect(data).not.toBeNull();
    });
});

describe("user", () => {
    const sampleUser = {
        success: true,
        data:{
        "id": 1,
        "username": "demo",
        "firstName": "Jack",
        "lastName": "J",
        "email": "abc@gmail.com",
        "password": "123456",
        "profilePicture": "https://ui-avatars.com/api/?rounded=true",
        "followerCount": 7,
        "followingCount": 8,
        "postCount": 22,

    }}
    const sampleUserArray = {
        data:
        {
            "id": 1,
            "username": "demo",
            "firstName": "Jack",
            "lastName": "J",
            "email": "abc@gmail.com",
            "password": "123456",
            "profilePicture": "https://ui-avatars.com/api/?rounded=true",
            "followerCount": 7,
            "followingCount": 8,
            "postCount": 22,
        }
    }
    test('getUserByName', async () => {
        mockAxios.onGet("/user/demo").reply(200, sampleUserArray
        )

        const data = await userLib.getUserByName("demo");
        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");
    })






    test('putUserById', async () => {
        mockAxios.onPut(`/user/1`).reply(200,
            sampleUser
        )
        const data = await userLib.putUserByName(1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getFollowCountByUsername', async () => {
        mockAxios.onGet(`follow/follow-count/demo`).reply(200,
            sampleUser
        )
        const data = await userLib.getFollowCountByUsername('demo');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })



    test('postFollow', async () => {
        mockAxios.onPost(`/follow/follow`).reply(200,
            sampleUser
        )
        const data = await userLib.postFollow('demo','demo');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })
    test('postUnfollow', async () => {
        mockAxios.onPost(`/follow/unfollow`).reply(200,
            sampleUser
        )
        const data = await userLib.postUnfollow('demo','demo');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getSuggestions', async () => {
        mockAxios.onGet(`/follow/suggestions/demo`).reply(200,
            sampleUser
        )
        const data = await userLib.getSuggestions('demo');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })
    test('getLikeStatus', async () => {
        mockAxios.onGet(`/like/is-like/demo/1`).reply(200,
            sampleUser
        )
        const data = await userLib.getLikeStatus('demo','1');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getLikeCountByPostId', async () => {
        mockAxios.onGet(`/like/count/1`).reply(200,
            sampleUser
        )
        const data = await userLib.getLikeCountByPostId('1');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('postLike', async () => {
        mockAxios.onPost(`/like/like`).reply(200,
            sampleUser
        )
        const data = await userLib.postLike('demo','1');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('postUnlike', async () => {
        mockAxios.onPost(`/like/unlike`).reply(200,
            sampleUser
        )
        const data = await userLib.postUnlike('demo','1');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })
    test('getFollowerNamesByUsername', async () => {
        mockAxios.onGet(`/follow/follower-names/demo`).reply(200,
            sampleUser
        )
        const data = await userLib.getFollowerNamesByUsername('demo','1');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })
    test('getFollowStatus', async () => {
        mockAxios.onGet(`/follow/is-following/demo/demo`).reply(200,
            sampleUser
        )
        const data = await userLib.getFollowStatus('demo','demo');

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })


})

