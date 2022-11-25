import React from "react";
import Link from '@mui/material/Link';
import {Avatar, Typography} from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import {getUserByName} from "../../api/user";


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

function UserCard({username, avatarSize = 44}) {
    const styles = useStyle(avatarSize);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        getUserByName(username).then((res) => setUser(res));
    }, [username]);

    if (!user) return <LoadingScreen/>;

    return (
        <div style={styles.wrapper}>
            <Link href={`/profile/${username}`}>
                <Avatar
                    src={user.profilePicture}
                    alt="User avatar"
                    sx={{height: avatarSize, width: avatarSize}}
                />
            </Link>
            <div style={styles.nameWrapper}>
                <Link href={`/profile/${username}`}>
                    <Typography variant="subtitle2" sx={styles.typography}>
                        {username}
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
