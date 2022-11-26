import React from "react";
import theme from "../../theme";
import {Button, Hidden, Typography} from "@mui/material";
import FollowButton from "../common/FollowButton";
import Box from "@mui/material/Box";
import {GearIcon} from "../../icons";

import {styles, useProfilePageStyles} from "./ProfileStyle";
import Link from "@mui/material/Link";

export function ProfileNameSection(props) {
    const useStyles = useProfilePageStyles(theme);

    return (
        <>
            <Hidden xsDown>
                <section style={styles.usernameSection}>
                    <Typography sx={styles.username}>{props.user.username}</Typography>
                    <div style={{paddingLeft: "20px"}}>
                        {!props.isOwner &&
                            <FollowButton targetUsername={props.user.username} handleFollower={props.handleFollower}
                                          side/>}
                    </div>
                </section>
            </Hidden>
            <Hidden smUp>
                <section>
                    <div style={styles.usernameDivSmall}>
                        <Typography sx={styles.username}>
                            {props.user.username}
                        </Typography>
                        {props.isOwner && (
                            <Box component="div"
                                 onClick={props.handleOptionsMenuClick}
                                 sx={useStyles.settingsWrapper}
                            >
                                <GearIcon sx={styles.settings}/>
                            </Box>
                        )}
                    </div>
                    {props.isOwner ? (
                        <Link href="#">
                            <Button variant="outlined" style={{width: "100%"}}>
                                Edit Profile
                            </Button>
                        </Link>
                    ) : (
                        <FollowButton targetUsername={props.user.username} handleFollower={props.handleFollower} side/>
                    )}
                </section>
            </Hidden>
        </>
    );
}