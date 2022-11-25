import React from "react";
import {Button, TextField} from "@mui/material";
import {postComment} from "../../api/post";
import {extractReply} from "../../utils";


const styles = {
    commentContainer: {
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "auto minmax(auto, 56px)",
        padding: "0px 0px 0px 16px !important"
    },
    textField: {
        paddingLeft: "10px",
        "& fieldset": {border: 'none'},
    },
    commentButton: {
        width: "48px !important",
        padding: "unset"
    },
}


export default function Comment(props) {
    const post = props.post;

    const replyTo = props.replyTo;
    const [content, setContent] = React.useState(props.content);

    React.useEffect(() => {
        if (replyTo !== "") {
            setContent(`@${replyTo} ${props.content}`);
        }
    }, [props.key, props.content, replyTo]);

    const handleOnChange = (event) => {
        setContent(event.target.value);
    }

    const handleCommentPost = () => {
        let newComment = {
            username: sessionStorage.getItem("CurrentUsername"),
            postId: post._id,
            message: extractReply(content)[1],
            mention: replyTo,
        };

        postComment(props.commentId, newComment).then(success => {
            if (success) {
                props.setKey(Math.random());
                setContent("");
                props.setOpen(true);
                props.setCommentId(-1);
                props.setReplyTo("");
            } else {
                alert("Error posting comment!");
            }
        });
    }

    return (
        <div style={styles.commentContainer}>
            <TextField
                fullWidth
                value={content}
                placeholder="Add a comment..."
                multiline
                rows={1}
                id="commentText"
                onChange={handleOnChange}
                sx={styles.textField}
            />
            <Button
                color="primary"
                sx={styles.commentButton}
                disabled={!content.trim()}
                onClick={handleCommentPost}
            >
                Post
            </Button>
        </div>
    );
}
