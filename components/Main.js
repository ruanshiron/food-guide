import { Layout } from "antd";
import Head from "next/head";
import Navbar from "./Navbar";
const { Footer, Content } = Layout;

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <title>Food Guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Navbar />
        <Content>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Food Guide develop by AmongUsss
        </Footer>
      </Layout>
    </>
  );
};

export default Main;
