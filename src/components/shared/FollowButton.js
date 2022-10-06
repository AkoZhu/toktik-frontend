import React from "react";
import { Button } from "@mui/material";

const followButtonStyles = {
    button: {
        height: "30px !important",
        width: "75px !important",
        padding: "0px 16px !important",
        marginTop: ({ side }) => `${side ? "0px !important" : "10px !important"}`
    }
};

function FollowButton({ side }) {
    const [isFollowing, setFollowing] = React.useState(false);

    const followButton = (
        <Button
            variant={side ? "text" : "contained"}
            color="primary"
            sx={followButtonStyles.button}
            onClick={() => setFollowing(true)}
            fullWidth
        >
            Follow
        </Button>
    );

    const followingButton = (
        <Button
            variant={side ? "text" : "outlined"}
            sx={followButtonStyles.button}
            onClick={() => setFollowing(false)}
            fullWidth
        >
            Following
        </Button>
    );

    return isFollowing ? followingButton : followButton;
}

export default FollowButton;
