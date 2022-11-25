import React from "react";
import {Button} from "@mui/material";
import {getFollowCountByUsername, getFollowStatus, postFollow, postUnfollow,} from "../../api/user";

const followButtonStyles = (side) => ({
    button: {
        height: "30px",
        width: side ? "75px" : "100px",
        paddingRight: "16px",
        marginTop: side ? "0px" : "10px",
    }
});

function FollowButton({targetUsername, side, setFollowNum}) {
    const [isFollowing, setFollowing] = React.useState(false);

    React.useEffect(() => {
        getFollowStatus(
            sessionStorage.getItem("CurrentUsername"), targetUsername
        ).then((res) => {
            setFollowing(res);
        });
    }, [targetUsername]);

    const handleFollow = () => {
        async function handle() {
            if (isFollowing) {
                await postUnfollow(sessionStorage.getItem("CurrentUsername"), targetUsername);
                setFollowing(false);
            } else {
                await postFollow(sessionStorage.getItem("CurrentUsername"), targetUsername);
                setFollowing(true);
            }

            setFollowNum(await getFollowCountByUsername(targetUsername));
        }

        handle().then(() => true);
    }

    const followButton = (
        <Button
            variant="text"
            size="medium"
            color="primary"
            sx={followButtonStyles(side).button}
            onClick={handleFollow}
            fullWidth
        >
            Follow
        </Button>
    );

    const followingButton = (
        <Button
            variant="text"
            size="medium"
            sx={followButtonStyles(side).button}
            onClick={handleFollow}
            fullWidth
        >
            <span style={{color: "grey"}}>Following</span>
        </Button>
    );

    if (targetUsername === sessionStorage.getItem("CurrentUsername")) return null;

    return isFollowing ? followingButton : followButton;
}

export default FollowButton;