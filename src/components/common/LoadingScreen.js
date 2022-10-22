import React from "react";
import {CircularProgress} from "@mui/material";


const styles = {
    section: {
        display: "grid",
        justifyContent: "center"
    }
}

function LoadingScreen() {
    return (
        <section style={styles.section}>
      <span>
        <CircularProgress/>
      </span>
        </section>
    );
}

export default LoadingScreen;
