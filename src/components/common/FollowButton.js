import React from "react";
import {Button} from "@mui/material";
import axios from "axios";

const followButtonStyles = (side) => ({
    button: {
        height: "30px",
        width: side ? "75px" : "100px",
        paddingRight: "16px",
        marginTop: side ? "0px" : "10px",
    }
});

function FollowButton({ targetUsername, side, setFollowNum}) {
    const [isFollowing, setFollowing] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [targetUser, setTargetUser] = React.useState(null);
    const [followingMapId, setFollowingMapId] = React.useState(null);

    React.useEffect(() => {
        let tmpCurrentUserId;
        let tmpTargetUserId;
        axios.get(`http://localhost:4000/user?username=${targetUsername}`).then((res) => {
            setTargetUser(res.data[0]);
            tmpTargetUserId = res.data[0].id;
            axios.get(`http://localhost:4000/user?username=${sessionStorage.getItem("CurrentUsername")}`).then((res) => {
                setCurrentUser(res.data[0]);
                tmpCurrentUserId = res.data[0].id;
            }).then(() => {
                axios.get(`http://localhost:4000/following?followerId=${tmpCurrentUserId}&followingId=${tmpTargetUserId}`).then((res) => {
                    if (res.data.length > 0) {
                        setFollowing(true);
                        setFollowingMapId(res.data[0].id);
                    }

                });
            })
        });
    }, [targetUsername]);

    const handleFollow = () => {
        if (isFollowing) {
            axios.delete(`http://localhost:4000/following/${followingMapId}`).then((res) => {
                currentUser.followingCount -= 1;
                targetUser.followerCount -= 1;
                axios.put(`http://localhost:4000/user/${currentUser.id}`, currentUser).then((res) => {
                    axios.put(`http://localhost:4000/user/${targetUser.id}`, targetUser).then((res) => {
                        setFollowing(false);
                    });
                });
            }).then(() =>{ setFollowNum(targetUser.followerCount) });
        } else {
            axios.get(`http://localhost:4000/following?followerId=${currentUser.id}&followingId=${targetUser.id}`).then((res) => {
                if (res.data.length === 0) {
                    currentUser.followingCount += 1;
                    targetUser.followerCount += 1;
                    console.log(targetUser)
                    axios.put(`http://localhost:4000/user/${currentUser.id}`, currentUser).then(() => {
                        axios.put(`http://localhost:4000/user/${targetUser.id}`, targetUser).then(() => {
                            axios.post(`http://localhost:4000/following`, {
                                followerId: currentUser.id,
                                followingId: targetUser.id,
                            }).then((res) => {
                                setFollowing(true);
                                setFollowingMapId(res.data.id);
                            });
                        });
                    }).then(() => {
                        setFollowNum(targetUser.followerCount)
                    });
                } else {
                    setFollowing(true);
                    setFollowingMapId(res.data[0].id);
                }
            })
        }
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
