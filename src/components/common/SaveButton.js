import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

const styles = {
    icons: {
        color: "black",
        strokeWidth: 1,
        stroke: "#ffffff",
        transform: "scale(0.85)"
    },
}
export default function SaveButton() {
    const [saved, setSaved] = React.useState(false);
    const Icon = saved ? BookmarkIcon : BookmarkAddOutlinedIcon;
    const onClick = saved ? handleRemove : handleSave;

    function handleSave() {
        setSaved(true);
    }

    function handleRemove() {
        setSaved(false);
    }

    return <Icon fontSize="large" sx={styles.icons} onClick={onClick}/>;
}