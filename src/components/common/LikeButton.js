import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {getLikeStatus, postLike, postUnlike} from "../../api/user";

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

    const fetchLikeStatus = async () => {
        const response = await getLikeStatus(localStorage.getItem("CurrentUsername"), post._id)
        setLiked(response);
    }
    React.useEffect(() => {
        fetchLikeStatus().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post._id, props.postModalOpen]);

    React.useEffect(() => {
        async function fetchData() {
            if (clickLike) {
                if (!liked) {
                    setLiked(true);
                    await postLike(localStorage.getItem("CurrentUsername"), post._id);

                } else {
                    setLiked(false);
                    await postUnlike(localStorage.getItem("CurrentUsername"), post._id);
                }

                setClickLike(false);
            }
        }

        fetchData().then(() => props.refreshLikes());

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
