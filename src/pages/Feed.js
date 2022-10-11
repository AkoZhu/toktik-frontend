import React from "react";
import Layout from "../components/common/Layout";
import UserCard from "../components/feed/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import {getDefaultPost} from "../data";
import LoadingScreen from "../components/shared/LoadingScreen";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import {CircularProgress} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));


const theme = createTheme();

const styles = {
    container: {
        display: "grid",
        // gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 600px) 300px",
        gridGap: 35,
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "minmax(auto, 600px)",
            justifyContent: "center"
        },
        "&.slickSlider": {
            display: "grid"
        }
    },
    sidebarContainer: {
        display: "grid",
        margin: "0px 28px 24px",
        justifyContent: "center",
        gridTemplateColumns: "minmax(auto, 300px)"
    },
    sidebarWrapper: { position: "fixed", width: 293 }
}

function FeedPage() {
    const [isEndOfFeed] = React.useState(false);

    let loading = false;
    if (loading) return <LoadingScreen />;

    return (
        <Layout>
            <div style={styles.container}>
                {/* Feed Posts */}
                <div>
                    {Array.from({length: 5}, () => getDefaultPost()).map(
                        (post, index) => (
                            <React.Suspense key={post.id} fallback={<FeedPostSkeleton/>}>
                                <FeedPost index={index} post={post}/>
                            </React.Suspense>
                        )
                    )}
                </div>
                {/* Sidebar */}
                <div>
                    <div style={{position: "fixed", width: "23%"}}>
                        <UserCard avatarSize={50}/>
                        <FeedSideSuggestions/>
                    </div>
                </div>
                {!isEndOfFeed && <Container><CircularProgress/></Container>}
            </div>
        </Layout>
    );
}

export default FeedPage;
