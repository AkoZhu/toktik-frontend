import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import logo from "../assets/logo.png";
import {Paper} from "@mui/material";
import SignUpModal from "../components/login/SignUpModal";
import { Navigate } from "react-router-dom";
import axios, * as others from 'axios';
import LoadingScreen from "../components/common/LoadingScreen";

const endpoint = 'http://localhost:4000/';

// export const getTotalPayout = async (data) => {
//     const response = await axios.get(`${endpoint}get-total-payout`, { params: userId });
//     return response.data;
// };

const theme = createTheme();

export default function Login() {

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" fixed>
                <CssBaseline/>
                <LoginComponent/>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

function LoginComponent() {
    const [ToFeed, setToFeed] = useState(false);
    const [Loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        sessionStorage.setItem("CurrentUsername", data.get('username'))
        setLoading(true)
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });



        const res = axios.get('http://localhost:4000/login').then((response) => {

            console.log(response.data)
            setToFeed(response.data.success)
            console.log("ToFeed: " + ToFeed)
        });

        console.log("Loading: " + Loading)
    };

    if(Loading && !ToFeed){
        console.log(Loading)
        console.log(ToFeed)
        return (
            <LoadingScreen/>
        )
    }else if(Loading && ToFeed){
        console.log(ToFeed);
        // return redirect("/feed");
        return (
            <Navigate to="/feed"/>
        )

    }else return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '90vh', mt: "30px" }}>
                <CssBaseline />
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
                                <SignUpModal Loading={Loading} handleLoading={setLoading} ToFeed={ToFeed} handleToFeed={setToFeed}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://toktik.com/">
                TokTik
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
