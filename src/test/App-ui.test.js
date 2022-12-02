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

    test('renders login page', async () => {
        const view = await render(<Login/>);
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

    test('username input should accept text', async () => {
        const view = await render(<Login/>);
        const inputNode = view.getByLabelText(/^Username/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "Username"}});
        expect(inputNode.value).toMatch("Username");


    });

    test('password input should accept text', async () => {
        const view = await render(<Login/>);
        const inputNode = view.getByLabelText(/^password/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "password"}});
        expect(inputNode.value).toMatch("password");


    });


    test("sessionStorage", () => {
        const username = "demo";
        mockSessionStorage();
        expect(sessionStorage.getItem("CurrentUsername")).toBe(username);
        sessionStorage.clear();
    })


    test("redirect to feed page", async () => {
        const view = await render(<Login/>, {wrapper: BrowserRouter})
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






describe("feed page", () => {
    test("render feed page", async () => {
        const view = await render(<FeedPage/>);
        const inputNode = await view.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    })
    test('snapshot', async () => {
        const component = renderer.create(<FeedPage/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        await act(async () => await render(<FeedPage/>));
    });
    test("render feed page", async () => {
        mockSessionStorage();
        const view = await render(<FeedPage/>);
        setTimeout(async () => {
            const feed_1 = view.getByText("Load More");
            fireEvent.click(feed_1);
            await act(async () => await render(<FeedPage/>));
        }, 1000)
    })
});

describe("profile page", () => {
    test("render profile page", async () => {

        const view = await render(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );
        setTimeout(async () => {
            const inputNode = await view.getByRole("progressbar");
            expect(inputNode).toBeInTheDocument();

        }, 1000)
    });
    test('snapshot', async () => {
        ``

        const component = renderer.create(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );
        setTimeout(async () => {
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            mockSessionStorage();
        }, 1000)
    });
    test("check profile page element", async () => {
        mockSessionStorage();
        const view = await render(<FeedPage/>);
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







