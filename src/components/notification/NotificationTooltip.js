import React from "react";
import { useNavbarStyles } from "../../styles";
import { Typography } from "@mui/material";

function NotificationTooltip() {
    const classes = useNavbarStyles();

    return (
        <div class={classes.tooltipContainer}>
            <div class={classes.tooltip}>
                <span aria-label="Followers" class={classes.followers} />
                <Typography>1</Typography>
            </div>
            <div class={classes.tooltip}>
                <span aria-label="Likes" class={classes.likes} />
                <Typography>1</Typography>
            </div>
        </div>
    );
}

export default NotificationTooltip;