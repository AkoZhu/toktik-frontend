import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

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
    const Icon = liked ? FavoriteIcon : FavoriteBorderIcon;
    const onClick = liked ? handleUnlike : handleLike;
    const post = props.post;

    React.useEffect(() => {
        axios.get(`http://localhost:4000/like?postId=${post.id}&userId=${sessionStorage.getItem("CurrentUserId")}`).then((res) => {
            if (res.data.length > 0) {
                setLiked(true);
            }
        });
    }, [post.id]);

    React.useEffect(() => {
        if (liked) {
            axios.get(`http://localhost:4000/like?postId=${post.id}&userId=${sessionStorage.getItem("CurrentUserId")}`).then((res) => {
                if (res.data.length === 0) {
                    props.setTotalLikes(post.totalLikes + 1);
                    axios.post("http://localhost:4000/like", {
                        postId: post.id,
                        userId: sessionStorage.getItem("CurrentUserId")
                    }).then(() => {
                        post.totalLikes++;
                        axios.put(`http://localhost:4000/post/${post.id}`, post);
                    });
                }
            })
        } else {
            axios.get(`http://localhost:4000/like?postId=${post.id}&userId=${sessionStorage.getItem("CurrentUserId")}`).then((res) => {
                if (res.data.length > 0) {
                    props.setTotalLikes(post.totalLikes - 1);
                    axios.delete(`http://localhost:4000/like/${res.data[0].id}`).then(() => {
                        post.totalLikes--;
                        axios.put(`http://localhost:4000/post/${post.id}`, post);
                    });
                }
            })
        }

    }, [liked, post, props]);


    React.useEffect(() => {

    }, [liked])

    function handleLike() {
        setLiked(true);
    }

    function handleUnlike() {
        setLiked(false);
    }


    return <Icon fontSize="large" sx={styles.icons} onClick={onClick}/>;
}
