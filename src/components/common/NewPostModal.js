import React, {useState} from "react";
import Link from "@mui/material/Link";
import {AddIcon} from "../../icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Autocomplete, Divider, ImageList, ImageListItem, Snackbar} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {getUserById, updateAllPosts} from "../../utils";
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
}



export default function NewPostModal(props) {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [uploadedImages, setUploadedImages] = useState([]);
    const [privacy, setPrivacy] = useState(true)
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [friends, setFriends] = useState([])

    React.useEffect(() => {
        axios.get(`http://localhost:4000/follower?followingId=${sessionStorage.getItem("CurrentUserId")}`).then((response) => {
            let friendsId = []
            for (let follower of response.data) {
                friendsId.push(follower.followerId);
            }

            console.log(friendsId)

            let friendsUsername = []
            Promise.all(getUserById(friendsId, friendsUsername)).then(() => {
                setFriends(friendsUsername)
            })
        })

    }, [])

    const clearState = () => {
        setUploadedImages([])
        setPrivacy(true)
        setDescription('')
        setTags([])
        setOpen(false)
    }

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
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

    const handleUploadClose = () => {
        let posts = []
        if (uploadedImages.length === 0) return;

        let formData = new FormData();

        for (let img of uploadedImages) {
            formData.append("file[]", img.file);
        }

        axios.post("http://localhost:8080/save", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(r => {
            for (let file of r.data.file) {
                posts.push({
                    username: sessionStorage.getItem("CurrentUsername"),
                    postType: file.type,
                    postContent: "http://localhost:3000/images/" + file.filename,
                    description: description,
                    public: !privacy,
                    totalLikes: 0,
                    tagging: tags,
                    comments: []
                })
            }

            axios.get("http://localhost:4000/user?username=" + sessionStorage.getItem("CurrentUsername")).then(r => {
                let user = r.data[0];
                Promise.all(updateAllPosts(posts, user)).then((res) => {
                    axios.put("http://localhost:4000/user/" + user.id, user).then(() => {
                        setShowAlert(true)
                        setTimeout(() => {
                            setShowAlert(false)
                        }, 3000)

                        window.location.reload()
                    });
                });
            });
        })
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const files = document.getElementById("image-upload-input").files;
        if (files.length === 0) {
            console.log("No file selected!");
        } else {
            let images = [];
            for (const file of files) {
                const image = {
                    name: file.name,
                    size: file.size,
                    type: file.type.startsWith("image/") ? 0 : 1,
                    file: file,
                    url: URL.createObjectURL(file)
                };
                images.push(image);
            }

            setUploadedImages(images);
        }
    }

    return (
        <>
            <Link href="#" onClick={handleClick}><AddIcon/></Link>

            <Modal
                open={open}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
                onClose={() => clearState()}
            >
                <Box sx={styles.newPostModal}>
                    <Typography variant="h5" textAlign="center">
                         Create a new post
                    </Typography>
                    <Divider/>
                    {uploadedImages.length > 0 ? (
                        <ImageList sx={{width: 500, height: 297}} cols={3} rowHeight={164}>
                            {uploadedImages.map((item) => (
                                <ImageListItem key={item.url}>
                                    {
                                        item.type === 0 ? (
                                            <img
                                                src={item.url}
                                                srcSet={item.url}
                                                alt={item.name}
                                                height="120px"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <video
                                                src={item.url}
                                                srcSet={item.url}
                                                alt={item.name}
                                                height="120px"
                                                loading="lazy"
                                                controls
                                            />
                                        )
                                    }

                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
                        <Container sx={styles.newPostWrapper}>
                            <Button variant="text" component="label" sx={{
                                height: "180px",
                                width: "180px",
                            }}>
                                <UploadFileIcon sx={{height: "100%", width: "100%", color: "black"}}/>
                                <input id="image-upload-input" hidden accept="image/*,video/*" multiple type="file"
                                       onChange={handleUpload}/>
                            </Button>
                        </Container>
                    )}

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
                            getOptionLabel={(option) => "@" + option.username}
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
                        <Button variant="contained" onClick={handleUploadClose}>
                            Upload
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
                    { showAlert && <Snackbar
                        anchorOrigin={{ vertical: 'top',horizontal: 'center', }}
                        open={open}
                        message="Successful"
                    >
                        <Alert severity="success">Post Uploaded Successful!</Alert>
                    </Snackbar>}
                </Box>
            </Modal>
        </>
    )
}
