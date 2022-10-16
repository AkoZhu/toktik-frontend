import React from "react";
import { Person } from "@mui/icons-material";
import {Box} from "@mui/material";

const useProfilePictureStyles = (size = 150, isOwner = true) => ({
    person: {
        color: "#ffffff",
        height: size,
        width: size
    },
    wrapper: {
        background: "#DBDBDB",
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        position: "relative",
        placeItems: "center",
        "&:hover": {
            cursor: isOwner ? "pointer" : "default"
        }
    },
    section: {
        display: "grid",
        justifyContent: "center"
    },
    image: {
        height: size,
        width: size,
        borderRadius: "50%",
    }
});


function ProfilePicture({
        size,
        image = 'https://ui-avatars.com/api/?rounded=true',
        isOwner,
}) {
    const styles = useProfilePictureStyles(size, isOwner);

    return (
        <section style={styles.section}>
            {image ? (
                <Box component= "div" sx = {styles.wrapper}>
                    <img src={image} alt='user profile' style={styles.image} />
                </Box>
            ) : (
                <Box  component="div" sx = {styles.wrapper}>
                    <Person sx={styles.person} />
                </Box>
            )}
        </section>
    )
}

export default ProfilePicture;