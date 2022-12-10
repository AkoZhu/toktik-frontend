import React from "react";
import {Button} from "@mui/material";
import {getFollowStatus, postFollow, postUnfollow,} from "../../api/user";

const followButtonStyles = (side) => ({
    button: {
        height: "30px",
        width: side ? "75px" : "100px",
        paddingRight: "16px",
        marginTop: side ? "0px" : "10px",
    }
});

function FollowButton(props) {
    const [isFollowing, setFollowing] = React.useState(false);

    const update = async () => {
        if (props.targetUsername !== undefined && localStorage.getItem("CurrentUsername") !== props.targetUsername) {
            const status = await getFollowStatus(localStorage.getItem("CurrentUsername"), props.targetUsername);
            setFollowing(status);
        }
    }

    React.useEffect(() => {
        update().then();
        setInterval(() => {
            update().then();
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFollow = () => {
        async function handle() {
            if (isFollowing) {
                await postUnfollow(localStorage.getItem("CurrentUsername"), props.targetUsername);
                setFollowing(false);
            } else {
                await postFollow(localStorage.getItem("CurrentUsername"), props.targetUsername);
                setFollowing(true);
            }
        }

        handle().then(() => props.handleFollower());
    }

    const followButton = (
        <Button
            variant="text"
            size="medium"
            color="primary"
            sx={followButtonStyles(props.side).button}
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
            sx={followButtonStyles(props.side).button}
            onClick={handleFollow}
            fullWidth
        >
            <span style={{color: "grey"}}>Following</span>
        </Button>
    );

    if (props.targetUsername === localStorage.getItem("CurrentUsername")) return null;

    return isFollowing ? followingButton : followButton;
}

export default FollowButton;