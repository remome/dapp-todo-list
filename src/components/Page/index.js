import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
// import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from "./page.css";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
// import Header from "../Header";
// import Footer from "../Footer";

const Page = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <>
    <Layout>
        <Header>Header</Header>
        <Content className={styles.inner}>{children}</Content>
        {/* <Footer>Footer</Footer> */}
    </Layout>
    </>
  );
};

export default withRouter(Page);
