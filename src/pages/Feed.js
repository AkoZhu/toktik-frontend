import React from "react";
import Layout from "../components/common/Layout";
import UserCard from "../components/common/UserCard";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import LoadingScreen from "../components/common/LoadingScreen";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import {createTheme} from "@mui/material/styles";
import {getPostByPage} from "../api/post";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));


const theme = createTheme();

const styles = {
    container: {
        display: "grid",
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
    sidebarWrapper: {position: "fixed", width: 293}
}

function FeedPage() {
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        getPostByPage(page).then((res) => {
            if (res && res.length > 0) {
                setPosts([...posts, ...res]);
            } else {
                setHasMore(false);
            }
        }).catch(() => {
            setHasMore(false);
        });

        // eslint-disable-next-line
    }, [page]);

    const handleScroll = () => {
        setPage(page + 1);
    };

    if (posts.length === 0) return <LoadingScreen/>;

    return (
        <Layout>
            <div style={styles.container}>
                <InfiniteScroll
                    dataLength={posts.length} //This is important field to render the next data
                    next={handleScroll}
                    hasMore={hasMore}
                    loader={<LoadingScreen/>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {Array.from(posts).map(
                        (post) => (
                            <React.Suspense key={post._id} fallback={<FeedPostSkeleton/>}>
                                <FeedPost post={post}/>
                            </React.Suspense>
                        )
                    )}
                </InfiniteScroll>
                <div>
                    <div style={{position: "fixed", width: "23%"}}>
                        <UserCard username={localStorage.getItem("CurrentUsername")} avatarSize={50}/>
                        <FeedSideSuggestions/>
                    </div>
                </div>
                </div>
        </Layout>
    );
}

export default FeedPage;
