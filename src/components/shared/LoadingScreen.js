import React from "react";
import { LogoLoadingIcon } from "../../icons";


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
        <LogoLoadingIcon />
      </span>
        </section>
    );
}

export default LoadingScreen;