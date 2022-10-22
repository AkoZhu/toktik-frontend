import {Avatar, Button, Dialog, Divider, Typography, Zoom} from "@mui/material";
import {styles} from "./ProfileStyle";
import React from "react";

export function UnfollowDialog({onClose, user}) {

    return (
        <Dialog
            open
            styles={{
                scrollPaper: styles.unfollowDialogScrollPaper
            }}
            onClose
            TransitionComponent={Zoom}
        >
            <div style={styles.wrapper}>
                <Avatar
                    src={user.profilePicture}
                    alt={`${user.username}'s avatar`}
                    sx={styles.avatar}
                />
            </div>
            <Typography
                align="center"
                variant="body2"
                sx={styles.unfollowDialogText}
            >
                Unfollow @{user.username}?
            </Typography>
            <Divider/>
            <Button sx={styles.unfollowButton}>Unfollow</Button>
            <Divider/>
            <Button onClick={onClose} sx={styles.cancelButton}>
                Cancel
            </Button>
        </Dialog>
    );
}