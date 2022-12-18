import React from "react";
import Layout from "../components/common/Layout";
import ProfilePicture from "../components/profile/ProfilePicture";
import {Card, CardContent, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {useParams} from "react-router-dom";
import ProfileTabs from "../components/profile/ProfileTabs";
import Box from "@mui/material/Box";
import theme from "../theme"
import LoadingScreen from "../components/common/LoadingScreen";
import {styles, useProfilePageStyles} from "../components/profile/ProfileStyle";
import {ProfileNameSection} from "../components/profile/ProfileNameSection";
import {PostCountSection} from "../components/profile/PostCountSection";
import {getFollowerCountByUsername, getUserByName} from "../api/user";
import {getPostByUsername} from "../api/post";

function Profile() {
    const params = useParams();
    const currentUser = localStorage.getItem("CurrentUsername");
    const profileUsername = params.username ? params.username : currentUser;

    const isOwner = profileUsername === currentUser;
    const useStyles = useProfilePageStyles(theme);

    const [user, setUser] = React.useState({});
    const [userCreatedAt, setUserCreatedAt] = React.useState(new Date());
    const [posts, setPosts] = React.useState([]);
    const [followerCount, setFollowerCount] = React.useState();

    const update = async () => {
        const tmpUser = await getUserByName(profileUsername);
        setUser(tmpUser);
        setUserCreatedAt(new Date(tmpUser.createdAt));
        setPosts(await getPostByUsername(profileUsername));
        setFollowerCount(await getFollowerCountByUsername(profileUsername));
    }

    React.useEffect(() => {
        update().then();
        setInterval(() => {
            update().then();
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleFollower() {
        getFollowerCountByUsername(profileUsername).then((data) => {
            setFollowerCount(data);
        });
    }

    if (!(currentUser && user)) return <LoadingScreen/>;

    return (
        <Layout data-testid='profile_1'
                title={`${user.firstName} (@${user.username})`}
        >
            <Box component="div" sx={useStyles.container} data-testid='profile_2'>
                <Card sx={styles.cardLarge}>
                    <ProfilePicture image={user.profilePicture} isOwner={isOwner}/>
                    <CardContent sx={styles.cardContentLarge}>
                        <ProfileNameSection
                            user={user}
                            username={profileUsername}
                            isOwner={isOwner}
                            handleFollower={handleFollower}
                            data-testid='profile_3'
                        />
                        <Typography textAlign='left' display='inline-flex' alignItems='center' color='gray'>
                            <CalendarMonthIcon/>
                            <span style={{paddingLeft: 5}}>Joined {userCreatedAt.toLocaleDateString()}</span>
                        </Typography>
                        <PostCountSection
                            username={profileUsername}
                            postCount={posts.length}
                            followerCount={followerCount}
                        />
                    </CardContent>
                </Card>
                <ProfileTabs user={user} posts={posts} isOwner={isOwner} data-testid='profile_4'/>
            </Box>
        </Layout>
    );
}

export default Profile;