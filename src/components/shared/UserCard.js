import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import { defaultUser } from "../../data";


let styles = {
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
    },
}

function UserCard({ user = defaultUser, avatarSize = 44 }) {

    if(avatarSize){
        styles.avatar.height = avatarSize;
        styles.avatar.width = avatarSize;
    }

    const { username, name, profile_image } = user;


    return (
        <div style={styles.wrapper}>
            <Link to={`/${username}`}>
                <Avatar
                    src={profile_image}
                    alt="User avatar"
                    style={height:avatarSize; width: avatarSize}
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