import React from "react";
import UserCard from "../common/UserCard";
import {Alert, Box, Button, Divider, Snackbar, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {ThemeProvider} from "@mui/material/styles";
import OptionDiag from "../common/OptionsDialog";
import theme from "../../theme";
import Comment from "../common/CommentBar"
import LikeButton from "../common/LikeButton";
import SaveButton from "../common/SaveButton";
import {deleteCommentById, getPostById} from "../../api/post";


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
    const [post, setPost] = React.useState(props.post);
    const [showCaption, setCaption] = React.useState(true);
    const showOption = props.post.username === sessionStorage.getItem("CurrentUsername");
    const [open, setOpen] = React.useState(false);

    const [commentId, setCommentId] = React.useState(-1);
    const [commentContent, setCommentContent] = React.useState("");
    const [replyTo, setReplyTo] = React.useState("");

    const [key, setKey] = React.useState(0);
    const [commentKey, setCommentKey] = React.useState(0);

    React.useEffect(() => {
        async function fetchComments() {
            const res = await getPostById(props.post._id);
            setPost(res);
        }

        fetchComments().then(() => true);
    }, [key, props.post._id])

    const handleReply = (username) => {
        setReplyTo(username);
        setCommentId(-1);
        setCommentContent("");
        setCommentKey(Math.random());
    }

    const handleDelete = (comment) => {
        deleteCommentById(comment.id).then(() => {
            setKey(Math.random());
            setReplyTo("");
            setCommentId(-1);
            setCommentContent("");
            setCommentKey(Math.random());
        });
    }

    const handleEdit = (comment) => {
        setReplyTo(comment.mention);
        setCommentId(comment.id || -1);
        setCommentContent(comment.message);
        setCommentKey(Math.random());
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
                    <Link href={'/profile/' + reply} sx={{ color: "gray", textDecoration: "none" }}>@{reply}</Link>
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
                <Alert severity="success">Comment Successfully!</Alert>
            </Snackbar>
            <Box component="article"
                 sx={styles.article}
            >
                <div style={styles.postHeader}>
                    <UserCard username={post.username}/>
                    {showOption && <OptionDiag post={post}/>}
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
                    <Link href={`/${post.username}`}>
                        <Typography
                            variant="subtitle2"
                            component="span"
                            sx={styles.username}
                        >
                            {post.username}
                        </Typography>
                    </Link>
                    {showCaption ? (
                        <div>
                            <Typography
                                variant="body2"
                                component="span"
                                dangerouslySetInnerHTML={{__html: post.description}}
                            />
                        </div>
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
                                More
                            </Button>
                        </div>
                    )}
                </div>
                <Divider sx={{marginBottom: "10px", marginTop: "10px"}}/>
                <Box height={320} sx={{overflow: "hidden", overflowY: "scroll"}}>
                    <Box sx={styles.commentContent}>
                        {post.comments.map(comment => (
                            <Typography key={comment.id}>
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
                                    {sessionStorage.getItem("CurrentUsername") === comment.username &&
                                        <>
                                            <Button varient="text" disableRipple="true" size="small" xs={{display: "none"}}
                                                    onClick={() => handleEdit(comment)}>
                                                Edit
                                            </Button>
                                            <Button varient="text" disableRipple="true" size="small" xs={{display: "none"}}
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
                        <LikeButton post={post} setKey={setKey}/>
                        <SaveButton/>
                    </div>
                    <Typography sx={styles.likes} variant="subtitle2">
                        <span>{post.totalLikes === 1 ? "1 like" : `${post.totalLikes} likes`}</span>
                    </Typography>
                    <Box marginBottom={2}>
                        {post.tagging.length > 0 && post.tagging.map(tag => (
                            <Link href={"/profile/" + tag.username} underline={"hover"} color={"black"}>
                                {"@" + tag.username}
                            </Link>
                        ))}
                    </Box>
                    <Typography color="textSecondary" sx={styles.datePosted}>
                        5 DAYS AGO
                    </Typography>
                </div>
                <Comment
                    key={commentKey}
                    setKey={setKey}
                    setOpen={setOpen}
                    post={post}
                    commentId={commentId}
                    setCommentId={setCommentId}
                    replyTo={replyTo}
                    setReplyTo={setReplyTo}
                    content={commentContent}
                />
            </div>
        </ThemeProvider>
    )
}
