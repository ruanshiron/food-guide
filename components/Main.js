import { Layout } from "antd";
import Head from "next/head";
import Navbar from "./Navbar";
const { Footer, Content } = Layout;
import { createContext, useState } from "react";
import MyFooter from "./Footer";

export const defaultLocale = "vi";
export const locales = ["jp", "vi"];
export const LanguageContext = createContext([]);

const Main = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale);
  return (
    <>
      <LanguageContext.Provider value={[locale, setLocale]}>
        <Head>
          <title>Food Guide</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Navbar />
          <Content>{children}</Content>
          <MyFooter />
        </Layout>
      </LanguageContext.Provider>
    </>
  );
};

export default Main;
