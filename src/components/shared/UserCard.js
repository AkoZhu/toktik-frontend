import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Typography} from "@mui/material";
import {defaultUser} from "../../data";


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

function UserCard({ user = defaultUser, avatarSize = 44 }) {
    const {username, name, profile_image} = user;
    const styles = useStyle(avatarSize);


    return (
        <div style={styles.wrapper}>
            <Link href={`/${username}`}>
                <Avatar
                    src={profile_image}
                    alt="User avatar"
                    sx={{height: avatarSize, width: avatarSize}}
                />
            </Link>
            <div style={styles.nameWrapper}>
                <Link href={`/${username}`}>
                    <Typography variant="subtitle2" sx={styles.typography}>
                        {username}
                    </Typography>
                </Link>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={styles.typography}
                >
                    {name}
                </Typography>
            </div>
        </div>
    );
}

export default UserCard;
