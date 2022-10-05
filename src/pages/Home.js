import Button from "@mui/material/Button";
import Navbar from "../components/common/Navbar";
import React from "react";
import Container from "@mui/material/Container";

export default function Home() {
    return (
        <div className="Home">
            <Navbar/>
            <Container sx={{marginTop: "75px"}}>
                <Button variant="outlined" href="login"> Log In </Button>
            </Container>
        </div>

    )
}
