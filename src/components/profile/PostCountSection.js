import {useProfilePageStyles} from "./ProfileStyle";
import theme from "../../theme";
import {Divider, Hidden, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export function PostCountSection({ user , followNum}) {

    const options = ["posts", "followers", "following"];


    const useStyles = useProfilePageStyles(theme);
    return (
        <>
            <Hidden smUp>
                <Divider />
            </Hidden>
            <Box
                component="section"
                sx={useStyles.followingSection}
            >
                <Box component="div" key={options[0]} sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {user[options[0]].length}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>{options[0]}</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">{options[0]}</Typography>
                    </Hidden>
                </Box>
                <Box component="div" key={options[1]} sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {followNum}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>{options[1]}</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">{options[0]}</Typography>
                    </Hidden>
                </Box>
                <Box component="div" key={options[2]} sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {user.followingCount}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>{options[2]}</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">{options[2]}</Typography>
                    </Hidden>
                </Box>

            </Box>
            <Hidden smUp>
                <Divider />
            </Hidden>
        </>
    );
}