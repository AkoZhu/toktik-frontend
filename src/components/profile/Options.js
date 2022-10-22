import React from "react";
import {styles, useProfilePageStyles} from "./ProfileStyle";
import theme from "../../theme";
import {Button, Dialog, DialogTitle, Divider, Typography, Zoom} from "@mui/material";

export function OptionsMenu({handleCloseMenu}) {
    const [showLogOutMessage, setLogOutMessage] = React.useState(false);

    const useStyles = useProfilePageStyles(theme);

    function handleLogOutClick() {
        setLogOutMessage(true);
    }

    return (
        <Dialog
            open
            sx={{
                scrollPaper: useStyles.dialogScrollPaper,
                paper: useStyles.dialogPaper
            }}
            TransitionComponent={Zoom}
        >
            {showLogOutMessage ? (
                <DialogTitle sx={styles.dialogTitle}>
                    Logging Out
                    <Typography color="textSecondary">
                        You need to log back in to continue using Instagram.
                    </Typography>
                </DialogTitle>
            ) : (
                <>
                    <OptionsItem text="Change Password"/>
                    <OptionsItem text="Nametag"/>
                    <OptionsItem text="Authorized Apps"/>
                    <OptionsItem text="Notifications"/>
                    <OptionsItem text="Privacy and Security"/>
                    <OptionsItem text="Log Out" onClick={handleLogOutClick}/>
                    <OptionsItem text="Cancel" onClick={handleCloseMenu}/>
                </>
            )}
        </Dialog>
    );
}

export function OptionsItem({text, onClick}) {
    return (
        <>
            <Button style={{padding: "12px 8px"}} onClick={onClick}>
                {text}
            </Button>
            <Divider/>
        </>
    );
}