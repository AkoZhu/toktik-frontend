import React from "react";
import {Typography, Avatar, makeStyles, styled} from "@mui/material";
import { LoadingLargeIcon } from "../../icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
// import {createTheme} from "@mui/material/styles";
import theme from "../../theme";


const useFollowSuggestionsStyles = styled((theme) => ({
    container: {
        maxWidth: "100vw"
    },
    slide: {
        padding: "10px 0px 20px 0px !important",
        marginTop: "20px !important",
        // border,
        borderTop: "none",
        "& .slick-slide > div": {
            background: "#ffffff",
            border: "1px solid #e6e6e6",
            margin: "0px 10px !important",
            padding: "20px !important"
        },
        "& .slick-next:before, & .slick-prev:before": {
            color: "rgb(38, 38, 38)",
            fontSize: "24px !important"
        }
    },
    typography: {
        borderBottom: "none !important",
        padding: "0px 0px 0px 12px !important"
    },
    skeleton: {
        display: "grid",
        gridAutoFlow: "column",
        marginBottom: "20px !important",
        gridGap: 16
    },
    avatar: {
        width: 54,
        height: 54
    },
    avatarImg: {
        userSelect: "none"
    },
    text: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%"
    },
    card: {
        display: "grid",
        justifyItems: "center",
        width: 138,
        [theme.breakpoints.down("xs")]: {
            width: 116
        }
    }
}));

function FollowSuggestions({ hideHeader }) {
    let loading = false;
    const styles = useFollowSuggestionsStyles(theme);

    return (
        <div style={styles.container}>
            {!hideHeader && (
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={styles.typography}
                >
                    Suggestions For You
                </Typography>
            )}
            {loading ? (
                <LoadingLargeIcon />
            ) : (
                <Slider
                    style={styles.slide}
                    dots={false}
                    infinite
                    speed={1000}
                    touchThreshold={1000}
                    variableWidth
                    swipeToSlide
                    arrows
                    slidesToScroll={3}
                    easing="ease-in-out"
                >
                    {Array.from({ length: 10 }, () => getDefaultUser()).map(user => (
                        <FollowSuggestionsItem key={user.id} user={user} />
                    ))}
                </Slider>
            )}
        </div>
    );
}

function FollowSuggestionsItem({ user }) {
    const { profile_image, username, name } = user;
    const styles = useFollowSuggestionsStyles(theme);

    return (
        <div>
            <div style={styles.card}>
                <Link to={`/${username}`}>
                    <Avatar
                        src={profile_image}
                        alt={`${username}'s profile`}
                        classes={{
                            root: styles.avatar,
                            img: styles.avatarImg
                        }}
                    />
                </Link>
                <Link to={`/${username}`}>
                    <Typography
                        variant="subtitle2"
                        style={styles.text}
                        align="center"
                    >
                        {username}
                    </Typography>
                </Link>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    style={styles.text}
                    align="center"
                >
                    {name}
                </Typography>
                <FollowButton side={false} />
            </div>
        </div>
    );
}

export default FollowSuggestions;
