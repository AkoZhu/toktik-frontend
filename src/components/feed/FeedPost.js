import React from "react";
import UserCard from "../shared/UserCard";
import {
    MoreIcon,
    CommentIcon,
    ShareIcon,
    UnlikeIcon,
    LikeIcon,
    RemoveIcon,
    SaveIcon
} from "../../icons";
import { Link } from "react-router-dom";
import {
    Typography,
    Button,
    Hidden,
    Divider,
    TextField,
    Box
} from "@mui/material";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import FollowSuggestions from "../shared/FollowSuggestions";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

const feedPostStyles = {
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
        padding: "6px 0px !important"
    },
    postButtonsWrapper: {
        padding: "0px 16px 8px !important"
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

function FeedPost({ post, index }) {
    const [showCaption, setCaption] = React.useState(false);
    const { id, media, likes, user, caption, comments } = post;
    const showFollowSuggestions = index === 1;

    return (
        <>
            <Box component="article"
                sx={ feedPostStyles.article }
                marginBottom={ showFollowSuggestions && 30 }
            >
                {/* Feed Post Header */}
                <div style={feedPostStyles.postHeader}>
                    <UserCard user={user} />
                    <MoreIcon
                        sx={feedPostStyles.moreIcon}
                        onClick={() => true}
                    />
                </div>
                {/* Feed Post Image */}
                <div>
                    <img src={media} alt="Post media" style={feedPostStyles.image}/>
                </div>
                {/* Feed Post Buttons */}
                <div style={feedPostStyles.postButtonsWrapper}>
                    <div style={feedPostStyles.postButtons}>
                        <LikeButton />
                        <Link to={`/p/${id}`}>
                            <CommentIcon />
                        </Link>
                        <ShareIcon />
                        <SaveButton />
                    </div>
                    <Typography sx={feedPostStyles.likes} variant="subtitle2">
                        <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
                    </Typography>
                    <div style={showCaption ? feedPostStyles.expanded : feedPostStyles.collapsed}>
                        <Link href={`/${user.username}`}>
                            <Typography
                                variant="subtitle2"
                                component="span"
                                sx={feedPostStyles.username}
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
                            <div style={feedPostStyles.captionWrapper}>
                                <HTMLEllipsis
                                    unsafeHTML={caption}
                                    sx={feedPostStyles.caption}
                                    maxLine="0"
                                    ellipsis="..."
                                    basedOn="letters"
                                />
                                <Button
                                    sx={feedPostStyles.moreButton}
                                    onClick={() => setCaption(true)}
                                >
                                    more
                                </Button>
                            </div>
                        )}
                    </div>
                    <Link to={`/p/${id}`}>
                        <Typography
                            sx={feedPostStyles.commentsLink}
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
                                    sx={feedPostStyles.commentUsername}
                                >
                                    {comment.user.username}
                                </Typography>{" "}
                                <Typography variant="body2" component="span">
                                    {comment.contet}
                                </Typography>
                            </Link>
                        </div>
                    ))}
                    <Typography color="textSecondary" sx={feedPostStyles.datePosted}>
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
    const className = liked ? feedPostStyles.liked : feedPostStyles.like;
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

    return <Icon className={feedPostStyles.saveIcon} onClick={onClick} />;
}

function Comment() {
    const [content, setContent] = React.useState("");

    return (
        <div style={feedPostStyles.commentContainer}>
            <TextField
                fullWidth
                value={content}
                placeholder="Add a comment..."
                multiline
                rowsMax={2}
                rows={1}
                onChange={event => setContent(event.target.value)}
                sx={feedPostStyles.textField}
                InputProps={{
                    classes: {
                        root: feedPostStyles.root,
                        underline: feedPostStyles.underline
                    }
                }}
            />
            <Button
                color="primary"
                sx={feedPostStyles.commentButton}
                disabled={!content.trim()}
            >
                Post
            </Button>
        </div>
    );
}

export default FeedPost;
