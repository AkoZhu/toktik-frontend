import React from "react";
import {Paper, Typography} from "@mui/material";
import UserCard from "../common/UserCard";
import FollowButton from "../common/FollowButton";
import {LoadingIcon} from "../../icons";
import {createTheme} from "@mui/material/styles";
import LoadingScreen from "../common/LoadingScreen";
import {sample} from "../../utils";
import {getFollowMap, getUserById} from "../../api/user";

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
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingRight: "16px",
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
        paddingBottom: "8px",
        borderBottom: "1.5px solid rgba(var(--ce3,239,239,239),1)",
    }
};


export default function FeedSideSuggestions() {
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        async function checkFollow() {
            const finalArray = [];
            const checkId = new Set();
            const followMap = await getFollowMap();
            const currUseId = parseInt(sessionStorage.getItem("CurrentUserId"));

            const followingIds = new Set();
            for (let follow of followMap) {
                if (follow.followerId === currUseId) {
                    followingIds.add(follow.followingId);
                }
            }

            const followingFollower = new Set();
            for (let follow of followMap) {
                if (followingIds.has(follow.followingId)) {
                    followingFollower.add(follow.followerId);
                }
            }

            for (let follower of followingFollower) {
                if (currUseId !== follower) {
                    const followerFollowingIds = new Set();
                    for (let follow of followMap) {
                        if (follow.followerId === follower) {
                            followerFollowingIds.add(follow.followingId);
                        }
                    }

                    const intersection = new Set([...followerFollowingIds].filter((x) => followingIds.has(x)));
                    if (intersection.size >= 3) {
                        const tmp = (await getUserById(follower));

                        if (!followingIds.has(tmp.id) && !checkId.has(tmp.id)) {
                            console.log(follower + " and " + sessionStorage.getItem("CurrentUserId") + " commonFollowingUser " + intersection.size);
                            checkId.add(tmp.id);
                            finalArray.push(tmp);
                            if (finalArray.length === 5) {
                                break;
                            }
                        }
                    }
                }
            }

            setUsers(sample(finalArray, finalArray.length));
            setLoading(false);
        }

        checkFollow().then(() => true);

    }, []);


    if (loading) return <LoadingScreen/>;

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
                {loading ? (
                    <LoadingIcon/>
                ) : (
                    Array.from(users).map(user => (
                        <div key={user.id} style={feedSideSuggestionsStyles.card}>
                            <UserCard username={user.username}/>
                            <FollowButton targetUsername={user.username} side setFollowNum={() => true}/>
                        </div>
                    ))
                )}
            </Paper>
        </article>
    );
}
