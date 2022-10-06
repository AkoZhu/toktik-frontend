import React from "react";
import {Paper, Typography} from "@mui/material";
import {getDefaultUser} from "../../data";
import UserCard from "../common/UserCard";
import FollowButton from "../shared/FollowButton";
import {LoadingIcon} from "../../icons";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

const feedSideSuggestionsStyles = {
    article: {
        margin: "12px 0",
        gridTemplateColumns: "minmax(auto, 600px)",
        justifyContent: "center"
    },
    card: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 500px)",
        gridGap: 10,
        alignItems: "center",
        paddingTop:"8px",
        paddingRight:"16px",
        paddingBottom: "5px"
    },
    typography: {
        paddingLeft: `5px !important`,
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem !important"
        }
    },
    paper: {
        paddingLeft: "10px",
        paddingTop: "8px",
        paddingRight: "0px",
        paddingBottom:"5px",
        borderBottom: "1.5px solid rgba(var(--ce3,239,239,239),1)",
    }
};


function FeedSideSuggestions() {
    let loading = false;

    return (
        <article style={feedSideSuggestionsStyles.article}>
            <Paper sx={feedSideSuggestionsStyles.paper}>
                <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    component="h2"
                    align="left"
                    gutterBottom
                    sx={feedSideSuggestionsStyles.typography}
                >
                    Suggestions For You
                </Typography>
                { loading ? (
                    <LoadingIcon />
                ) : (
                    Array.from({ length: 5 }, () => getDefaultUser()).map(user => (
                        <div key={user.id} style={feedSideSuggestionsStyles.card}>
                            <UserCard user={user} />
                            <FollowButton side />
                        </div>
                    ))
                )}
            </Paper>
        </article>
    );
}

export default FeedSideSuggestions;
