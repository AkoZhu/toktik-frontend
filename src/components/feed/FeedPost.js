import React from "react";
import UserCard from "../common/UserCard";
import Link from '@mui/material/Link';
import {Box, Button, Divider, Typography} from "@mui/material";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ShareIcon from '@mui/icons-material/Share';
import FollowButton from "../common/FollowButton";
import Comment from "../common/CommentBar"
import LikeButton from "../common/LikeButton";
import SaveButton from "../common/SaveButton";
import {PostModal} from "../post/PostModal";
import {getCommentByPostId, getPostById} from "../../api/post";
import {getLikeCountByPostId} from "../../api/user";
import LoadingScreen from "../common/LoadingScreen";
import {getLastManyFromArray} from "../../utils";

const theme = createTheme();

const styles = {
    article: {
        border: "1px solid #e6e6e6",
        background: "#ffffff",
        marginBottom: 5,
        [theme.breakpoints.down("xs")]: {
            border: "unset",
            marginBottom: 0
        }
    },
    postHeader: {
        borderBottom: "1px solid rgba(var(--ce3,239,239,239),1)",
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "auto minmax(auto, 20px)",
        gridGap: 10,
        alignItems: "center",
        padding: 16
    },
    moreIcon: {
        height: 24,
        width: 18,
        justifySelf: "center",
        "&:hover": {
            cursor: "pointer"
        }
    },
    image: {
        width: "100%"
    },
    postButtons: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "24px 24px 24px minmax(24px, auto)",
        gridGap: 16,
        paddingTop: "6px",
        paddingRight: "0px",
    },
    postButtonsWrapper: {
        paddingTop: "8px",
        paddingRight: "16px",
        paddingBottom: "8px",
        paddingLeft: "16px",
        textAlign: "left"
    },
    commentUsername: {
        fontWeight: "600 !important"
    },
    datePosted: {
        fontSize: "10px !important"
    },
    likes: {
        fontWeight: "600 !important",
        "&:hover": {
            cursor: "pointer"
        }
    },
    like: {
        animation: "$like-button-animation 0.45s",
        animationTimingFunction: "ease-in-out",
        transform: "scale(1)"
    },
    liked: {
        animation: "$liked-button-animation 0.45s",
        animationTimingFunction: "ease-in-out",
        transform: "scale(1)"
    },
    "@keyframes like-button-animation": {
        "0%": {transform: "scale(1)"},
        "25%": {transform: "scale(1.2)"},
        "50%": {transform: "scale(0.95)"},
        "100%": {transform: "scale(1)"}
    },
    "@keyframes liked-button-animation": {
        "0%": {transform: "scale(1)"},
        "25%": {transform: "scale(1.2)"},
        "50%": {transform: "scale(0.95)"},
        "100%": {transform: "scale(1)"}
    },
    textField: {
        paddingLeft: "10px",
        "& fieldset": {border: 'none'},
    },
    root: {
        fontSize: "14px !important"
    },
    underline: {
        "&::before": {
            border: "none !important"
        },
        "&::after": {
            border: "none !important"
        },
        "&:hover&:before": {
            border: "none !important"
        }
    },
    commentContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "auto minmax(auto, 56px)",
        padding: "0px 0px 0px 16px !important"
    },
    icons: {
        color: "black",
        strokeWidth: 1,
        stroke: "#ffffff",
        transform: "scale(0.85)"
    },
    commentButton: {
        width: "48px !important",
        padding: "unset"
    },
    moreButton: {
        color: "#999 !important",
        padding: "0px !important",
        "&:hover": {
            background: "transparent !important"
        }
    },
    saveIcon: {
        justifySelf: "right"
    },
    commentsLink: {
        color: "#999",
        margin: "5px 0 !important"
    },
    collapsed: {
        display: "flex",
        alignItems: "center"
    },
    expanded: {
        display: "block"
    },
    caption: {
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif`,
        fontSize: "14px !important"
    },
    captionWrapper: {
        display: "flex",
        alignItems: "center",
        wordBreak: "break-all"
    },
    username: {
        fontWeight: "600 !important",
        marginRight: "5px !important"
    }
};

export default function FeedPost(props) {
    const [post, setPost] = React.useState(props.post);
    const [totalLikes, setTotalLikes] = React.useState();
    const [comments, setComments] = React.useState([]);

    const [showCaption, setCaption] = React.useState(false);
    const [key, setKey] = React.useState(0);

    const [postModalOpen, setPostModalOpen] = React.useState(false);
    const handlePostModalOpen = () => setPostModalOpen(true);
    const handlePostModalClose = () => {
        setPostModalOpen(false);
        setKey(Math.random());
    }


    const fetchPost = async () => {
        const post = await getPostById(props.post._id);
        setPost(post);
        const likes = await getLikeCountByPostId(props.post._id);
        setTotalLikes(likes);
        const comments = await getCommentByPostId(props.post._id);
        setComments(comments);
    }

    React.useEffect(() => {
        fetchPost().then();
        // eslint-disable-next-line
    }, [key, props.post._id]);

    const refreshComments = () => {
        getCommentByPostId(props.post._id).then((comments) => {
            setComments(comments);
        });
    }

    const refreshLikes = () => {
        getLikeCountByPostId(props.post._id).then((likes) => {
            setTotalLikes(likes);
        });
    }

    if (!post) return <LoadingScreen/>;

    return (
        <ThemeProvider theme={theme}>
            <Box component="article"
                 sx={styles.article}
                 marginBottom={30}
            >
                {/* Feed Post Header */}
                <div style={styles.postHeader}>
                    <UserCard username={post.username}/>
                    <FollowButton targetUsername={post.username} side={false} handleFollower={() => true}/>
                </div>
                {/* Feed Post Image */}
                <div>
                    {post.postType === 0 ?
                        <img src={post.postContent} alt="Post media" style={styles.image}/> :
                        <video src={post.postContent} controls style={styles.image}/>
                    }
                </div>
                {/* Feed Post Buttons */}
                <div style={styles.postButtonsWrapper}>
                    <div style={styles.postButtons}>
                        <LikeButton post={post} refreshLikes={refreshLikes} postModalOpen={postModalOpen}/>
                        <SaveButton/>
                        <MapsUgcOutlinedIcon fontSize="large" sx={styles.icons} onClick={handlePostModalOpen}/>
                        <PostModal open={postModalOpen} handleClose={handlePostModalClose} post={post}/>
                        <ShareIcon fontSize="large" sx={styles.icons}/>
                    </div>
                    {totalLikes !== null && <Typography sx={styles.likes} variant="subtitle2">
                        <span>{totalLikes <= 1 ? `${totalLikes} like` : `${totalLikes} likes`}</span>
                    </Typography>}
                    <div style={showCaption ? styles.expanded : styles.collapsed}>
                        <Link href={`/profile/${post.username}`}>
                            <Typography
                                variant="subtitle2"
                                component="span"
                                sx={styles.username}
                            >
                                {post.username}
                            </Typography>
                        </Link>
                        {showCaption ? (
                            <Typography
                                variant="body2"
                                component="span"
                                dangerouslySetInnerHTML={{__html: post.description}}
                            />
                        ) : (
                            <div style={styles.captionWrapper}>
                                <HTMLEllipsis
                                    unsafeHTML={post.description}
                                    sx={styles.caption}
                                    maxLine="0"
                                    ellipsis="..."
                                    basedOn="letters"
                                />
                                <Button
                                    sx={styles.moreButton}
                                    onClick={() => setCaption(true)}
                                >
                                    more
                                </Button>
                            </div>
                        )}
                    </div>
                    <Box>
                        {post.tagging.length > 0 && post.tagging.map(tag => (
                            <Link href={"/profile/" + tag} underline={"hover"} color={"black"}
                                  key={tag}>
                                {"@" + tag}
                            </Link>
                        ))}
                    </Box>
                    <Link href={'#'}>
                        <Typography
                            sx={styles.commentsLink}
                            variant="body2"
                            component="div"
                            onClick={handlePostModalOpen}
                        >
                            View all {comments.length} comments
                        </Typography>
                    </Link>
                    <Box key={key}>
                        {getLastManyFromArray(comments, 5).map(comment => (
                            <div key={comment._id}>
                                <Typography sx={{color: "#3f50b5"}}>
                                    <Typography
                                        variant="subtitle2"
                                        component="span"
                                        sx={styles.commentUsername}
                                    >
                                        {comment.username}
                                    </Typography>{" "}
                                    <Typography variant="body2" component="span">
                                        {comment.message}
                                    </Typography>
                                </Typography>
                            </div>
                        ))}
                    </Box>
                    <Typography color="textSecondary" sx={styles.datePosted}>
                        5 DAYS AGO
                    </Typography>
                </div>
                <Divider/>
                <Comment
                    post={post}
                    commentId={-1}
                    replyTo={""}
                    clickReply={true}
                    content={""}
                    refreshComments={refreshComments}
                />
            </Box>
        </ThemeProvider>
    );
}
