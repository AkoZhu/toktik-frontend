import {fireEvent, getByLabelText, getByRole, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Login from "../pages/Login.js";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import FeedPage from "../pages/Feed";
import {BrowserRouter} from 'react-router-dom';
import Profile from "../pages/Profile";

const lib = require('../pages/Login.js');

const mockAxios = new MockAdapter(axios.create());

async function Mocklogin() {
    const response = await axios.get('http://localhost:4000/login');
    return response.data;
}

function MockSessionStorage() {
    sessionStorage.setItem("CurrentUsername", "demo");
}

describe("login", () => {


    test('renders Login_page', () => {
        const component = render(<Login/>);
        const inputNode = component.getByText("Username");
        const inputNode2 = component.getByText("Password");
        expect(inputNode).toBeInTheDocument();
        expect(inputNode2).toBeInTheDocument();
    });

    test('render Feeds_page', () => {
        const component = render(<FeedPage/>);
        const inputNode = component.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();

    });

    test('email input should accept text', () => {
        const component = renderer.create(<Login/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('email input should accept text', () => {
        const component = render(<Login/>);
        const inputNode = component.getByLabelText(/^Username/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "Username"}});
        expect(inputNode.value).toMatch("Username");


    });

    test('password input should accept text', () => {
        const component = render(<Login/>);
        const inputNode = component.getByLabelText(/^password/i);
        expect(inputNode.value).toMatch("");
        fireEvent.change(inputNode, {target: {value: "password"}});
        expect(inputNode.value).toMatch("password");


    });


    test("SessionStorage", () => {
        const username = "demo";
        MockSessionStorage();
        expect(sessionStorage.getItem("CurrentUsername")).toBe(username);
    })


    test("Redirect to feed page", async () => {

        const component = render(<Login/>, {wrapper: BrowserRouter})
        const user = userEvent.setup();

        // verify page content for default route
        expect(component.getByLabelText(/^Username/i)).toBeInTheDocument()

        const usernameNode = component.getByLabelText(/^Username/i);
        fireEvent.change(usernameNode, {target: {value: "demo"}});
        const pwdNode = component.getByLabelText(/^password/i);
        fireEvent.change(pwdNode, {target: {value: "123456"}});


        // verify page content for expected route after navigating
        setTimeout(() => {
            user.click(component.getByRole("button", {name: /button-signIn/i}))
        }, 1000);
        // const feedNode = component.getByRole("progressbar");
        // expect(feedNode).toBeInTheDocument()

    })


});

describe('the api returned correct data for philadelphia', () => {
    // seed data for all get requests. You can specify an endpoint to mock
    mockAxios.onGet().reply(200, {
        name: 'Philadelphia', main: {temp: 70},
    });
    test('the city is Philadelphia (then/catch)', () => Mocklogin().then((data) =>
        expect(data.success).toBe(true)));

    test('the city is Philadelphia (async/await)', async () => {
        const data = await Mocklogin();
        expect(data.success).toBe(true);
    });

});

// Login Axios.
describe('Login Axios.', () => {
    // seed data for all get requests. You can specify an endpoint to mock
    mockAxios.onGet().reply(200, {
        success: true
    });
    //
    // test('the city is Philadelphia (then/catch)', () => lib.LoginComponent().then((data) =>
    //     expect(data.name).toBe('Philadelphia')));

    test('the city is Philadelphia (async/await)', async () => {
        const data = await axios.get("http://localhost:4000/login");
        expect(data.data.success).toBe(true);
    });
    // test('the temperature is correct', () => lib.fetchWeather().then((data) => expect(data.main.temp).toBe(70)));
});

// Register Axios.
describe("Register.", () => {
    // seed data for all get requests. You can specify an endpoint to mock
    mockAxios.onGet().reply(200, {
        success: true
    });
    // mockAxios.onPost().reply(200,{
    //   success: true
    // })

    test('the city is Philadelphia (async/await)', async () => {
        const data = await axios.get("http://localhost:4000/signup");
        expect(data.data.success).toBe(true);
    });

    test("The Sign up Modal.", async () => {
        const component = render(<Login/>);

        const button = component.getByText("Don't have an account? Sign Up")
        fireEvent.click(button);


        // test Input
        const usernameNode = component.getByLabelText(/^Username/i);
        expect(usernameNode.value).toMatch("");
        fireEvent.change(usernameNode, {target: {value: "Username"}});
        expect(usernameNode.value).toMatch("Username");

        const firstNameNode = component.getByLabelText(/^First Name/i);
        expect(firstNameNode.value).toMatch("");
        fireEvent.change(firstNameNode, {target: {value: "FirstName"}});
        expect(firstNameNode.value).toMatch("FirstName");

        const lastNameNode = component.getByLabelText(/^Last Name/i);
        expect(lastNameNode.value).toMatch("");
        fireEvent.change(lastNameNode, {target: {value: "LastName"}});
        expect(lastNameNode.value).toMatch("LastName");

        const emailNode = component.getByLabelText(/^Email Address/i);
        expect(emailNode.value).toMatch("");
        fireEvent.change(emailNode, {target: {value: "emailName"}});
        expect(emailNode.value).toMatch("emailName");

        const passwordNode = component.getByLabelText(/^Password/i);
        expect(passwordNode.value).toMatch("");
        fireEvent.change(passwordNode, {target: {value: "Password"}});
        expect(passwordNode.value).toMatch("Password");

        const data = await axios.get("http://localhost:4000/signup");
        expect(data.data.success).toBe(true);

    })
})

describe("Feed page", () => {
    test("The Sign up Modal.", async () => {
        const component = render(<FeedPage />);
        const inputNode = await component.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    })
});

describe("profile page", () => {
    test("The Sign up Modal.", async () => {
        MockSessionStorage();
        const component = render(<Profile/>);
        const inputNode = await component.getByRole("progressbar");
        expect(inputNode).toBeInTheDocument();
    })


});







