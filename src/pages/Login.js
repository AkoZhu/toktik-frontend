import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from "../assets/logo.png";
import {Paper} from "@mui/material";
import SignUpModal from "../components/login/SignUpModal";
import {Navigate} from "react-router-dom";
import axios from 'axios';
import theme from "../theme";
import {ThemeProvider} from "@mui/material/styles";

export default function Login() {

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" fixed>
                <CssBaseline/>
                <LoginComponent/>
            </Container>
        </ThemeProvider>
    );
}

function LoginComponent() {
    const [ToFeed, setToFeed] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.get(`http://localhost:4000/user?username=${data.get('username')}&password=${data.get('password')}`).then((response) => {
            console.log("login: " + response.data.length > 0)
            if (response.data.length > 0) {
                sessionStorage.setItem("CurrentUserId", response.data[0].id);
                sessionStorage.setItem("CurrentUsername", data.get('username'))
                setToFeed(true)
            } else {
                alert("Wrong username or password")
            }
        });
    };


    if (sessionStorage.getItem("CurrentUsername") && ToFeed) {
        return (
            <Navigate to="/"/>
        )
    } else return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '90vh', mt: "30px"}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={logo} className="logo" alt="logo" style={{width: '288x', height: '120px'}}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box id="loginForm" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button>
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <SignUpModal ToFeed={ToFeed} handleToFeed={setToFeed}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
