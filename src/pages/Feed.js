import React from "react";
import Layout from "../components/common/Layout";
import UserCard from "../components/common/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import LoadingScreen from "../components/common/LoadingScreen";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import {CircularProgress} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import axios from "axios";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));


const theme = createTheme();

const styles = {
    container: {
        display: "grid",
        // gridAutoFlow: "column",
        gridTemplateColumns: "minmax(auto, 600px) 300px",
        gridGap: 35,
        overflowY: "scroll",
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
    const [loading, setLoading] = React.useState(true);
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        axios.get(
            "http://localhost:4000/post?_limit=2&_page=" + page
        ).then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    }, []);

    const handleScroll = () => {
        console.log("scrolling");
        setPage(page + 1);
        axios.get(
            "http://localhost:4000/post?_limit=2&_page=" + page
        ).then((res) => {
            setPosts(posts.concat(res.data));
        });
    };

    if (loading) return <LoadingScreen/>;

    return (
        <Layout>
            <div style={styles.container} onScroll={handleScroll}>
                {/* Feed Posts */}
                <div>
                    {Array.from(posts).map(
                        (post, index) => (
                            <React.Suspense key={post.id} fallback={<FeedPostSkeleton/>}>
                                <FeedPost index={index} post={post}/>
                            </React.Suspense>
                        )
                    )}
                </div>
                {/*Sidebar */}
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
