import React from "react";
import Layout from "../components/common/Layout";
import ProfilePicture from "../components/common/ProfilePicture";
import {Card, CardContent} from "@mui/material";
import {useParams} from "react-router-dom";
import ProfileTabs from "../components/profile/ProfileTabs";
import Box from "@mui/material/Box";
import theme from "../theme"
import LoadingScreen from "../components/common/LoadingScreen";
import axios from "axios";
import {sortById} from "../utils";
import {styles, useProfilePageStyles} from "../components/profile/ProfileStyle";
import {ProfileNameSection} from "../components/profile/ProfileNameSection";
import {PostCountSection} from "../components/profile/PostCountSection";
import NameBioSection from "../components/profile/NameSection";
import {OptionsMenu} from "../components/profile/Options";

function Profile() {
    let params = useParams();
    const currentUser = sessionStorage.getItem("CurrentUsername");
    const profileUser = params.username ? params.username : currentUser;

    const [showOptionsMenu, setOptionsMenu] = React.useState(false);
    const isOwner = profileUser === currentUser;
    const useStyles = useProfilePageStyles(theme);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState({});

    const [followNum, setFollowNum] = React.useState(null);


    React.useEffect(() => {
        axios.get(
            'http://localhost:4000/user?username=' + profileUser
        ).then(res => {
                let user = res.data[0];
                user.posts = sortById(user.posts);
                setUser(user);
                setLoading(false);
                setFollowNum(user.followerCount);
            }
        )
    }, [profileUser]);


    function handleOptionsMenuClick() {
        setOptionsMenu(true);
    }

    function handleCloseMenu() {
        setOptionsMenu(false);
    }

    if (loading) return <LoadingScreen/>;

    return (
        <Layout data-testid='profile_1'
                title={`${user.firstName} (@${user.username})`}
        >
            <Box component="div" sx={useStyles.container} data-testid='profile_2'>
                <Card sx={styles.cardLarge}>
                    <ProfilePicture isOwner={isOwner}/>
                    <CardContent sx={styles.cardContentLarge}>
                        <ProfileNameSection
                            user={user}
                            isOwner={isOwner}
                            handleOptionsMenuClick={handleOptionsMenuClick}
                            setFollowNum={setFollowNum}
                            data-testid='profile_3'
                        />
                        <PostCountSection user={user} followNum={followNum}/>
                        <NameBioSection user={user}/>
                    </CardContent>
                </Card>
                {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu}/>}
                <ProfileTabs user={user} isOwner={isOwner} data-testid='profile_4'/>
            </Box>
        </Layout>
    );
}

export default Profile;