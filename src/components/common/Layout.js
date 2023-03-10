import React from "react";
import Navbar from "../common/Navbar";

const styles = {
    section: {
        display: "grid",
        justifyContent: "center",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexShrink: 0,
        position: "relative",
        padding: 0,
        order: 4,
        marginTop: 60,
    },
    childrenWrapper: {
        paddingTop: 30,
        display: "flex",
        margin: "0 auto",
        flexFlow: "row nowrap",
        maxWidth: "935px !important"
    },
    children: {
        width: "100%"
    }
}

export default function Layout({children}) {

    return (
        <section style={styles.section}>
            <Navbar/>
            <main style={styles.main}>
                <section style={styles.childrenWrapper}>
                    <div style={styles.children}>{children}</div>
                </section>
            </main>
        </section>
    );
}
