import IconSheet from "../../assets/icon-sheet.png";
import theme from "../../theme";

export const useProfilePageStyles = (theme) => {
    const followingSectionLarge = {
        display: "grid",
        gridAutoFlow: "column",
        gridGap: 40,
        gridTemplateColumns:
            " max-content max-content max-content"
    };
    const followingTextLarge = {
        display: "grid",
        gridGap: 5,
        gridAutoFlow: "column",
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
            gridAutoFlow: "column",
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
            paddingRight: "16px",
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
            paddingTop: "12px !important",
            paddingRight: "8px !important",
        },
        unfollowButton: {
            color: `${theme.palette.error.main} !important`,
            paddingTop: "12px !important",
            paddingRight: "8px !important",
        },
        unfollowDialogText: {
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

export const styles = {
    container: {
        display: "grid",
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
        gridAutoFlow: "column",
        alignItems: "center",
        gridTemplateColumns: "minmax(auto, max-content) 30px",
        gridGap: 20,
    },
    unfollowDialogScrollPaper: {
        display: "grid",
        gridTemplateColumns: "minmax(auto, 496px)"
    },
    avatar: {
        width: 44,
        height: 44
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