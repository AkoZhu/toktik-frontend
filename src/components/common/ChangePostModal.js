import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Autocomplete, Divider, ImageList, ImageListItem, Snackbar} from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {friendsDemo} from "../../data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const styles = {
    newPostModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 502,
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    newPostWrapper: {
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "24px",
        paddingBottom: "24px",
        textAlign: 'center',
        marginTop: "10%",
        marginBottom: "10%"
    },
    uploadButtonWrapper: {
        marginTop: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        padding: "12px 8px !important",
        width: "400px !important",
        height: "auto"
    },
    alert: {
        transform: "translateY(-50%)",
    }
}



export default function ChangePostModal(props) {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const post = props.post
    console.log(post.public)
    console.log("post: "+ post.postType)
    console.log(post.id)
    const [privacy, setPrivacy] = useState(post.public)
    const [description, setDescription] = useState(post.description)
    const [tags, setTags] = useState(post.tagging)

    const clearState = () => {
        setPrivacy(true)
        setDescription('')
        setTags([])
        setShowAlert(false)
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleEdit = () => {
        const postBody = {
            id: post.id,
            username: post.username,
            postType: post.postType,
            postContent: post.postContent,
            description: description,
            public: privacy,
            totalLikes: post.totalLikes,
            tagging: tags,
            comments: post.comments,
        }

        console.log(postBody)

        axios.get("http://localhost:4000/user?username=" + sessionStorage.getItem("CurrentUsername")).then((response) => {
            const user = response.data[0]
            const newPosts = user.posts.map((p) => {
                if (p.id === post.id) {
                    return postBody
                }
                return p
            })
            const newUser = {
                ...user,
                posts: newPosts
            }
            axios.put("http://localhost:4000/user/" + user.id, newUser).then(() => {
                axios.put("http://localhost:4000/post/" + post.id, postBody).then(() => {
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 3000)

                    window.location.reload()
                })
            })
        })
    }

    const changePrivacy = (e) => {
        setPrivacy(e.target.value === false)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeTags = (e, values) => {
        setTags(values)
    }

    return (
        <>
            <Button sx={styles.button} onClick={handleOpen}> Edit </Button>

            <Modal
                open={open}
                onClose={() => clearState()}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
            >
                <Box sx={styles.newPostModal}>
                    <Typography variant="h5" textAlign="center">
                        Edit the post
                    </Typography>
                    <Divider/>
                    <ImageList sx={{width: 500, height: 297}} cols={3} rowHeight={164}>
                        <ImageListItem key={post.postContent}>
                            {
                                post.postType === 0 ? (
                                    <img
                                        src={post.postContent}
                                        srcSet={post.postContent}
                                        alt={post.postContent}
                                        height="240px"
                                        loading="lazy"
                                    />
                                ) : (
                                    <video
                                        src={post.postContent}
                                        srcSet={post.postContent}
                                        alt={post.postContent}
                                        height="240px"
                                        loading="lazy"
                                        controls
                                    />
                                )
                            }

                        </ImageListItem>
                    </ImageList>

                    <Container>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            size="medium"
                            multiline
                            rows={4}
                            fullWidth
                            value={description}
                            onChange={changeDescription}
                        />
                        <Autocomplete
                            multiple
                            options={friendsDemo}
                            getOptionLabel={(option) => "@" + option.username}
                            filterSelectedOptions
                            sx={{marginTop: "10px"}}
                            onChange={changeTags}
                            value = {tags}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tag your friends"
                                    placeholder="More"
                                />
                            )}
                        />
                    </Container>
                    <Container sx={styles.uploadButtonWrapper}>
                        <Button variant="contained" onClick={handleEdit}>
                            Edit
                        </Button>
                        <FormControlLabel
                            control={<Checkbox inputProps={{'aria-label': 'controlled'}} value={privacy}
                                               onChange={changePrivacy} defaultChecked={!privacy}/>}
                            label="Private?"
                            sx={{
                                position: "absolute",
                                right: "20%",
                            }}
                        />
                    </Container>

                    { showAlert && <Snackbar
                        anchorOrigin={{ vertical: 'top',horizontal: 'center', }}
                        open={open}
                        message="Successful"
                    >
                        <Alert severity="success">Post Edited Successful!</Alert>
                    </Snackbar>}
                </Box>
            </Modal>
        </>
    )
}
