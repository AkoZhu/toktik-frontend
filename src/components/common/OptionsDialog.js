import {createTheme} from "@mui/material/styles";
import {Dialog, Divider, Zoom} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {MoreIcon} from "../../icons";
import ChangePostModal from "./ChangePostModal";

export default function OptionDiag(props) {
    const theme = createTheme();
    const styles = {
        dialogScrollPaper: {
            display: "grid !important",
            gridTemplateColumns: "minmax(auto, 496px) !important",
        },
        button: {
            padding: "12px 8px !important",
            width: "400px !important",
            height: "auto"
        },
        redButton: {
            color: `${theme.palette.error.main} !important`,
            padding: "12px 8px !important",
            fontWeight: "bold !important"
        },
        moreIcon: {
            height: 24,
            width: 18,
            justifySelf: "center",
            "&:hover": {
                cursor: "pointer"
            }
        },
    }

    const post = props.post
    const [open, setOpen] = useState(false)

    const handleDelete = (e) => {
        console.log("Delete post")
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            <MoreIcon
                sx={styles.moreIcon}
                onClick={handleOpen}
            />
            <Dialog
                open={open}
                sx={{
                    scrollPaper: styles.dialogScrollPaper,
                }}
                onClose={handleClose}
                TransitionComponent={Zoom}
            >
                <Divider/>
                <ChangePostModal post={post}/>
                <Divider/>
                <Button sx={styles.redButton} onClick={handleDelete}> Delete </Button>
                <Divider/>
                <Button onClick={handleClose} styles={styles.button}>
                    Cancel
                </Button>
            </Dialog>

        </>
    )
}
