import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import { defaultUser } from "../../data";


const useStyles = (avatarSize = 44 ) => ({

    avatar: {
        width: avatarSize,
        height: avatarSize,
    },
    wrapper: {
        display: "grid",
        justifyContent: "center",
        padding: "32px 16px 16px"
    },
    nameWrapper: {
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    typography: {
        borderBottom: "none !important",
        padding: "0px 0px 0px 12px !important"
    }
})


function UserCard({ user = defaultUser, avatarSize = 44 }) {
    const { username, name, profile_image } = user;

    const styles = useStyles(avatarSize)

    return (
        <div style={styles.wrapper}>
            <Link to={`/${username}`}>
                <Avatar
                    src={profile_image}
                    alt="User avatar"
                    style={styles.avatar}
                />
            </Link>
            <div style={styles.nameWrapper}>
                <Link to={`/${username}`}>
                    <Typography variant="subtitle2" style={styles.typography}>
                        {username}
                    </Typography>
                </Link>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    style={styles.typography}
                >
                    {name}
                </Typography>
            </div>
        </div>
    );
}

export default UserCard;
