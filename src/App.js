import './App.css';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedPage from "./pages/Feed";
import Profile from "./pages/Profile";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<FeedPage/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="profile/:username" element={<Profile/>}/>
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
