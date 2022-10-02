import './App.css';
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function App() {
    return (
        <div className="App">
            <Router/>
            {/*<header className="App-header">*/}
            {/*</header>*/}
        </div>
    );
}


export default App;
