import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
    deleteLikeMapRelationshipItemById,
    getLikeMapRelationshipItem,
    getLikeMapRelationshipItemByPostId,
    postLikeMapRelationshipItem
} from "../../api/user";
import {putPostsById} from "../../api/post";

const styles = {
    icons: {
        color: "red",
        strokeWidth: 1,
        stroke: "#ffffff",
        transform: "scale(0.85)",
    }
};

export default function LikeButton(props) {
    const [liked, setLiked] = React.useState(false);
    const [clickLike, setClickLike] = React.useState(false);
    let post = props.post;

    React.useEffect(() => {
        async function fetchData() {
            const res = await getLikeMapRelationshipItem(sessionStorage.getItem("CurrentUserId"), post.id);
            if (res.length > 0) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }

        fetchData().then(() => true);
    }, [post.id, props.postModalOpen]);

    React.useEffect( () => {

        async function fetchData() {
            if (clickLike) {
                if (!liked) {
                    setLiked(true);
                    const res = await getLikeMapRelationshipItem(sessionStorage.getItem("CurrentUserId"), post.id);

                    if (res.length === 0) {
                        await postLikeMapRelationshipItem({
                            postId: post.id,
                            userId: sessionStorage.getItem("CurrentUserId")
                        })
                        let likeCount = await getLikeMapRelationshipItemByPostId(post.id);
                        likeCount = likeCount.length;
                        post.totalLikes = likeCount;
                        await putPostsById(post.id, post);
                        props.setKey(Math.random());
                    }

                } else {
                    setLiked(false);
                    const res = await getLikeMapRelationshipItem(sessionStorage.getItem("CurrentUserId"), post.id)

                    if (res.length > 0) {
                        await deleteLikeMapRelationshipItemById(res[0].id);
                        let likeCount = await getLikeMapRelationshipItemByPostId(post.id);
                        likeCount = likeCount.length;
                        post.totalLikes = likeCount;
                        await putPostsById(post.id, post);
                        props.setKey(Math.random());
                    }
                }

                setClickLike(false);
            }
        }

        fetchData().then(() => true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickLike]);

    function handleClick() {
        setClickLike(true);
    }

    if (liked) {
        return (<FavoriteIcon fontSize="large" sx={styles.icons} onClick={handleClick}/>);
    } else {
        return (<FavoriteBorderIcon fontSize="large" sx={styles.icons} onClick={handleClick}/>);
    }
}
