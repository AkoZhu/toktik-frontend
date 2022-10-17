import React, {useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Autocomplete, Divider, ImageList, ImageListItem} from "@mui/material";
import Container from "@mui/material/Container";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";
import {friendsDemo} from "../../data";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
}



export default function ChangePostModal(props) {
    const [open, setOpen] = useState(false);

    const [privacy, setPrivacy] = useState(props.post.public)
    const [description, setDescription] = useState(props.post.description)
    const [tags, setTags] = useState(props.post.tagging)

    const postContent = props.post.postContent
    const type = props.post.type
    const username = props.post.username
    const id = props.post.id
    const comments = props.post.comments
    const totalLikes = props.post.totalLikes



    const handleOpen = () => {
        setOpen(true)
    }


    const handleClose = () => {
        setOpen(false);
    }

    const handleEdit= () => {
        console.log("edit post.")
        // Edit
        const postBody = {
            id: id,
            username: username,
            postType: type,
            postContent: postContent,
            description: description,
            public: privacy,
            totalLikes: totalLikes,
            tagging: tags,
            comments: comments,
        }
        console.log("Finish change")
        console.log(postBody)
    }

    const changePrivacy = (e) => {
        setPrivacy(e.target.value)
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
                onClose={handleClose}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
            >
                <Box sx={styles.newPostModal}>
                    <Typography variant="h5" textAlign="center">
                        Edit the post
                    </Typography>
                    <Divider/>
                    <ImageList sx={{width: 500, height: 297}} cols={3} rowHeight={164}>
                        <ImageListItem key={postContent}>
                            {
                                type === 0 ? (
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
                                        srcSet={postContent}
                                        alt={postContent}
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
                                               onChange={changePrivacy}/>}
                            label="Private?"
                            sx={{
                                position: "absolute",
                                right: "20%",
                            }}
                        />
                    </Container>
                </Box>
            </Modal>
        </>
    )
}