import {useProfilePageStyles} from "./ProfileStyle";
import theme from "../../theme";
import {Divider, Hidden, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {getFollowingCountByUsername} from "../../api/user";

export function PostCountSection(props) {
    const useStyles = useProfilePageStyles(theme);
    const [followingCount, setFollowingCount] = React.useState();

    React.useEffect(() => {
        getFollowingCountByUsername(props.username).then((data) => {
            setFollowingCount(data);
        });
    }, [props.username]);


    return (
        <>
            <Hidden smUp>
                <Divider/>
            </Hidden>
            <Box
                component="section"
                sx={useStyles.followingSection}
            >
                <Box component="div" key="posts" sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {props.postCount}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>post(s)</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">post(s)</Typography>
                    </Hidden>
                </Box>
                <Box component="div" key="followers" sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {props.followerCount}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>follower(s)</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">follower(s)</Typography>
                    </Hidden>
                </Box>
                {followingCount && <Box component="div" key="following" sx={useStyles.followingText}>
                    <Typography sx={useStyles.followingCount}>
                        {followingCount}
                    </Typography>
                    <Hidden xsDown>
                        <Typography>following(s)</Typography>
                    </Hidden>
                    <Hidden smUp>
                        <Typography color="textSecondary">following(s)</Typography>
                    </Hidden>
                </Box>}

            </Box>
            <Hidden smUp>
                <Divider/>
            </Hidden>
        </>
    );
}