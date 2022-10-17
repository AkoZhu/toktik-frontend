import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Grid, Typography, styled, Paper} from "@mui/material";
import React from "react";
import FeedPost from "../feed/FeedPost";
import {FeedImage, FeedInfo} from "./FeedInPost";

const postModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    outline:"none",
};

export function PostModal(props) {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {/*<Box sx={postModalStyle}>*/}
            {/*    <Typography id="modal-modal-title" variant="h6" component="h2">*/}
            {/*        Text in a modal*/}
            {/*    </Typography>*/}
            {/*    <Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
            {/*        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
            {/*    </Typography>*/}
            {/*</Box>*/}
            <Box sx={postModalStyle}>
                <Grid container spacing={0} sx={{height:"100%"}}>
                    <Grid item xs={7}>
                        {/*<Item>xs=8</Item>*/}
                        {/*<p> Here is the feed post. </p>*/}
                        <FeedImage post={props.post} index={props.key}/>
                    </Grid>
                    <Grid item xs={5}>
                        {/*<Item>xs=4</Item>*/}
                        {/*<p> Here is the comments</p>*/}
                        <FeedInfo post={props.post} index={props.key}/>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )

}