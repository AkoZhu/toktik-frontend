import React from "react";
import {useNotificationListStyles} from "../../styles";
import {defaultNotifications} from "../../data";
import {Avatar, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import FollowButton from "../shared/FollowButton";
import useOutsideClick from "@rooks/use-outside-click";

function NotificationList({handleHideList}) {
    const classes = useNotificationListStyles();
    const listContainerRef = React.useRef();
    useOutsideClick(listContainerRef, handleHideList);

    return (
        <Grid ref={listContainerRef} class={classes.listContainer} container>
            {defaultNotifications.map(notification => {
                const isLike = notification.type === "like";
                const isFollow = notification.type === "follow";

                return (
                    <Grid key={notification.id} item class={classes.listItem}>
                        <div class={classes.listItemWrapper}>
                            <div class={classes.avatarWrapper}>
                                <Avatar
                                    src={notification.user.profileImage}
                                    alt="User avatar"
                                />
                            </div>
                            <div class={classes.nameWrapper}>
                                <Link to={`/${notification.user.username}`}>
                                    <Typography variant="body1">
                                        {notification.user.username}
                                    </Typography>
                                </Link>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    class={classes.typography}
                                >
                                    {isLike && `likes your photo. 4d`}
                                    {isFollow && `started following you. 5d`}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            {isLike && (
                                <Link to={`/p/${notification.post.id}`}>
                                    <Avatar src={notification.post.media} alt="post cover" />
                                </Link>
                            )}
                            {isFollow && <FollowButton />}
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default NotificationList;
