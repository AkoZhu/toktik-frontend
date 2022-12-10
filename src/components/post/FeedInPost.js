import React from "react";
import UserCard from "../common/UserCard";
import {Alert, Box, Button, Divider, Snackbar, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import {ThemeProvider} from "@mui/material/styles";
import OptionDiag from "./OptionsDialog";
import theme from "../../theme";
import Comment from "../common/CommentBar"
import LikeButton from "../common/LikeButton";
import SaveButton from "../common/SaveButton";
import {deleteCommentById, getCommentByPostId} from "../../api/post";
import {getLikeCountByPostId} from "../../api/user";


const styles = {
    article: {
        border: "1px solid #e6e6e6",
        background: "#ffffff",
        marginBottom: 0,
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
        padding: 14
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
        maxHeight: "643px",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
    },
    postButtons: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "24px 24px 24px minmax(24px, auto)",
        gridGap: 16,
        paddingTop: "3px",
        paddingRight: "0px",
    },
    postButtonsWrapper: {
        paddingTop: "8px",
        paddingRight: "16px",
        paddingBottom: "8px",
        paddingLeft: "16px",
        textAlign: "left",

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
        padding: "10px 0px !important",
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
    comment: {
        display: "grid",
        gridAutoFlow: "column",
        // gridAutoFlow: "row",
        gridTemplateColumns: "auto minmax(auto, 56px)",
        // gridTemplateRows:"auto",
        // padding: "0px 0px 0px 16px !important"
        // padding: "0px 0px 0px 10px !important"
        paddingLeft: "16px !important",
        marginLeft: "3px !important",
    },
    commentContent: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "auto",
        paddingLeft: "16px !important",
        // paddingTop:"10px !important",
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
    lessButton: {
        color: "#999 !important",
        paddingLeft: "342px !important",
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
};

export function FeedImage({post}) {
    const boxStyle = {
        marginTop: "0px",
        marginBottom: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    }

    return (
        <Box sx={boxStyle}>
            {post.postType === 0 ?
                <img src={post.postContent} alt="Post media" style={styles.image}/> :
                <video src={post.postContent} controls style={styles.image}/>
            }
        </Box>
    )

}

export function FeedInfo(props) {
    const showOption = props.post.username === localStorage.getItem("CurrentUsername");
    const [open, setOpen] = React.useState(false);

    const [comments, setComments] = React.useState([]);
    const [totalLikes, setTotalLikes] = React.useState(0);

    const [commentId, setCommentId] = React.useState(-1);
    const [commentContent, setCommentContent] = React.useState("");
    const [replyTo, setReplyTo] = React.useState("");
    const [clickReply, setClickReply] = React.useState(new Date());

    React.useEffect(() => {
        async function fetchData() {
            setTotalLikes(await getLikeCountByPostId(props.post._id));
            setComments(await getCommentByPostId(props.post._id));
        }

        fetchData().then();
        setInterval(() => {
            fetchData().then();
        }, 5000);
    }, [props.post._id])

    function refreshComments() {
        getCommentByPostId(props.post._id).then((data) => {
            setComments(data);
        });
        setOpen(true);
        setCommentId(-1);
        setCommentContent("");
        setReplyTo("");
    }

    function refreshLikes() {
        getLikeCountByPostId(props.post._id).then((data) => setTotalLikes(data));
    }


    const handleReply = (username) => {
        setReplyTo(username);
        setCommentId(-1);
        setCommentContent("");
        setClickReply(new Date());
    }

    const handleDelete = (comment) => {
        deleteCommentById(comment._id).then(() => {
            setCommentContent("");
            refreshComments();
        });
    }

    const handleEdit = (comment) => {
        setReplyTo(comment.mention);
        setCommentId(comment._id || -1);
        setCommentContent(comment.message);
    }

    const handleMessage = (reply, message) => {
        if (!reply) {
            return (
                <Typography variant="body2" component="span">
                    {message}
                </Typography>
            )
        } else {
            return (
                <>
                    <Link href={'/profile/' + reply} sx={{color: "gray", textDecoration: "none"}}>@{reply}</Link>
                    <Typography variant="body2" component="span">
                        {" " + message}
                    </Typography>
                </>
            )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
            >
                <Alert severity="success">Comment Added/Modified Successfully!</Alert>
            </Snackbar>
            <Box component="article"
                 sx={styles.article}
            >
                <div style={styles.postHeader}>
                    <UserCard username={props.post.username}/>
                    {showOption && <OptionDiag post={props.post}/>}
                </div>
            </Box>


            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 550
                }}
            >
                <div style={styles.postButtonsWrapper}>
                    <Link href={`/profile/${props.post.username}`}>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={styles.username}
                        >
                            {props.post.username}
                        </Typography>
                    </Link>
                    <div>
                        <Typography
                            variant="body2"
                            component="span"
                            dangerouslySetInnerHTML={{__html: props.post.description}}
                        />
                    </div>
                </div>
                <Divider sx={{marginTop: "10px"}}/>
                <Box>
                    <Box height={310} sx={{overflow: "hidden", overflowY: "scroll"}}>
                        <Box sx={styles.commentContent}>
                            {comments.map(comment => (
                                <Typography key={comment._id}>
                                    <Typography
                                        variant="subtitle2"
                                        component="span"
                                        sx={styles.commentUsername}
                                    >
                                        {comment.username}
                                    </Typography>{" "}
                                    <Typography variant="body2" component="span">
                                        {handleMessage(comment.mention, comment.message)}
                                    </Typography>
                                    <br/>
                                    <Box>
                                        <Button varient="text" disableRipple="true" size="small"
                                                onClick={() => handleReply(comment.username)}>
                                            Reply
                                        </Button>
                                        {localStorage.getItem("CurrentUsername") === comment.username &&
                                            <>
                                                <Button varient="text" disableRipple="true" size="small"
                                                        xs={{display: "none"}}
                                                        onClick={() => handleEdit(comment)}>
                                                    Edit
                                                </Button>
                                                <Button varient="text" disableRipple="true" size="small"
                                                        xs={{display: "none"}}
                                                        onClick={() => handleDelete(comment)}>
                                                    Delete
                                                </Button>
                                            </>
                                        }
                                    </Box>
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/*<Hidden xsDown sx={{position:"fixed", bottom:0}}>*/}
                <div style={{position: "fixed", bottom: 0, width: "50%"}}>
                    <Divider/>
                    <div style={styles.postButtonsWrapper}>
                        <div style={styles.postButtons}>
                            <LikeButton post={props.post} refreshLikes={refreshLikes} postModalOpen={true}/>
                            <SaveButton/>
                        </div>
                        <Typography sx={styles.likes} variant="subtitle2">
                            <span>{totalLikes <= 1 ? `${totalLikes} like` : `${totalLikes} likes`}</span>
                        </Typography>
                        <Box marginBottom={2}>
                            {props.post.tagging.length > 0 && props.post.tagging.map(tag => (
                                <Link href={"/profile/" + tag} underline={"hover"} color={"black"}>
                                    {"@" + tag}
                                </Link>
                            ))}
                        </Box>
                        <Typography color="textSecondary" sx={styles.datePosted}>
                            5 DAYS AGO
                        </Typography>
                    </div>
                    <Comment
                        post={props.post}
                        commentId={commentId}
                        replyTo={replyTo}
                        clickReply={clickReply}
                        content={commentContent}
                        refreshComments={refreshComments}
                    />
                </div>
            </Box>
        </ThemeProvider>
    );
}
