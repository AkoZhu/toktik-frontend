import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";
import React from "react";
import {FeedImage, FeedInfo} from "./FeedInPost";

const postModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 641,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    outline: "none",
};

export function PostModal(props) {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={postModalStyle}>
                <Grid container spacing={0}>
                    <Grid item xs={6} sx={{background: "#000000"}}>
                        <FeedImage post={props.post} index={props.key}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FeedInfo post={props.post} index={props.key}/>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )

}
