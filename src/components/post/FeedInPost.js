import React from "react";
import UserCard from "../common/UserCard";
import {Alert, Box, Button, Divider, Snackbar, Typography} from "@mui/material";
import Link from '@mui/material/Link';
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {ThemeProvider} from "@mui/material/styles";
import OptionDiag from "../common/OptionsDialog";
import theme from "../../theme";
import Comment from "../common/CommentBar"
import axios from "axios";
import LikeButton from "../common/LikeButton";
import SaveButton from "../common/SaveButton";


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

export function FeedImage({post, index}) {
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

export function FeedInfo({post}) {
    const [showCaption, setCaption] = React.useState(true);
    const [totalLikes, setTotalLikes] = React.useState(post.totalLikes);
    const showOption = post.username === sessionStorage.getItem("CurrentUsername");
    const [open, setOpen] = React.useState(false);
    const [replyTo, setReplyTo] = React.useState('');
    const [comments, setComments] = React.useState(post.comments);
    const [key, setKey] = React.useState(0);

    const handleReply = async (e, username) => {
        await setReplyTo(username);
    }

    React.useEffect(() => {
        axios.get("http://localhost:4000/post/" + post.id).then((res) => {
            setComments(res.data.comments);
        })
    }, [key, post.id])

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
                    <UserCard user={post.username}/>
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
                    <CommentsContent key={key} comments={comments} handleReply={handleReply}/>
                </Box>
            </Box>

            {/*<Hidden xsDown sx={{position:"fixed", bottom:0}}>*/}
            <div style={{position: "fixed", bottom: 0, width: "50%"}}>
                <Divider/>
                <div style={styles.postButtonsWrapper}>
                    <div style={styles.postButtons}>
                        <LikeButton post={post} setTotalLikes={setTotalLikes}/>
                        <SaveButton/>
                    </div>
                    <Typography sx={styles.likes} variant="subtitle2">
                        <span>{totalLikes === 1 ? "1 like" : `${totalLikes} likes`}</span>
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
                <Comment replyTo={replyTo} post={post} setKey={setKey} setOpen={setOpen}/>
            </div>
        </ThemeProvider>
    )
}

function CommentsContent(props) {
    return (
        <Box sx={styles.commentContent}>
            {props.comments.map(comment => (
                <Typography key={comment.id}>
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
                    <br/>
                    <Button varient="text" disableRipple="true" size="small"
                            onClick={(e) => props.handleReply(e, comment.username)}>
                        Reply
                    </Button>
                </Typography>
            ))}
        </Box>
    )
}