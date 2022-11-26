import React from "react";
import IconSheet2 from "../../assets/icon-sheet-2.png";
import Box from "@mui/material/Box";
import {PostModal} from "../post/PostModal";
import theme from "../../theme";

const iconProps = {
    backgroundImage: `url(${IconSheet2})`,
    backgroundRepeat: "no-repeat",
    height: 12
};

export const useGridPostStyles = (theme) => ({
    image: {
        width: "100%",
        height: "100%",
        userSelect: "none",
        objectFit: "cover",
    },
    gridPostContainer: {
        position: "relative"
    },
    gridPostOverlay: {
        [theme.breakpoints.down("xs")]: {
            gridAutoFlow: "row",
            alignContent: "space-evenly"
        },
        position: "absolute",
        display: "grid",
        placeItems: "center",
        gridAutoFlow: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        "&:hover": {
            background: "rgba(0,0,0,0.6)",
            cursor: "pointer",
            "& > div": {
                opacity: 1
            }
        }
    },
    gridPostInfo: {
        color: "#ffffff",
        display: "grid",
        gridAutoFlow: "column",
        gridGap: 5,
        placeItems: "center",
        opacity: 0
    },
    likes: {
        ...iconProps,
        backgroundPosition: "-328px -239px",
        backgroundSize: "355px 344px",
        height: 16,
        width: 16
    },
    comments: {
        ...iconProps,
        backgroundPosition: "-327px -203px",
        backgroundSize: "355px 344px",
        height: 16,
        width: 18
    }
});


function GridPost({post}) {
    const styles = useGridPostStyles(theme);
    const [open, setOpen] = React.useState(false);
    // const [totalLikes, setTotalLikes] = React.useState(0);
    // const [comments, setComments] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // React.useEffect(() => {
    //     async function fetchData() {
    //         setTotalLikes(await getLikeCountByPostId(post._id));
    //         setComments(await getCommentByPostId(post._id));
    //     }
    //
    //     fetchData().then();
    // }, [post._id]);


    return (
        <>
            <Box component="div" aria-label={"profile-post-box"} onClick={handleOpen} sx={styles.gridPostContainer}>
                <Box component="div" sx={styles.gridPostOverlay}>
                    {/*<div style={styles.gridPostInfo}>*/}
                    {/*    <span style={styles.likes}/>*/}
                    {/*    <Typography>{totalLikes}</Typography>*/}
                    {/*</div>*/}
                    {/*<div style={styles.gridPostInfo}>*/}
                    {/*    <span style={styles.comments}/>*/}
                    {/*    <Typography>{comments.length}</Typography>*/}
                    {/*</div>*/}
                </Box>
                {post.postType === 0 ?
                    <img src={post.postContent} alt="Post media" style={styles.image}/> :
                    <video src={post.postContent} controls style={styles.image}/>
                }
            </Box>
            <PostModal open={open} handleClose={handleClose} post={post}/>
        </>
    )
}

export default GridPost;
