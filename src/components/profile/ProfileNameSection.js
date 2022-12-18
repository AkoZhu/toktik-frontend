import React from "react";
import {Typography} from "@mui/material";
import FollowButton from "../common/FollowButton";
import {styles} from "./ProfileStyle";


export function ProfileNameSection(props) {

    return (
        <>
            <section style={styles.usernameSection}>
                <Typography sx={styles.username}>{props.username}</Typography>
                <div style={{paddingLeft: "20px"}}>
                    {!props.isOwner &&
                        <FollowButton targetUsername={props.username} handleFollower={props.handleFollower}
                                      side/>}
                </div>
            </section>
        </>
    );
}