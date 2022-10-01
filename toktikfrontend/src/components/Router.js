import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}