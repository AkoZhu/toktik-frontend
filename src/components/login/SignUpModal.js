import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Modal from "@mui/material/Modal";
import axios from "axios";

const theme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    marginTop: '5px',
    height: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
};

export default function SignUpModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Don't have an account? Sign Up</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SignUp ToFeed={props.ToFeed} handleToFeed={props.handleToFeed}/>
                </Box>
            </Modal>
        </div>
    );
}

export function SignUp(props) {
    let defaultUser = {
        username: "default",
        firstName: "default",
        lastName: "default",
        email: "default@toktik.com",
        password: "123456",
        profilePicture: "https://ui-avatars.com/api/?rounded=true",
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
        posts: [],
    }

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        defaultUser.username = data.get('username')
        defaultUser.firstName = data.get('firstName')
        defaultUser.lastName = data.get('lastName')
        defaultUser.email = data.get('email')
        defaultUser.password = data.get('password')

        axios.post( 'http://localhost:4000/user', defaultUser).then(
            (response) => {
                if(response.data) {
                    console.log("Register succeed.")
                    sessionStorage.setItem("CurrentUsername", response.data.username)
                    sessionStorage.setItem("CurrentUserId", response.data.id)
                    axios.get('http://localhost:4000/following').then(
                        (res) => {
                            let followingMap = res.data
                            followingMap[response.data.id] = []
                            axios.post('http://localhost:4000/following', followingMap)
                        }
                    )
                    axios.get('http://localhost:4000/follower').then(
                        (res) => {
                            let followerMap = res.data
                            followerMap[response.data.id] = []
                            axios.post('http://localhost:4000/following', followerMap)
                        }
                    )
                    props.handleToFeed(true)
                }
                else {
                    console.log("Register fails.")
                }
            }
        )

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create your account
                    </Typography>
                    <Box id="RegisterForm" component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    type="username"
                                    id="username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="login"
                                      variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


