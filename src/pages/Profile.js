import React from "react";
import Layout from "../components/common/Layout";
import ProfilePicture from "../components/profile/ProfilePicture";
import {Card, CardContent} from "@mui/material";
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
    let params = useParams();
    const currentUser = sessionStorage.getItem("CurrentUsername");
    const profileUsername = params.username ? params.username : currentUser;

    const isOwner = profileUsername === currentUser;
    const useStyles = useProfilePageStyles(theme);

    const [user, setUser] = React.useState({});
    const [posts, setPosts] = React.useState([]);
    const [followerCount, setFollowerCount] = React.useState();


    React.useEffect(() => {
        async function fetchData() {
            setUser(await getUserByName(profileUsername));
            setPosts(await getPostByUsername(profileUsername));
            setFollowerCount(await getFollowerCountByUsername(profileUsername));
        }

        fetchData().then(() => {
        });
    }, [profileUsername]);

    function handleFollower() {
        getFollowerCountByUsername(profileUsername).then((data) => {
            setFollowerCount(data);
        });
    }

    if (!currentUser || !user) return <LoadingScreen/>;

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
                            isOwner={isOwner}
                            handleFollower={handleFollower}
                            data-testid='profile_3'
                        />
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