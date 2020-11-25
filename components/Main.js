import { Layout } from "antd";
import Head from "next/head";
import Navbar from "./Navbar";
const { Footer, Content } = Layout;
import { createContext, useState } from "react";

export const defaultLocale = "vi";
export const locales = ["jp", "vi"];
export const LanguageContext = createContext([]);

const Main = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale);
  return (
    <>
      <Head>
        <title>Food Guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LanguageContext.Provider value={[locale, setLocale]}>
          <Navbar />
          <Content>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            Food Guide develop by AmongUsss
          </Footer>
        </LanguageContext.Provider>
      </Layout>
    </>
  );
};

export default Main;
