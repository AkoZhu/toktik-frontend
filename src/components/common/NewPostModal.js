import React, {useState} from "react";
import Link from "@mui/material/Link";
import {AddIcon} from "../../icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Autocomplete, Divider, ImageList, ImageListItem} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
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



export default function NewPostModal(props) {
    const [open, setOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);

    console.log("test")

    console.log("test2")

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setUploadedImages([]);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        console.log("uploading");
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
                    url: URL.createObjectURL(file)
                };
                console.log(image);
                images.push(image);
            }

            setUploadedImages(images);
        }
    }

    const handleEdit= () => {
        console.log("edit post.")
    }

    return (
        <>

            <Link href="#" onClick={handleClick}><AddIcon/></Link>

            {/*<Link href="#" onClick={handleClick}><AddIcon/></Link>*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-new-post"
                aria-describedby="modal-new-post"
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
                            />

                        <Autocomplete
                            multiple
                            options={friendsDemo}
                            getOptionLabel={(option) => "@" + option.username}
                            filterSelectedOptions
                            sx={{marginTop: "10px"}}
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
                        <Button variant="contained" onClick={handleClose}>
                            Upload
                        </Button>
                        <FormControlLabel
                            control={<Checkbox inputProps={{'aria-label': 'controlled'}}/>}
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