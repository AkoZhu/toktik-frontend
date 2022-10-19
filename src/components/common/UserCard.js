import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Typography} from "@mui/material";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";


const useStyle = (avatarSize = 44) => ({
    avatar: {
        width: avatarSize,
        height: avatarSize
    },
    typography: {
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    wrapper: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "min-content auto",
        gridGap: 12,
        alignItems: "center",
        width: "100%"
    },
    nameWrapper: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "left"
    }
});

function UserCard({username = sessionStorage.getItem("CurrentUsername"), avatarSize = 44}) {
    const styles = useStyle(avatarSize);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({});

    // console.log(username);
    React.useEffect(() => {
        axios.get(
            "http://localhost:4000/user?username=" + username
        ).then((res) => {
            setUser(res.data[0]);
            // console.log(res.data)
            setLoading(false);
        });
    }, [username]);

    if (loading) return <LoadingScreen/>;

    return (
        <div style={styles.wrapper}>
            <Link to={`/profile/${user.username}`}>
                <Avatar
                    src={user.profilePicture}
                    alt="User avatar"
                    sx={{height: avatarSize, width: avatarSize}}
                />
            </Link>
            <div style={styles.nameWrapper}>
                <Link to={`/profile/${username}`}>
                    <Typography variant="subtitle2" sx={styles.typography}>
                        {user.username}
                    </Typography>
                </Link>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={styles.typography}
                >
                    {user.firstName} {user.lastName}
                </Typography>
            </div>
        </div>
    );
}

export default UserCard;
