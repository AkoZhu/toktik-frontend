import React from "react";
// import SEO from "../shared/Seo";
// import Navbar from "../shared/Navbar";


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

function Layout({ children, minimalNavbar = false, title, marginTop = 60 }) {

    return (
        <section style={styles.section}>
            {/*<SEO title={title} />*/}
            {/*<Navbar minimalNavbar={minimalNavbar} />*/}
            <main style={styles.main}>
                <section style={styles.childrenWrapper}>
                    <div style={styles.children}>{children}</div>
                </section>
            </main>
        </section>
    );
}

export default Layout;