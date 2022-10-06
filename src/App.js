import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedPage from "./pages/Feed";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="feed" element={<FeedPage/>} />
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
