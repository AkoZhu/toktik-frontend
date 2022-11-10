import {client} from "../api/client";

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
        mockAxios.onGet("http://localhost:4000/user?username=demo&password=demo").reply(200, [{
            id: 1
        }]);

        mockAxios.onGet("http://localhost:4000/user?username=demo&password=demo1").reply(200, []);

        const data1 = await loginLib.login("demo", "demo");
        expect(data1).toBe(true);

        const data2 = await loginLib.login("demo", "demo1");
        expect(data2).toBe(false);
    });

    test("register success", async () => {
        const registerUser = {
            id: 1,
            username: "demo",
            profilePicture: "demo"
        }
        mockAxios.onPost("http://localhost:4000/user").reply(200, registerUser);
        mockAxios.onGet("http://localhost:4000/following").reply(200, {});
        mockAxios.onGet("http://localhost:4000/follower").reply(200, {});
        mockAxios.onPost("http://localhost:4000/following").reply(200, {});

        const data = await loginLib.register(registerUser);
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
        username: "Chasity.Larkin",
        postId: 136387455,
        message: "You’re a machine 💪",
        mention: "Johathan.Legros78"
    };

    const sampleCommentResponse = {
        id: 208,
        ...sampleComment
    }

    const samplePost = {
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
    };

    const sampleUser = {
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
    };

    mockSessionStorage();

    test('getPostByPage', async () => {
        mockAxios.onGet("http://localhost:4000/post?_sort=id&_order=desc&_limit=5&_page=1").reply(200, [samplePost]);

        const data = await postLib.getPostByPage(1);
        expect(data.length).toBe(1);
        expect(data[0].username).toBe("Johathan.Legros78");
        expect(data[0].postType).toBe(0);
        expect(data[0].comments[0]).toMatchObject({
            "id": 690,
            "username": "demo",
            "postId": 998797540,
            "message": "This outfit is absoultely insane 🔥",
            "mention": "Johathan.Legros78"
        });
    })

    test('getPostByUsername', async () => {
        mockAxios.onGet('http://localhost:4000/user?username=demo').reply(200, [sampleUser]);
        const data = await postLib.getPostByUsername("demo");
        expect(data.length).toBe(1);
        expect(data[0].username).toBe("demo");
        expect(data[0].firstName).toBe("Jack");
        expect(data[0].lastName).toBe("J");
        expect(data[0].email).toBe("abc@gmail.com");
        expect(data[0].password).toBe("123456");
        expect(data[0].profilePicture).toBe("https://ui-avatars.com/api/?rounded=true");
        expect(data[0].followerCount).toBe(5);
        expect(data[0].followingCount).toBe(7);
        expect(data[0].postCount).toBe(2);
        expect(data[0].posts[0]).toMatchObject({
            id: 743790487,
            username: "demo",
        });
    })

    test('putPostsById', async () => {
        mockAxios.onPut("http://localhost:4000/post/998797540").reply(200, samplePost);

        const data = await postLib.putPostsById(998797540, {});
        expect(data).toBe(true);
    });

    test('getPostById', async () => {
        mockAxios.onGet("http://localhost:4000/post/998797540").reply(200, samplePost);
        const data = await postLib.getPostById(998797540);
        expect(data).toMatchObject(samplePost);
    });

    test('deletePostById', async () => {
        mockAxios.onDelete("http://localhost:4000/post/998797540").reply(200, samplePost);
        const data = await postLib.deletePostById(998797540);
        expect(data).toBe(true);
    });

    test('getCommentByPostId', async () => {
        mockAxios.onGet("http://localhost:4000/post/998797540").reply(200, samplePost);
        const data = await postLib.getCommentByPostId(998797540);
        expect(data).toMatchObject(samplePost.comments);
    });

    test('postComment', async () => {
        mockAxios.onGet("http://localhost:4000/post/998797540").reply(200, samplePost);
        mockAxios.onPost("http://localhost:4000/comment").reply(200, sampleCommentResponse);
        mockAxios.onPut("http://localhost:4000/comment/208").reply(200, sampleCommentResponse);
        mockAxios.onPut("http://localhost:4000/post/998797540").reply(200, samplePost);
        mockAxios.onPut("http://localhost:4000/user/1").reply(200, sampleUser);

        const data1 = await postLib.postComment(998797540, -1, sampleComment);
        expect(data1).toBe(true);

        const data2 = await postLib.postComment(998797540, 208, sampleComment);
        expect(data2).toBe(true);
    });

    test('deleteCommentById', async () => {
        mockAxios.onGet("http://localhost:4000/post/998797540").reply(200, samplePost);
        mockAxios.onPut("http://localhost:4000/post/998797540").reply(200, samplePost);
        mockAxios.onGet("http://localhost:4000/user/1").reply(200, sampleUser);
        mockAxios.onPut("http://localhost:4000/user/1").reply(200, sampleUser);
        mockAxios.onDelete("http://localhost:4000/comment/101").reply(200, sampleUser);

        const data = await postLib.deleteCommentById(101, 998797540, "demo");
        expect(data).toBe(true);
    })

    test('postSave', async () => {
        mockAxios.onPost("http://localhost:8080/save").reply(200, true);
        const data = await postLib.postSave({});
        expect(data).not.toBeNull();
    });
});

describe("user", () => {
    const sampleUser = {
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
    const sampleUserArray = [
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
    ]
    test('getUserByName', async () => {
        mockAxios.onGet("http://localhost:4000/user?username=demo").reply(200, sampleUserArray
        )

        const data = await userLib.getUserByName("demo");
        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");
    })


    test('getUserById', async () => {
        mockAxios.onGet(`http://localhost:4000/user/1`).reply(200,
            sampleUser
        )
        const data = await userLib.getUserById(1);
        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getAllUserByIds', async () => {
        mockAxios.onGet(`http://localhost:4000/user/1`).reply(200,
            sampleUser
        )
        const data = (await userLib.getAllUserByIds([1, 1]))[0];

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('putUserById', async () => {
        mockAxios.onPut(`http://localhost:4000/user/1`).reply(200,
            sampleUser
        )
        const data = await userLib.putUserById(1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getFollowersById', async () => {
        mockAxios.onGet(`http://localhost:4000/follower?followingId=1`).reply(200,
            [
                {
                    "followerId": 123
                }
            ]
        )
        const data = (await userLib.getFollowersById(1))[0];

        expect(data).toBe(123);

    })


    test('getFollowMapRelationshipItem', async () => {
        mockAxios.onGet(`http://localhost:4000/following?followerId=1&followingId=1`).reply(200,
            sampleUser
        )
        const data = await userLib.getFollowMapRelationshipItem(1, 1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('getFollowMap', async () => {
        mockAxios.onGet(`http://localhost:4000/following`).reply(200,
            sampleUser
        )
        const data = await userLib.getFollowMap();

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('deleteFollowMapRelationshipItem', async () => {
        mockAxios.onDelete(`http://localhost:4000/following/1`).reply(200,
            sampleUser
        )
        const data = await userLib.deleteFollowMapRelationshipItem(1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('postFollowMapRelationshipItem', async () => {
        mockAxios.onPost(`http://localhost:4000/following`).reply(200,
            sampleUser
        )
        const data = await userLib.postFollowMapRelationshipItem();

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })
    test('getLikeMapRelationshipItem', async () => {
        mockAxios.onGet(`http://localhost:4000/like?postId=1&userId=1`).reply(200,
            sampleUser
        )
        const data = await userLib.getLikeMapRelationshipItem(1, 1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");
    })

    test('getLikeMapRelationshipItemByPostId', async () => {
        mockAxios.onGet(`http://localhost:4000/like?postId=1`).reply(200,
            sampleUser
        )
        const data = await userLib.getLikeMapRelationshipItem(1, 1);

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })

    test('postLikeMapRelationshipItem', async () => {
        mockAxios.onPost("http://localhost:4000/like").reply(200,
            sampleUser
        )
        const data = await userLib.postLikeMapRelationshipItem();

        expect(data).toBe(true);

    })


    test('deleteLikeMapRelationshipItemById', async () => {
        mockAxios.onDelete(`http://localhost:4000/like/1`).reply(200,
            sampleUser
        )
        const data = await userLib.deleteLikeMapRelationshipItemById(1);

        expect(data).toBe(true);

    })


    test('getDefaultUser', async () => {
        sessionStorage.setItem("CurrentUsername", "demo");
        mockAxios.onGet("http://localhost:4000/user?username=" + sessionStorage.getItem("CurrentUsername")).reply(200,
            sampleUser
        )
        const data = (await userLib.getDefaultUser()).data;

        expect(data.id).toBe(1);
        expect(data.username).toBe("demo");
        expect(data.firstName).toBe("Jack");

    })


})

