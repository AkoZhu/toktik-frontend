import Button from "@mui/material/Button";

export default function Home() {
    return (
        <div className="Home">
            <p>
                Hello World! Here is the home page!
            </p>
            <Button variant="contained" href="signup"> Sign Up </Button>
            <Button variant="outlined" href="login"> Log In </Button>
        </div>

    )
}