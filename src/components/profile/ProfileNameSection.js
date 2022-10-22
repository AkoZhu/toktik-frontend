import React from "react";
import theme from "../../theme";
import {Button, Hidden, Typography} from "@mui/material";
import FollowButton from "../common/FollowButton";
import Box from "@mui/material/Box";
import {GearIcon} from "../../icons";
import {Link} from "react-router-dom";
import {styles, useProfilePageStyles} from "./ProfileStyle";
import {UnfollowDialog} from "./UnfollowDialog";

export function ProfileNameSection({user, isOwner, handleOptionsMenuClick, setFollowNum}) {
    const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
    const useStyles = useProfilePageStyles(theme);

    return (
        <>
            <Hidden xsDown>
                <section style={styles.usernameSection}>
                    <Typography sx={styles.username}>{user.username}</Typography>
                    <div style={{paddingLeft: "20px"}}>
                        {!isOwner && <FollowButton targetUsername={user.username} side setFollowNum={setFollowNum}/>}
                    </div>
                </section>
            </Hidden>
            <Hidden smUp>
                <section>
                    <div style={styles.usernameDivSmall}>
                        <Typography sx={styles.username}>
                            {user.username}
                        </Typography>
                        {isOwner && (
                            <Box component="div"
                                 onClick={handleOptionsMenuClick}
                                 sx={useStyles.settingsWrapper}
                            >
                                <GearIcon sx={styles.settings}/>
                            </Box>
                        )}
                    </div>
                    {isOwner ? (
                        <Link href="#">
                            <Button variant="outlined" style={{width: "100%"}}>
                                Edit Profile
                            </Button>
                        </Link>
                    ) : (
                        <FollowButton targetUsername={user.username} side setFollowNum={setFollowNum}/>
                    )}
                </section>
            </Hidden>
            {showUnfollowDialog && (
                <UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)}/>
            )}
        </>
    );
}