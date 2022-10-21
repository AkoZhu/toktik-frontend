import React from "react";
import axios from "axios";
import {Button, TextField} from "@mui/material";

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


export default function Comment({replyTo, post}) {
    const [content, setContent] = React.useState("");

    React.useEffect(() => {
        if(replyTo !== ""){
            setContent(`@${replyTo} `);
        }
    }, [replyTo]);

    const handleOnChange = (event) => {
        setContent(event.target.value);
    }
    const handleCommentPost = () =>{
        let newComments = post.comments;
        const newComment =
            {
                username: sessionStorage.getItem("CurrentUsername"),
                postId: post.postId,
                message: content,
                mention: replyTo,
            }
        newComments.push( newComment )

        const postBody = {
            id: post.id,
            username: post.username,
            postContent:post.postContent,
            postType: post.type,
            description: post.description,
            public: post.public,
            totalLikes: post.totalLikes,
            tagging: post.tagging,
            comments: newComments,
        }
        axios.put("http://localhost:4000/post/" + post.id , postBody).then(
            () => {
                axios.get("http://localhost:4000/comment").then(
                    (response) => {
                        if(response.status !== 200) console.log("Error in get comment");
                        let comments = response.data;
                        // console.log("comments: " + comments);
                        comments.push(newComment);

                        axios.put("http://localhost:4000/comment", comments);
                        console.log("username: " + newComment.username);
                        window.location.reload();
                    }
                )
            }
        )
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