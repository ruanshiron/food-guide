import Link from "next/link";
import { Col, Menu, Row, Button, Modal, Dropdown } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LanguageContext, locales } from "../components/Main";
import useTranslation from "../intl/useTranslation";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const handleClick = (e) => {
    console.log("click ", e);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    console.log("OK ", e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log("Cancel ", e);
    setVisible(false);
  };

  const handleSearch = (e) => {
    router.push(`/recipes?q=${e}`);
  };

  const [locale, setLocale] = useContext(LanguageContext);

  function handleLocaleChange(language) {
    const regex = new RegExp(`^/(${locales.join("|")})`);
    setLocale(language);

    router.push(router.pathname, router.asPath.replace(regex, `/${language}`));
  }

  const { t } = useTranslation();

  return (
    <>
      <Header>
        <Row>
          <Col span={4} sm={6}>
            <Menu onClick={handleClick} mode="horizontal">
              <Menu.Item key="mail">
                <Link href="/">Food Guide</Link>
              </Menu.Item>
              <Menu.Item key="app">
                <Link href="/recipes">{t("レシピ一覧")}</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            span={12}
            sm={12}
          >
            <Search
              style={{ display: "block", margin: "auto" }}
              size="large"
              placeholder={t("料理名や食材でレシピをさがす")}
              onSearch={handleSearch}
            />
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            span={8}
            sm={4}
          >
            {router.pathname != "/recipes/create" && (
              <Link href="/recipes/create">
                <Button
                  href="/recipes/create"
                  size="large"
                  style={{ marginRight: 8 }}
                  type="primary"
                >
                  {t("レシピを作る")}
                </Button>
              </Link>
            )}
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            span={8}
            sm={2}
          >
            <div>
              <Button size="medium" onClick={() => handleLocaleChange("jp")}>
                JP
              </Button>
              <Button size="medium" onClick={() => handleLocaleChange("vi")}>
                VI
              </Button>
            </div>
          </Col>
        </Row>
      </Header>

      <Modal
        title="レシピを作る"
        visible={visible}
        style={{ top: 30 }}
        width={650}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <RecipeForm />
      </Modal>
    </>
  );
};

export default Navbar;
