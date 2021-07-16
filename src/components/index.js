import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
// import { clearAllBodyScrollLocks } from "body-scroll-lock";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

const Page = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <>
    <Layout>
        <Header></Header>
        <Content className={styles.inner}>{children}</Content>
        <Footer></Footer>
    </Layout>
    </>
  );
};

export default withRouter(Page);
