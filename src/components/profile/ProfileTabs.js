import React from "react";
import {Divider, Hidden, Tab, Tabs, Typography} from "@mui/material";
import {GridIcon, SaveIcon} from "../../icons";
import GridPost from "../common/GridPost";
// import {createTheme} from "@mui/material/styles";
import IconSheet from "../../assets/icon-sheet.png";
import IconSheet2 from "../../assets/icon-sheet-2.png";
import theme from "../../theme";
import Box from "@mui/material/Box";

const useProfileTabsStyles = (theme) => {
    const postsIconSmallGrey = {
        ...commonIconProps,
        backgroundImage: `url(${IconSheet})`,
        backgroundPosition: "-331px -199px",
        backgroundSize: "355px 344px",
        height: 24,
        width: 24
    };
    const savedIconSmallGrey = {
        ...commonIconProps,
        backgroundImage: `url(${IconSheet})`,
        backgroundPosition: "-50px -320px",
        backgroundSize: "355px 344px",
        height: 24,
        width: 24
    };
    return {
        tabs: {
            borderBottom: "1px solid rgba(var(--b38,219,219,219),1)"
        },
        section: {
            [theme.breakpoints.up("sm")]: {
                marginTop: 24
            }
        },
        tabsIndicator: {
            [theme.breakpoints.down("xs")]: {
                display: "none"
            },
            top: 0,
            backgroundColor: "#000000 !important"
        },
        tabRoot: {
            margin: "0px 20px",
            opacity: 0.5
        },
        tabLabelIcon: {
            minHeight: "unset !important"
        },
        tabWrapper: {
            flexDirection: "row !important"
        },
        postsIconLarge: {
            ...commonIconProps,
            backgroundPosition: "-189px -366px",
            backgroundSize: "410px 396px",
            width: 12
        },
        savedIconLarge: {
            ...commonIconProps,
            backgroundSize: "410px 396px",
            backgroundPosition: "-401px 0",
            width: 10
        },
        postsIconSmall: postsIconSmallGrey,
        postsIconSmallBlue: {
            ...postsIconSmallGrey,
            backgroundPosition: "-331px -174px"
        },
        savedIconSmall: savedIconSmallGrey,
        savedIconSmallBlue: {
            ...savedIconSmallGrey,
            backgroundPosition: "0px -320px"
        },
        savedPostsSection: {
            // paddingTop: 60,
            paddingTop: 6,
            display: "grid",
            justifyContent: "center"
        },
        noContent: {
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "minmax(auto, 345px)",
            "& *": {
                marginBottom: 1
            },
            // marginBottom: 10,
            // marginTop: 10
        },
        savePhotoIcon: {
            ...commonIconProps,
            height: 62,
            width: 62,
            backgroundSize: "410px 396px",
            backgroundPosition: "-189px -273px"
        },
        image: {
            width: "100%",
            userSelect: "none"
        },
        imageWrapper: {
            position: "relative"
        },
        postMeta: {
            [theme.breakpoints.down("xs")]: {
                gridAutoFlow: "row",
                alignContent: "space-evenly"
            },
            position: "absolute",
            display: "grid",
            placeItems: "center",
            gridAutoFlow: "column",
            width: "100%",
            height: "100%",
            justifyContent: "space-evenly",
            "&:hover": {
                background: "rgba(0,0,0,0.6)",
                cursor: "pointer",
                "& > div": {
                    opacity: 1
                }
            }
        },
        postMetaItems: {
            color: "#ffffff",
            display: "grid",
            gridAutoFlow: "column",
            gridGap: 5,
            placeItems: "center",
            opacity: 0
        },
        likes: {
            ...commonIconProps,
            backgroundPosition: "-328px -239px",
            backgroundSize: "355px 344px",
            height: 16,
            width: 16
        },
        comments: {
            ...commonIconProps,
            backgroundPosition: "-327px -203px",
            backgroundSize: "355px 344px",
            height: 16,
            width: 18
        },
        profilePostsSection: {
            paddingTop: 60
        },
        noPicDivAlt: {
            display: "grid",
            placeItems: "center",
            "& div": {
                marginBottom: 16
            }
        },
        uploadPhotoIcon: {
            ...commonIconProps,
            backgroundSize: "410px 396px",
            backgroundPosition: "0px -273px",
            height: 62,
            width: 62
        },
        article: {
            display: "grid",
            gridTemplateColumns: "minmax(auto, 935px)"
        },
        postContainer: {
            [theme.breakpoints.down("sm")]: {
                gridGap: 2
            },
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: 20
        }
    };
};

// const theme = createTheme();

const commonIconProps = {
    backgroundImage: `url(${IconSheet2})`,
    backgroundRepeat: "no-repeat",
    height: 12
};

function ProfileTabs({ user, isOwner }) {
    const styles = useProfileTabsStyles(theme);
    const [value, setValue] = React.useState(0);

    return (
        <>
            <section  style={styles.section}>
                <Hidden xsDown>
                    <Divider />
                </Hidden>
                <Hidden xsDown>
                    <Tabs
                        value={value}
                        onChange={(_, value) => setValue(value)}
                        centered
                        sx={{ indicator: useProfileTabsStyles.tabsIndicator }}
                    >
                        <Tab
                            icon={<span style={styles.postsIconLarge} />}
                            label="POSTS"
                            sx={{
                                root: styles.tabRoot,
                                labelIcon: styles.tabLabelIcon,
                                wrapper: styles.tabWrapper
                            }}
                        />
                        {isOwner && (
                            <Tab
                                icon={<span style={styles.savedIconLarge} />}
                                label="SAVED"
                                sx={{
                                    root: styles.tabRoot,
                                    labelIcon: styles.tabLabelIcon,
                                    wrapper: styles.tabWrapper
                                }}
                            />
                        )}
                    </Tabs>
                </Hidden>
                <Hidden smUp>
                    <Tabs
                        value={value}
                        onChange={(_, value) => setValue(value)}
                        centered
                        sx={styles.tabs}
                        sx={{indicator: styles.tabsIndicator} }
                    >
                        <Tab
                            icon={<GridIcon fill={value === 0 ? "#3897f0" : undefined} />}
                            sx={{ root: styles.tabRoot }}
                        />
                        {isOwner && (
                            <Tab
                                icon={<SaveIcon fill={value === 1 ? "#3897f0" : undefined} />}
                                sx={{ root: styles.tabRoot }}
                            />
                        )}
                    </Tabs>
                </Hidden>
                <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
                {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
                {value === 1 && <SavedPosts />}
            </section>
        </>
    );
}

function ProfilePosts({ user, isOwner }) {
    const styles = useProfileTabsStyles(theme);

    if (user.posts.length === 0) {
        return (
            <Box
                component="section"
                 sx={styles.profilePostsSection}
            >
                <Box component="div"
                    sx={styles.noContent} >
                    <div style={styles.uploadPhotoIcon} />
                    <Typography variant="h4">
                        {isOwner ? "Upload a Photo" : "No Photos"}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box component="article" sx={styles.article}>
            <div style={styles.postContainer}>
                {user.posts.map(post => (
                    <GridPost key={post.id} post={post} />
                ))}
            </div>
        </Box>
    );
}

function SavedPosts() {
    const styles = useProfileTabsStyles(theme);

    return (
        <Box component="section" sx={styles.savedPostsSection}>
            <Box component="div" sx={styles.noContent}>
                <Box component="div" sx={styles.savePhotoIcon} />
                <Typography variant="h4">Save</Typography>
                <Typography align="center">
                    Save photos and videos that you want to see again. No one is notified,
                    and only you can see what you've saved.
                </Typography>
            </Box>
        </Box>
    );
}

export default ProfileTabs;
