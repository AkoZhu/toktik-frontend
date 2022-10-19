import React from "react";
import UserCard from "../common/UserCard";
import {CommentIcon, LikeIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon} from "../../icons";
import {Link} from "react-router-dom";
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import {ThemeProvider} from "@mui/material/styles";
import OptionDiag from "../common/OptionsDialog";
import theme from "../../theme";

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
        maxHeight: "600px",
        maxWidth: "100%",
        height: "auto",
        width: "auto",
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
        paddingBottom: "0px",
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
        "0%": { transform: "scale(1)" },
        "25%": { transform: "scale(1.2)" },
        "50%": { transform: "scale(0.95)" },
        "100%": { transform: "scale(1)" }
    },
    "@keyframes liked-button-animation": {
        "0%": { transform: "scale(1)" },
        "25%": { transform: "scale(1.2)" },
        "50%": { transform: "scale(0.95)" },
        "100%": { transform: "scale(1)" }
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
    commentContent:{
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "auto",
        paddingLeft:"16px !important",
        // paddingTop:"3px !important",
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
};

export function FeedImage({post, index}){
    const boxStyle= {
        marginTop: "0px",
        marginBottom: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    }

    return (
        <Box sx={boxStyle}>
            <img src={post.postContent} alt="Post media" style={styles.image}/>
        </Box>
    )

}

export function FeedInfo({post, index}) {
    const [showCaption, setCaption] = React.useState(true);

    return (
        <ThemeProvider theme={theme}>
            <Box component="article"
                 sx={styles.article}
            >
                <div style={styles.postHeader}>
                    <UserCard user={post.username}/>
                    <OptionDiag post={post}/>
                </div>
            </Box>


            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 550,
                    overflow: "hidden",
                    overflowY: "scroll",
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
                                {comment.message}
                            </Typography>
                            <br/>
                            <Button varient="text" disableRipple="true" size="small">
                                Reply
                            </Button>
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/*<Hidden xsDown sx={{position:"fixed", bottom:0}}>*/}
            <div style={{position: "fixed", bottom: 0, width: "50%"}}>
                <Divider/>
                <div style={styles.postButtonsWrapper}>
                    <div style={styles.postButtons}>
                        <LikeButton/>
                        <Link href={`/p/${post.id}`}>
                            <CommentIcon/>
                        </Link>
                        <ShareIcon/>
                        <SaveButton/>
                    </div>
                    <Typography sx={styles.likes} variant="subtitle2">
                        <span>{post.totalLikes === 1 ? "1 like" : `${post.totalLikes} likes`}</span>
                    </Typography>
                    <Typography color="textSecondary" sx={styles.datePosted}>
                        5 DAYS AGO
                    </Typography>
                </div>
                <Comment/>
            </div>
        </ThemeProvider>
    )
}


function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    const Icon = liked ? UnlikeIcon : LikeIcon;
    const className = liked ? styles.liked : styles.like;
    const onClick = liked ? handleUnlike : handleLike;

    function handleLike() {
        console.log("like");
        setLiked(true);
    }

    function handleUnlike() {
        console.log("unlike");
        setLiked(false);
    }

    return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
    const [saved, setSaved] = React.useState(false);
    const Icon = saved ? RemoveIcon : SaveIcon;
    const onClick = saved ? handleRemove : handleSave;

    function handleSave() {
        console.log("save");
        setSaved(true);
    }

    function handleRemove() {
        console.log("remove");
        setSaved(false);
    }

    return <Icon className={styles.saveIcon} onClick={onClick}/>;
}

function Comment() {
    const [content, setContent] = React.useState("");

    return (
        <div style={styles.commentContainer}>
            <TextField
                fullWidth
                value={content}
                placeholder="Add a comment..."
                multiline
                rows={1}
                onChange={event => setContent(event.target.value)}
                sx={styles.textField}
            />
            <Button
                color="primary"
                sx={styles.commentButton}
                disabled={!content.trim()}
            >
                Post
            </Button>
        </div>
    );
}
