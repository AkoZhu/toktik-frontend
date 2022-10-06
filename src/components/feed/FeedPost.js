import React from "react";
import UserCard from "../common/UserCard";
import {CommentIcon, LikeIcon, MoreIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon} from "../../icons";
import {Link} from "react-router-dom";
import {Box, Button, Divider, Hidden, TextField, Typography} from "@mui/material";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import FollowSuggestions from "../shared/FollowSuggestions";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

const styles = {
    article: {
        border: "1px solid #e6e6e6",
        background: "#ffffff",
        marginBottom: 60,
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
        padding: "10px 0px !important"
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

export default function FeedPost({post, index}) {
    const [showCaption, setCaption] = React.useState(false);
    const {id, media, likes, user, caption, comments} = post;
    const showFollowSuggestions = index === 1;

    return (
        <>
            <Box component="article"
                 sx={styles.article}
                 marginBottom={showFollowSuggestions && 30}
            >
                {/* Feed Post Header */}
                <div style={styles.postHeader}>
                    <UserCard user={user}/>
                    <MoreIcon
                        className={styles.moreIcon}
                        onClick={() => true}
                    />
                </div>
                {/* Feed Post Image */}
                <div>
                    <img src={media} alt="Post media" style={styles.image}/>
                </div>
                {/* Feed Post Buttons */}
                <div style={styles.postButtonsWrapper}>
                    <div style={styles.postButtons}>
                        <LikeButton/>
                        <Link href={`/p/${id}`}>
                            <CommentIcon/>
                        </Link>
                        <ShareIcon/>
                        <SaveButton/>
                    </div>
                    <Typography sx={styles.likes} variant="subtitle2">
                        <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
                    </Typography>
                    <div style={showCaption ? styles.expanded : styles.collapsed}>
                        <Link href={`/${user.username}`}>
                            <Typography
                                variant="subtitle2"
                                component="span"
                                sx={styles.username}
                            >
                                {user.username}
                            </Typography>
                        </Link>
                        {showCaption ? (
                            <Typography
                                variant="body2"
                                component="span"
                                dangerouslySetInnerHTML={{ __html: caption }}
                            />
                        ) : (
                            <div style={styles.captionWrapper}>
                                <HTMLEllipsis
                                    unsafeHTML={caption}
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
                    <Link to={`/p/${id}`}>
                        <Typography
                            sx={styles.commentsLink}
                            variant="body2"
                            component="div"
                        >
                            View all {comments.length} comments
                        </Typography>
                    </Link>
                    {comments.map(comment => (
                        <div key={comment.id}>
                            <Link to={`/${comment.user.username}`}>
                                <Typography
                                    variant="subtitle2"
                                    component="span"
                                    sx={styles.commentUsername}
                                >
                                    {comment.user.username}
                                </Typography>{" "}
                                <Typography variant="body2" component="span">
                                    {comment.contet}
                                </Typography>
                            </Link>
                        </div>
                    ))}
                    <Typography color="textSecondary" sx={styles.datePosted}>
                        5 DAYS AGO
                    </Typography>
                </div>
                <Hidden xsDown>
                    <Divider />
                    <Comment />
                </Hidden>
            </Box>
            {showFollowSuggestions && <FollowSuggestions />}
        </>
    );
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
                rowsMax={2}
                rows={1}
                onChange={event => setContent(event.target.value)}
                sx={styles.textField}
                InputProps={{
                    classes: {
                        root: styles.root,
                        underline: styles.underline
                    }
                }}
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
