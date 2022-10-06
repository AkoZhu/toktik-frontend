import React from "react";
import { Paper, Typography } from "@mui/material";
import { getDefaultUser } from "../../data";
import UserCard from "../shared/UserCard";
import FollowButton from "../shared/FollowButton";
import { LoadingIcon } from "../../icons";
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
        padding: "8px 16px !important"
    },
    typography: {
        paddingLeft: `16px !important`,
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem !important"
        }
    },
    paper: {
        padding: "8px 0 !important"
    }
};


function FeedSideSuggestions() {
    let loading = false;

    return (
        <article sx={feedSideSuggestionsStyles.article}>
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
                        <div key={user.id} sx={feedSideSuggestionsStyles.card}>
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
