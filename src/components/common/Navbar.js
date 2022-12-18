import React from "react";

import logo from "../../assets/logo.png";
import {
    AppBar,
    Avatar,
    CircularProgress,
    Fade,
    IconButton,
    InputBase,
    Stack,
    styled,
    Tooltip,
    tooltipClasses
} from "@mui/material";
import Link from "@mui/material/Link";
import {useLocation} from "react-router-dom";
import {HomeActiveIcon, HomeIcon} from "../../icons";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import NewPostModal from "./NewPostModal";
import theme from "../../theme";
import {getUserBySearch} from "../../api/user";
import {LogoutDialog} from "./LogoutDialog";

const styles = {
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
        height: 68,
        maxWidth: 975,
        width: "100%",
        justifyContent: "center",
        padding: "0px 10px"
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
        color: "rgba(var(--i1d,38,38,38),1)",
        outline: 0,
        padding: "3px 3px 3px 9px",
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
    resultContainer: {
        width: 215,
    },
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
        background: "#ffffff",
        width: "100%",
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
    newPostModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 502,
        borderRadius: '12px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    newPostWrapper: {
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "24px",
        paddingBottom: "24px",
        textAlign: 'center',
        marginTop: "10%",
        marginBottom: "10%"
    },
    uploadButtonWrapper: {
        marginTop: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
};

// noinspection JSValidateTypes,RequiredAttributes
const LightTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export default function Navbar() {
    const location = useLocation();
    const path = location ? location.pathname : "";

    return (
        <div>
            <AppBar sx={styles.appBar}>
                <Grid container spacing={2} sx={styles.section}>
                    <Grid item xs={4}>
                        <Logo/>
                    </Grid>
                    <Grid item xs={4}>
                        <Search/>
                    </Grid>
                    <Grid item xs={4}>
                        <Links path={path}/>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}

function Logo() {
    return (
        <div>
            <Box sx={styles.logoContainer}>
                <Link href="/">
                    <div style={styles.logoWrapper}>
                        <img src={logo} alt="Toktik" style={styles.logo}/>
                    </div>
                </Link>
            </Box>
        </div>
    );
}

function Search() {
    const [loading] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState("");

    React.useEffect(() => {
        let tmpQuery = query.trim();
        if (!tmpQuery) {
            setResults([]);
            return;
        }
        if (query.length < 2) return;
        getUserBySearch(query).then((res) => {
            setResults(res);
        });
    }, [query]);

    function handleClearInput() {
        setResults([]);
        setQuery("");
    }

    return (
        <LightTooltip
            TransitionComponent={Fade}
            open={results.length > 0}
            title={(results.length > 0 &&
                <Grid sx={styles.resultContainer} container>
                    {results.map(result => (
                        <Grid
                            key={result._id}
                            item
                            sx={styles.resultLink}
                            onClick={() => {
                                handleClearInput();
                                window.location.href = `/profile/${result.username}`;
                            }}
                        >
                            <div style={styles.resultWrapper}>
                                <div style={styles.avatarWrapper}>
                                    <Avatar src={result.profileImage} alt="user avatar"/>
                                </div>
                                <div style={styles.nameWrapper}>
                                    <Typography variant="body1" color="black">{result.username}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {result.name}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        >
            <InputBase
                sx={styles.input}
                onChange={event => setQuery(event.target.value)}
                startAdornment={<SearchIcon/>}
                endAdornment={
                    loading ? (
                        <CircularProgress/>
                    ) : (
                        <IconButton onClick={handleClearInput} sx={{color: "black"}}><ClearIcon/></IconButton>
                    )
                }
                placeholder="Search"
                value={query}
            />
        </LightTooltip>
    );
}

function Links({path}) {
    return (
        <div style={styles.linksContainer}>
            <Stack direction="row" spacing={4} sx={styles.linksWrapper}>
                <Link href="/">{path === "/" ? <HomeActiveIcon/> : <HomeIcon/>}</Link>
                <NewPostModal/>
                <Link href="/profile">
                    <Avatar alt="Profile User" src={localStorage.getItem("CurrentUserProfilePicture")}
                            sx={styles.profileImage}/>
                </Link>
                <LogoutDialog />
            </Stack>
        </div>
    );
}
