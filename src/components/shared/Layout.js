import React from "react";

const styles = {
    section: {
        display: "grid",
        justifyContent: "center"
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexShrink: 0,
        position: "relative",
        padding: 0,
        order: 4,
        marginTop:1,
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
            <main style={styles.main}>
                <section style={styles.childrenWrapper}>
                    <div style={styles.children}>{children}</div>
                </section>
            </main>
        </section>
    );
}
