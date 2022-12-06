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
import {DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from "@mui/material";
import SignUpModal from "../components/login/SignUpModal";
import theme from "../theme";
import {ThemeProvider} from "@mui/material/styles";
import {login} from "../api/login";
import Dialog from '@mui/material/Dialog';
import LogoutIcon from "@mui/icons-material/Logout";

import {Navigate} from "react-router-dom";


export default function Login() {
    React.useEffect(() => {
        sessionStorage.clear();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" fixed>
                <CssBaseline/>
                <LoginComponent/>
            </Container>
        </ThemeProvider>
    );
}

export function LogoutDialog(){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        handleClose();
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <LogoutIcon variant="outlined" onClick={handleClickOpen} sx ={{position:"relative", top:-2}}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Logout confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogout} color="error"  autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



function LoginComponent() {
    const [ToFeed, setToFeed] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        login(data.get('username'), data.get('password')).then((success) => {
            if (success) {
                setToFeed(true);
            } else {
                alert("Wrong username or password")
            }
        });
    };

    if (ToFeed) {
        return (<Navigate to={'/'}/>);
    }


    return (
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
                        <Box id="loginForm" component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                aria-label="button-signIn"
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
