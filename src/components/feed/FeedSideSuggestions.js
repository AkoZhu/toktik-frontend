import React from "react";
import {Paper, Typography} from "@mui/material";
import {getUser} from "../../data";
import UserCard from "../common/UserCard";
import FollowButton from "./FollowButton";
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
        paddingBottom: "8px",
        paddingRight:"16px",
        paddingLeft: "16px",
    },
    typography: {
        paddingLeft: `16px !important`,
        [theme.breakpoints.down("xs")]: {
            fontSize: "1rem !important"
        }
    },
    paper: {
        paddingLeft: "0px",
        paddingTop: "8px",
        paddingRight: "0px",
        paddingBottom:"8px",
        borderBottom: "1.5px solid rgba(var(--ce3,239,239,239),1)",
    }
};


export default function FeedSideSuggestions() {
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
                    Array.from([0, 1, 2, 3, 4], (x) => getUser(x)).map(user => (
                        <div key={user.id} style={feedSideSuggestionsStyles.card}>
                            <UserCard user={user}/>
                            <FollowButton side/>
                        </div>
                    ))
                )}
            </Paper>
        </article>
    );
}
