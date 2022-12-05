import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Autocomplete, Divider, IconButton, ImageList, ImageListItem, Snackbar} from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {getFollowerNamesByUsername} from "../../api/user";
import {postSaveOne, putPostsById} from "../../api/post";
import {saveFileServeEndpoint} from "../../api/client";

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
    let post = props.post;

    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [postType, setPostType] = useState(post.postType);
    const [postContent, setPostContent] = useState(post.postContent);
    const [mediaFile, setMediaFile] = useState(null);

    const [privacy, setPrivacy] = useState(post.public)
    const [description, setDescription] = useState(post.description)
    const [tags, setTags] = useState(post.tagging)
    const [friends, setFriends] = useState([])

    React.useEffect(() => {
        getFollowerNamesByUsername(sessionStorage.getItem("CurrentUsername")).then((friends) => {
            setFriends(friends)
        });
    }, [])

    const clearState = () => {
        setPrivacy(post.public)
        setDescription(post.description)
        setTags(post.tagging)
        setPostContent(post.postContent)
        setShowAlert(false)
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleEdit = async () => {
        const upload = async (mediaFile) => {
            const formData = new FormData();
            formData.append("file", mediaFile);
            const response = (await postSaveOne(formData)).file;
            post.postType = response.type;
            setPostType(response.type);
            post.postContent = saveFileServeEndpoint + response.filename;

        }

        if (mediaFile) await upload(mediaFile);
        post.public = !privacy;
        post.description = description;
        post.tagging = tags;

        await putPostsById(post._id, post);
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)

        window.location.reload()
    }

    const changePrivacy = (e) => {
        setPrivacy(e.target.value);
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const changeTags = (e, values) => {
        setTags(values)
    }

    const handleReplaceMedia = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setPostContent(URL.createObjectURL(file));
        setPostType(file.type.startsWith('image/') ? 0 : 1);
        setMediaFile(file)
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
                            <IconButton component="label" aria-label="replace picture"
                                        sx={{position: "absolute", top: "0%", left: "0%", color: "cyan"}}>
                                <ChangeCircleIcon/>
                                <input id="image-replace-input" hidden accept="image/*,video/*" type="file"
                                       onChange={handleReplaceMedia}/>
                            </IconButton>
                            {postType === 0 ? (
                                <img
                                    src={postContent}
                                    srcSet={postContent}
                                    alt={postContent}
                                    height="240px"
                                    loading="lazy"
                                />
                            ) : (
                                <video
                                    src={postContent}
                                    height="240px"
                                    controls
                                />
                            )}

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
                            options={friends}
                            getOptionLabel={(username) => "@" + username}
                            filterSelectedOptions
                            sx={{marginTop: "10px"}}
                            onChange={changeTags}
                            value={tags}
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

                    {showAlert && <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center',}}
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
