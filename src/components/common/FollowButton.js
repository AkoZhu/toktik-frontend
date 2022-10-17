import React from "react";
import {Button} from "@mui/material";

const followButtonStyles = (side) => ({
    button: {
        height: "30px",
        width: side ? "75px" : "100px",
        paddingRight: "16px",
        marginTop: side ? "0px" : "10px",
    }
});

function FollowButton({ side }) {
    const [isFollowing, setFollowing] = React.useState(false);

    const followButton = (
        <Button
            variant="text"
            size="medium"
            color="primary"
            sx={followButtonStyles(side).button}
            onClick={() => setFollowing(true)}
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
            onClick={() => setFollowing(false)}
            fullWidth
        >
            <span style={{color: "grey"}}>Following</span>
        </Button>
    );

    return isFollowing ? followingButton : followButton;
}

export default FollowButton;
