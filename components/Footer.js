import { Button } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LanguageContext, locales } from "../components/Main";

const MyFooter = () => {
  const router = useRouter();
  const [locale, setLocale] = useContext(LanguageContext);

  function handleLocaleChange(language) {
    const regex = new RegExp(`^/(${locales.join("|")})`);
    setLocale(language);

    router.push(router.pathname, router.asPath.replace(regex, `/${language}`));
  }

  return (
    <Footer style={{ textAlign: "center" }}>
      {locale !== "vi" && (
        <Button type="link" onClick={() => handleLocaleChange("vi")}>
          Tiếng Việt
        </Button>
      )}
      {locale !== "jp" && (
        <Button type="link" onClick={() => handleLocaleChange("jp")}>
          日本語
        </Button>
      )}
    </Footer>
  );
};

export default MyFooter;
