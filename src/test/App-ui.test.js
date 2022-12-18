/* eslint-disable no-restricted-globals */
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import renderer, {act} from 'react-test-renderer';
import Login from "../pages/Login.js";
import FeedPage from "../pages/Feed";
import {BrowserRouter} from 'react-router-dom';
import Profile from "../pages/Profile";
import {login} from "../api/login";

let assignMock = jest.fn();

delete window.location;
window.location = {assign: assignMock};


// const token =

function mockLocalStorage() {
    localStorage.setItem("CurrentUsername", "demo");
    // localStorage.setItem("CurrentUserToken", );
}

describe("login", () => {


    beforeEach(async () => {
        // mockLocalStorage();
        await login("demo", "123456");
    });

    afterEach(() => {
        assignMock.mockClear();
    });

    test('renders login page', async () => {
        await render(<Login/>);
        const inputNode = screen.getByText("Username");
        const inputNode2 = screen.getByText("Password");
        expect(inputNode).toBeInTheDocument();
        expect(inputNode2).toBeInTheDocument();
    });

    test('username input should accept text', async () => {
        await render(<Login/>);
        const inputNode = screen.getByLabelText(/^Username/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "Username"}});
        expect(inputNode.value).toMatch("Username");
    });

    test('password input should accept text', async () => {
        await render(<Login/>);
        const inputNode = screen.getByLabelText(/^password/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "password"}});
        expect(inputNode.value).toMatch("password");
    });

    test("redirect to feed page", async () => {
        await render(<Login/>, {wrapper: BrowserRouter});

        // verify page content for default route
        expect(screen.getByLabelText(/^Username/i)).toBeInTheDocument();
    });

    test('snapshot', async () => {
        const component = renderer.create(<Login/>);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe("feed page", () => {
    beforeAll(async () => {
        // mockLocalStorage();
        await login("demo", "123456");
    });

    afterAll(() => {
        assignMock.mockClear();
    });

    test("render feed page", async () => {
        let inputNode;
        await act(async () => {
            render(<FeedPage/>);
        });
        // await render(<FeedPage/>);
        // const inputNode = screen.getByRole("progressbar");
        inputNode = screen.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    });

    test('snapshot', async () => {
        // let component;
        // let tree;
        // await act(async () => {
        //     component = renderer.create(<FeedPage/>);
        //     tree = component.toJSON();
        // });
        jest.useFakeTimers();
        const component = renderer.create(<FeedPage/>);
        const tree = component.toJSON();
        await act(() => {
            jest.advanceTimersByTime(5000);
        });
        // await waitFor(()=>{
        //     expect(tree).toMatchSnapshot();
        // })
        expect(tree).toMatchSnapshot();
    });
});

describe("profile page", () => {
    beforeAll(async () => {
        // mockLocalStorage();
        await login("demo", "123456");
    });

    afterAll(() => {
        assignMock.mockClear();
    });

    test("render feed page", async () => {

        await render(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );
        const inputNode = screen.getByRole("textbox");
        expect(inputNode).toBeInTheDocument();
    });

    test('snapshot', async () => {

        const component = renderer.create(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});







