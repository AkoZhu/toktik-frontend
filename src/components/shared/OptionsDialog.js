import React from "react";
import { Dialog, Zoom, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { defaultPost } from "../../data";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

export const optionsDialogStyles = {
    dialogScrollPaper: {
        display: "grid !important",
        gridTemplateColumns: "minmax(auto, 496px) !important"
    },
    button: {
        padding: "12px 8px !important"
    },
    redButton: {
        color: `${theme.palette.error.main} !important`,
        padding: "12px 8px !important",
        fontWeight: "bold !important"
    }
};

function OptionsDialog({ onClose }) {
    return (
        <Dialog
            open={false}
            classes={{
                scrollPaper: classes.dialogScrollPaper
            }}
            onClose={onClose}
            TransitionComponent={Zoom}
         >
            <Button className={classes.redButton}>Unfollow</Button>
            <Divider />
            <Button className={classes.button}>
                <Link to={`/p/${defaultPost.id}`}>Go to post</Link>
            </Button>
            <Divider />
            <Button className={classes.button}>Share</Button>
            <Divider />
            <Button className={classes.button}>Copy Link</Button>
            <Divider />
            <Button onClick={onClose} className={classes.button}>
                Cancel
            </Button>
        </Dialog>
    );
}

export default OptionsDialog;
