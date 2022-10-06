import React from "react";

import logo from "../../assets/logo.png";
import {AppBar, Avatar, Stack} from "@mui/material";
import Link from "@mui/material/Link";
import {useLocation} from "react-router-dom";
import {AddIcon, ExploreActiveIcon, ExploreIcon, HomeActiveIcon, HomeIcon} from "../../icons";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";

const theme = createTheme();

const style = {
    appBar: {
        background: "#ffffff !important",
        color: "#000000",
        display: "flex",
        alignItems: "center",
        order: 0,
        zIndex: "100 !important",
        boxShadow: "0 0 0 0 !important",
        borderBottom: "1.5px solid rgba(var(--ce3,239,239,239),1)",
    },
    section: {
        alignItems: "center",
        display: "flex",
        height: 54,
        maxWidth: 975,
        width: "100%",
        justifyContent: "center",
        padding: "0px 20px"
    },
    logoContainer: {
        display: "flex",
        flex: "1 9999 0%",
        minWidth: 40,
    },
    logoWrapper: {
        flex: "0 0 auto",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "stretch"
    },
    logo: {
        marginTop: 2,
        height: 50,
        objectFit: "contain"
    },
    input: {
        height: 28,
        fontSize: "14px !important",
        background: "rgba(var(--b3f,250,250,250),1)",
        border: "solid 1px rgba(var(--b6a,219,219,219),1)",
        borderRadius: 3,
        color: "rgba(var(--i1d,38,38,38),1)",
        outline: 0,
        padding: "3px 3px 3px 26px",
        zIndex: 2
    },
    linksContainer: {
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flex: "1 0 0%",
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },
    linksWrapper: {
        display: "flex",
        paddingLeft: 24,
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 0
        },
        alignItems: "center",
        whiteSpace: "nowrap",
    },
    resultContainer: {width: 215},
    resultWrapper: {
        display: "flex",
        alignItems: "center",
        height: "50px",
        padding: "8px 16px"
    },
    avatarWrapper: {
        margin: "0 10px 0 0"
    },
    nameWrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    icon: {
        position: "relative",
        "&:not(:first-child)": {
            marginLeft: 22
        }
    },
    notifications: {
        position: "relative",
        "&::after": {
            right: 10,
            width: 4,
            bottom: "-5px",
            height: 4,
            margin: "0 auto",
            position: "absolute",
            background: "#ed4956",
            transition: "bottom .2s ease-in-out",
            borderRadius: 2,
            content: '""'
        }
    },
    profileActive: {
        border: "1px solid rgba(var(--i1d,38,38,38),1)",
        borderRadius: "50%",
        height: 28,
        marginLeft: "-3px",
        marginTop: "-3px",
        position: "absolute",
        width: "28px !important"
    },
    profileImage: {
        width: "28px !important",
        height: "28px !important",
        marginBottom: "5px !important"
    },
    tooltipContainer: {
        display: "flex",
        alignItems: "center",
        "& div": {
            margin: "0 5px"
        }
    },
    tooltip: {
        display: "flex",
        alignItems: "center"
    },
    resultLink: {
        background: "#fafafa",
        width: "100%",
        borderBottom: "solid 1px rgba(var(--b38,219,219,219),1)",
        "&:hover": {
            background: "rgba(var(--b3f,250,250,250),1)"
        }
    },
    progressBar: {
        top: 0,
        zIndex: 1031,
        left: 0,
        height: 3,
        background:
            "#27c4f5 linear-gradient(to right,#27c4f5,#a307ba,#fd8d32,#70c050,#27c4f5)",
        backgroundSize: "500%",
        animation:
            "2s linear infinite $LoadingBarProgress,.5s ease-out $LoadingBarEnter",
        transformOrigin: "left",
        width: "100%"
    },
    progressContainer: {
        position: "absolute",
        zIndex: 2000,
        width: "100%",
        pointerEvents: "none"
    },
    progressBackground: {
        boxShadow: "0 0 10px #29d, 0 0 5px #29d",
        display: "block",
        height: "100%",
        opacity: 1,
        position: "absolute",
        right: 0,
        transform: "rotate(3deg) translate(0px, -4px)",
        width: 100
    },
};

export default function Navbar() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div>
            <AppBar sx={style.appBar}>
                <Box style={style.section}>
                    <Logo/>
                    <Links path={path}/>
                </Box>
            </AppBar>
        </div>
    );
}

function Logo() {
    return (
        <div>
            <Box sx={style.logoContainer}>
                <Link href="/">
                    <div style={style.logoWrapper}>
                        <img src={logo} alt="Toktik" style={style.logo}/>
                    </div>
                </Link>
            </Box>
        </div>
    );
}

function Links({path}) {
    const handleClick = (e) => {
        e.preventDefault();
        console.log("The link was clicked.");
    }

    return (
        <div style={style.linksContainer}>
            <Stack direction="row" spacing={4} sx={style.linksWrapper}>
                <Link href="/">{path === "/" ? <HomeActiveIcon/> : <HomeIcon/>}</Link>
                <Link href="#">{path === "/explore" ? <ExploreActiveIcon/> : <ExploreIcon/>}</Link>
                <Link href="#" onClick={handleClick}><AddIcon/></Link>
                <Link href="#">
                    <Avatar alt="Profile User" src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
                            sx={style.profileImage}/>
                </Link>
            </Stack>
        </div>
    );
}
