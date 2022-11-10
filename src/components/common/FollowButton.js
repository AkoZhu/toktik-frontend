import React from "react";
import {Button} from "@mui/material";
import {
    deleteFollowMapRelationshipItem,
    getFollowMapRelationshipItem,
    getUserByName,
    postFollowMapRelationshipItem,
    putUserById
} from "../../api/user";

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
    const [currentUser, setCurrentUser] = React.useState(null);
    const [targetUser, setTargetUser] = React.useState(null);
    const [followingMapId, setFollowingMapId] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            let tmpCurrentUserId;
            let tmpTargetUserId;

            const tmpTargetUser = await getUserByName(targetUsername);

            setTargetUser(tmpTargetUser);
            tmpTargetUserId = tmpTargetUser.id;
            const tmpCurrentUser = await getUserByName(sessionStorage.getItem("CurrentUsername"));
            setCurrentUser(tmpCurrentUser);
            tmpCurrentUserId = tmpCurrentUser.id;

            const mapItem = await getFollowMapRelationshipItem(tmpCurrentUserId, tmpTargetUserId);


            if (mapItem.length > 0) {
                setFollowing(true);
                setFollowingMapId(mapItem[0].id);
            }
        }

        fetchData().then(() => true);
    }, [targetUsername]);

    const handleFollow = () => {
        async function handle() {
            if (isFollowing) {
                await deleteFollowMapRelationshipItem(followingMapId)
                currentUser.followingCount -= 1;
                targetUser.followerCount -= 1;
                await putUserById(currentUser.id, currentUser)
                await putUserById(targetUser.id, targetUser)
                setFollowing(false);

                setFollowNum(targetUser.followerCount)
            } else {
                const res = await getFollowMapRelationshipItem(currentUser.id, targetUser.id);
                if (res.length === 0) {
                    currentUser.followingCount += 1;
                    targetUser.followerCount += 1;
                    await putUserById(currentUser.id, currentUser)
                    await putUserById(targetUser.id, targetUser)
                    const mapItem = await postFollowMapRelationshipItem({
                        followerId: currentUser.id,
                        followingId: targetUser.id,
                    })

                    setFollowing(true);
                    setFollowingMapId(mapItem.id);
                    setFollowNum(targetUser.followerCount)
                } else {
                    setFollowing(true);
                    setFollowingMapId(res[0].id);
                }
            }
        }

        console.log(currentUser, targetUser);

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