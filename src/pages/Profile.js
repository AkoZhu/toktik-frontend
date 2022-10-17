import React from "react";
import Layout from "../components/common/Layout";
import ProfilePicture from "../components/common/ProfilePicture";
import IconSheet from "../assets/icon-sheet.png";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    Divider,
    Hidden,
    Typography,
    Zoom,
} from "@mui/material";
import {Link} from "react-router-dom";
import {GearIcon} from "../icons";
import ProfileTabs from "../components/profile/ProfileTabs";
import Box from "@mui/material/Box";
import theme from "../theme"
import LoadingScreen from "../components/common/LoadingScreen";
import axios from "axios";

// const theme = createTheme()

const useProfilePageStyles = (theme) => {
    const followingSectionLarge = {
        display: "grid",
        gridAutoFlow: "column",
        gridGap: 40,
        // gridTemplateColumns:
        //     "minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content)"
        gridTemplateColumns:
            " max-content max-content max-content"
    };
    const followingTextLarge = {
        display: "grid",
        gridGap: 5,
        gridAutoFlow: "column",
        // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, max-content)"
        gridTemplateColumns: "max-content max-content"
    };
    return {
        container: {
            maxWidth: 935
        },
        followingSection: {
            [theme.breakpoints.up("sm")]: {
                ...followingSectionLarge
            },
            [theme.breakpoints.down("xs")]: {
                display: "grid",
                gridAutoFlow: "column",
                // padding: "10px 0"
                paddingTop: "10px",
                paddingRight: "0px",
            }
        },
        followingText: {
            [theme.breakpoints.up("sm")]: {
                ...followingTextLarge
            },
            [theme.breakpoints.down("xs")]: {
                display: "grid",
                justifyItems: "center",
                "& p": {
                    fontSize: "0.9rem"
                }
            }
        },
        followingCount: {
            fontWeight: "600 !important"
        },
        cardLarge: {
            background: "transparent !important",
            border: "unset !important",
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateColumns: "minmax(auto, 290px) minmax(auto, 645px)"
        },
        cardContentLarge: {
            display: "grid",
            gridGap: 20
        },
        cardSmall: {
            background: "transparent !important",
            border: "unset !important",
            [theme.breakpoints.down("xs")]: {
                width: "100vw"
            }
        },
        sectionSmall: {
            display: "grid",
            gridAutoFlow: "column",
            marginBottom: 16,
            gridTemplateColumns: "77px auto",
            gridGap: 20
        },
        typography: {
            fontWeight: "600 !important"
        },
        section: {
            "& p": {
                [theme.breakpoints.down("xs")]: {
                    fontSize: "0.9rem"
                }
            }
        },
        usernameSection: {
            display: "grid",
            gridGap: 10,
            gridAutoFlow: "column",
            gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
            alignItems: "center"
        },
        username: {
            fontSize: "28px !important",
            fontWeight: "300 !important"
        },
        button: {
            lineHeight: "unset !important",
            height: "30px !important"
        },
        settings: {
            height: 30,
            width: 30
        },
        settingsWrapper: {
            hover:
                {
                    '&:hover': {
                        cursor: "pointer"
                    }
                }
        },
        usernameDivSmall: {
            display: "grid",
            // gridGap: 20,
            gridAutoFlow: "column",
            // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
            alignItems: "center",
            gridTemplateColumns: "minmax(auto, max-content) 30px",

            gridGap: 10
        },
        dialogScrollPaper: {
            display: "grid !important",
            gridTemplateColumns: "minmax(auto, 480px) !important"
        },
        dialogPaper: {
            borderRadius: 12
        },
        dialogTitle: {
            textAlign: "center"
        },
        wrapper: {
            display: "grid",
            justifyContent: "center",
            paddingTop: "32px",
            paddingRight:"16px",
            paddingBottom: "16px"
        },
        avatar: {
            width: 90,
            height: 90
        },
        unfollowDialogScrollPaper: {
            display: "grid",
            gridTemplateColumns: "minmax(auto, 496px)"
        },
        cancelButton: {
            // padding: "12px 8px !important"
            paddingTop: "12px !important",
            paddingRight: "8px !important",
        },
        unfollowButton: {
            color: `${theme.palette.error.main} !important`,
            // padding: "12px 8px !important",
            paddingTop: "12px !important",
            paddingRight: "8px !important",
        },
        unfollowDialogText: {
            // padding: "16px 16px 32px !important"
            paddingTop: "16px !important",
            paddingRight: "16px !important",
            paddingBottom: "32px !important",
        },
        arrowIcon: {
            backgroundImage: `url(${IconSheet})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-187px -306px",
            height: "6px",
            width: "9px"
        },
        buttonSmall: {
            width: "30px",
            height: "30px",
            minWidth: "30px"
        },
        buttonSelected: {
            width: "30px !important",
            height: "30px !important",
            minWidth: "30px !important",
            opacity: "0.7 !important"
        }
    }
};

const styles = {
    container: {
        display: "grid",
        // gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 600px) 300px",
        gridGap: 35,
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "minmax(auto, 600px)",
            justifyContent: "center"
        },
        "&.slickSlider": {
            display: "grid"
        }
    },
    cardLarge: {
        background: "transparent !important",
        border: "unset !important",
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 290px) minmax(auto, 645px)"
    },
    cardContentLarge: {
        display: "grid",
        gridGap: 20,
        marginTop: "5%"
    },
    cardSmall: {
        background: "transparent !important",
        border: "unset !important",
        [theme.breakpoints.down("xs")]: {
            width: "100vw"
        }
    },
    sectionSmall: {
        display: "grid",
        gridAutoFlow: "column",
        marginBottom: 16,
        gridTemplateColumns: "77px auto",
        gridGap: 20
    },
    button: {
        lineHeight: "unset !important",
        height: "30px !important"
    },
    usernameSection: {
        display: "grid",
        gridGap: 10,
        gridAutoFlow: "column",
        // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
        gridTemplateColumns: "max-content max-content 30px",
        alignItems: "center"
    },
    username: {
        fontSize: "28px !important",
        fontWeight: "300 !important"
    },
    settingsWrapper: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    settings: {
        height: 30,
        width: 30
    },
    usernameDivSmall: {
        display: "grid",
        // gridGap: 20,
        gridAutoFlow: "column",
        // gridTemplateColumns: "minmax(auto, max-content) minmax(auto, 112px) 30px",
        alignItems: "center",
        gridTemplateColumns: "minmax(auto, max-content) 30px",
        gridGap: 10
    },
    unfollowDialogScrollPaper: {
        display: "grid",
        gridTemplateColumns: "minmax(auto, 496px)"
    },
    avatar: {
        width: ({ avatarSize = 44 }) => avatarSize,
        height: ({ avatarSize = 44 }) => avatarSize
    },
    unfollowDialogText: {
        padding: "16px 16px 32px !important"
    },
    unfollowButton: {
        color: `${theme.palette.error.main} !important`,
        padding: "12px 8px !important"
    },
    cancelButton: {
        padding: "12px 8px !important"
    },

}

function Profile() {
    const [showOptionsMenu, setOptionsMenu] = React.useState(false);
    const isOwner = true;
    const useStyles = useProfilePageStyles(theme);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        axios.get(
            'http://localhost:4000/user?username=' + sessionStorage.getItem('CurrentUsername')
        ).then(res => {
                setUser(res.data[0]);
                setLoading(false);
            }
        )
    }, []);


    function handleOptionsMenuClick() {
        setOptionsMenu(true);
    }

    function handleCloseMenu() {
        setOptionsMenu(false);
    }

    if (loading) return <LoadingScreen/>;

    return (
        <Layout
            title={`${user.firstName} (@${user.username})`}
        >
            <Box component="div" sx={useStyles.container}>
                <Hidden xsDown>
                    <Card sx={styles.cardLarge}>
                        <ProfilePicture isOwner={isOwner}/>
                        <CardContent sx={styles.cardContentLarge}>
                            <ProfileNameSection
                                user={user}
                                isOwner={isOwner}
                                handleOptionsMenuClick={handleOptionsMenuClick}
                            />
                            <PostCountSection user={user}/>
                            <NameBioSection user={user}/>
                        </CardContent>
                    </Card>
                </Hidden>
                <Hidden smUp>
                    <Card sx={styles.cardSmall}>
                        <CardContent>
                            <Box component="section" sx={styles.sectionSmall}>
                                <ProfilePicture size={77} isOwner={isOwner}/>
                                <ProfileNameSection
                                    user={user}
                                    isOwner={isOwner}
                                    handleOptionsMenuClick={handleOptionsMenuClick}
                                />
                            </Box>
                            <NameBioSection user={user}/>
                        </CardContent>
                        <PostCountSection user={user}/>
                    </Card>
                </Hidden>
                {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
                <ProfileTabs user={user} isOwner={isOwner}/>
            </Box>
        </Layout>
    );
}

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
    const [showUnfollowDialog, setUnfollowDialog] = React.useState(false);
    let followButton;
    const isFollowing = true;
    const isFollower = false;
    const useStyles = useProfilePageStyles(theme);
    if (isFollowing) {
        followButton = (
            <Button
                onClick={() => setUnfollowDialog(true)}
                variant="outlined"
                sx={styles.button}
            >
                Following
            </Button>
        );
    } else if (isFollower) {
        followButton = (
            <Button variant="contained" color="primary" sx={styles.button}>
                Follow Back
            </Button>
        );
    } else {
        followButton = (
            <Button variant="contained" color="primary" sx={styles.button}>
                Follow
            </Button>
        );
    }

    return (
        <>
            <Hidden xsDown>
                <section style={styles.usernameSection}>
                    <Typography sx={styles.username}>{user.username}</Typography>
                    {isOwner ? (
                        <>
                            <Link to="/accounts/edit">
                                <Button variant="outlined" color="inherit">Edit Profile</Button>
                            </Link>
                            <Box component="div"
                                onClick={handleOptionsMenuClick}
                                sx={useStyles.settingsWrapper}
                            >
                                <GearIcon sx={styles.settings} />
                            </Box>
                        </>
                    ) : (
                        <>{followButton}</>
                    )}
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
                                <GearIcon sx={styles.settings} />
                            </Box>
                        )}
                    </div>
                    {isOwner ? (
                        <Link to="/accounts/edit">
                            <Button variant="outlined" style={{ width: "100%" }}>
                                Edit Profile
                            </Button>
                        </Link>
                    ) : (
                        followButton
                    )}
                </section>
            </Hidden>
            {showUnfollowDialog && (
                <UnfollowDialog user={user} onClose={() => setUnfollowDialog(false)} />
            )}
        </>
    );
}

function UnfollowDialog({ onClose, user }) {

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
            <Divider />
            <Button sx={styles.unfollowButton}>Unfollow</Button>
            <Divider />
            <Button onClick={onClose} sx={styles.cancelButton}>
                Cancel
            </Button>
        </Dialog>
    );
}

function PostCountSection({ user }) {

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
                        {user.followingCount}
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
                        {user.followerCount}
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

function NameBioSection({ user }) {
    const useStyles = useProfilePageStyles(theme);

    return (
        <Box component="section" sx={useStyles.followingSection}>
            <Typography sx={useStyles.followingText}>{user.name}</Typography>
            {/*<Hidden smDown>*/}
            {/*    <Typography>{user.bio}</Typography>*/}
            {/*</Hidden>*/}
            {/*<a href={user.website} target="_blank" rel="noopener noreferrer">*/}
            {/*    <Typography color="secondary" sx={useStyles.typography}>*/}
            {/*        {user.website}*/}
            {/*    </Typography>*/}
            {/*</a>*/}
        </Box>
    );
}

function OptionsMenu({ handleCloseMenu }) {
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
                    <OptionsItem text="Change Password" />
                    <OptionsItem text="Nametag" />
                    <OptionsItem text="Authorized Apps" />
                    <OptionsItem text="Notifications" />
                    <OptionsItem text="Privacy and Security" />
                    <OptionsItem text="Log Out" onClick={handleLogOutClick} />
                    <OptionsItem text="Cancel" onClick={handleCloseMenu} />
                </>
            )}
        </Dialog>
    );
}

function OptionsItem({ text, onClick }) {
    return (
        <>
            <Button style={{ padding: "12px 8px" }} onClick={onClick}>
                {text}
            </Button>
            <Divider />
        </>
    );
}

export default Profile;
