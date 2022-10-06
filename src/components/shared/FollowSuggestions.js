import React from "react";
import { Typography, Avatar } from "@mui/material";
import { LoadingLargeIcon } from "../../icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDefaultUser } from "../../data";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

export const followSuggestionsStyles = {
    container: {
        maxWidth: "100vw"
    },
    slide: {
        padding: "10px 0px 20px 0px !important",
        // marginBottom,
        // border,
        borderTop: "none",
        "& .slick-slide > div": {
            background: "#ffffff",
            // border,
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
        // marginBottom,
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
};

function FollowSuggestions({ hideHeader }) {
    let loading = false;

    return (
        <div style={followSuggestionsStyles.container}>
            {!hideHeader && (
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    style={followSuggestionsStyles.typography}
                >
                    Suggestions For You
                </Typography>
            )}
            {loading ? (
                <LoadingLargeIcon />
            ) : (
                <Slider
                    style={followSuggestionsStyles.slide}
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

    return (
        <div>
            <div style={followSuggestionsStyles.card}>
                <Link to={`/${username}`}>
                    <Avatar
                        src={profile_image}
                        alt={`${username}'s profile`}
                        classes={{
                            root: followSuggestionsStyles.avatar,
                            img: followSuggestionsStyles.avatarImg
                        }}
                    />
                </Link>
                <Link to={`/${username}`}>
                    <Typography
                        variant="subtitle2"
                        style={followSuggestionsStyles.text}
                        align="center"
                    >
                        {username}
                    </Typography>
                </Link>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    style={followSuggestionsStyles.text}
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
