/* eslint testing-library/prefer-screen-queries: "off", testing-library/no-await-sync-query: "off" */

import {fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer, {act} from 'react-test-renderer';
import Login from "../pages/Login.js";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FeedPage from "../pages/Feed";
import {BrowserRouter} from 'react-router-dom';
import Profile from "../pages/Profile";

const mockAxios = new MockAdapter(axios.create());

async function mockLogin() {
    const response = await axios.get('http://localhost:4000/login');
    return response.data;
}

function mockSessionStorage() {
    sessionStorage.setItem("CurrentUsername", "demo");
    sessionStorage.setItem("CurrentUserId", "1");
}

describe("login", () => {

    test('renders login page', () => {
        const view = render(<Login/>);
        const inputNode = view.getByText("Username");
        const inputNode2 = view.getByText("Password");
        expect(inputNode).toBeInTheDocument();
        expect(inputNode2).toBeInTheDocument();
    });

    test('snapshot', () => {
        const component = renderer.create(<Login/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('username input should accept text', () => {
        const view = render(<Login/>);
        const inputNode = view.getByLabelText(/^Username/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "Username"}});
        expect(inputNode.value).toMatch("Username");


    });

    test('password input should accept text', () => {
        const view = render(<Login/>);
        const inputNode = view.getByLabelText(/^password/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "password"}});
        expect(inputNode.value).toMatch("password");


    });


    test("sessionStorage", () => {
        const username = "demo";
        mockSessionStorage();
        expect(sessionStorage.getItem("CurrentUsername")).toBe(username);
    })


    test("redirect to feed page", async () => {
        const view = render(<Login/>, {wrapper: BrowserRouter})
        const user = userEvent.setup();

        // verify page content for default route
        expect(view.getByLabelText(/^Username/i)).toBeInTheDocument()

        const usernameNode = view.getByLabelText(/^Username/i);
        fireEvent.change(usernameNode, {target: {value: "demo"}});
        const pwdNode = view.getByLabelText(/^password/i);
        fireEvent.change(pwdNode, {target: {value: "123456"}});

        // verify page content for expected route after navigating
        await user.click(view.getByRole("button", {name: /button-signIn/i}))

    })
});

describe('the signup api should return success', () => {
    // seed data for all get requests. You can specify an endpoint to mock
    test('signup async', async () => {
        const data = await mockLogin();
        expect(data.success).toBe(true);
    });
});

// Login Axios.
describe('login axios.', () => {
    // seed data for all get requests. You can specify an endpoint to mock
    mockAxios.onGet().reply(200, {
        success: true
    });

    test('check login api', async () => {
        const data = await axios.get("http://localhost:4000/login");
        expect(data.data.success).toBe(true);
    });
});

// Register Axios.
describe("register.", () => {
    // seed data for all get requests. You can specify an endpoint to mock
    mockAxios.onGet().reply(200, {
        success: true
    });

    test('check signup api', async () => {
        const data = await axios.get("http://localhost:4000/signup");
        expect(data.data.success).toBe(true);
    });

    test("render login", async () => {
        const view = render(<Login/>);

        const button = view.getByText("Don't have an account? Sign Up")
        fireEvent.click(button);

        // test Input
        const usernameNode = view.getByLabelText(/^Username/i);
        expect(usernameNode.value).toMatch("");
        fireEvent.change(usernameNode, {target: {value: "Username"}});
        expect(usernameNode.value).toMatch("Username");

        const firstNameNode = view.getByLabelText(/^First Name/i);
        expect(firstNameNode.value).toMatch("");
        fireEvent.change(firstNameNode, {target: {value: "FirstName"}});
        expect(firstNameNode.value).toMatch("FirstName");

        const lastNameNode = view.getByLabelText(/^Last Name/i);
        expect(lastNameNode.value).toMatch("");
        fireEvent.change(lastNameNode, {target: {value: "LastName"}});
        expect(lastNameNode.value).toMatch("LastName");

        const emailNode = view.getByLabelText(/^Email Address/i);
        expect(emailNode.value).toMatch("");
        fireEvent.change(emailNode, {target: {value: "emailName"}});
        expect(emailNode.value).toMatch("emailName");

        const passwordNode = view.getByLabelText(/^Password/i);
        expect(passwordNode.value).toMatch("");
        fireEvent.change(passwordNode, {target: {value: "Password"}});
        expect(passwordNode.value).toMatch("Password");

        const data = await axios.get("http://localhost:4000/signup");
        expect(data.data.success).toBe(true);

    })
})

describe("feed page", () => {
    test("render feed page", async () => {
        const view = render(<FeedPage/>);
        const inputNode = await view.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    })
    test('snapshot', async () => {
        const component = renderer.create(<FeedPage/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        await act(async () => render(<FeedPage/>));
    });
    test("render feed page", async () => {
        mockSessionStorage();
        const view = render(<FeedPage/>);
        setTimeout(async () => {
            const feed_1 = view.getByText("Load More");
            fireEvent.click(feed_1);
            await act(async () => render(<FeedPage/>));
        },1000)
    })
});

describe("profile page", () => {
    test("render profile page", async () => {
        const view = render(<Profile/>);
        const inputNode = await view.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    })
    test('snapshot', () => {
        const component = renderer.create(<Profile/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("check profile page element", async ()=> {
        mockSessionStorage();
        const view = render(<FeedPage/>);
        setTimeout(() => {
            const inputNode = view.getByRole("progressbar");
            const inputNode2 = screen.queryByTestId('profile_1');
            const profile_2 = screen.getByTestId('profile_2');
            const profile_3 = screen.getByTestId('profile_3');
            const profile_4 = screen.getByTestId('profile_4');
            expect(inputNode2).toBeInTheDocument();
            expect(inputNode).toBeInTheDocument();
            expect(profile_2).toBeInTheDocument();
            expect(profile_3).toBeInTheDocument();
            expect(profile_4).toBeInTheDocument();

        }, 1000)
    })
});







