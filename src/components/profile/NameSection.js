import {useProfilePageStyles} from "./ProfileStyle";
import theme from "../../theme";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import React from "react";

export default function NameBioSection({user}) {
    const useStyles = useProfilePageStyles(theme);

    return (
        <Box component="section" sx={useStyles.followingSection}>
            <Typography sx={useStyles.followingText}>{user.name}</Typography>
        </Box>
    );
}