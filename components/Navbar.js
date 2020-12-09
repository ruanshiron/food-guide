import Link from "next/link";
import { Col, Menu, Row, Button, Modal } from "antd";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { useRouter } from "next/router";
import useTranslation from "../intl/useTranslation";
import { useAuth } from "../utils/auth/AuthProvider";
import { firebase } from "../config/firebaseConfig";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = (e) => {
    console.log("click ", e);
  };

  const handleSearch = (e) => {
    router.push(`/recipes?q=${e}`);
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();
    router.push(`/`);
  };

  const { t } = useTranslation();

  return (
    <Header>
      <Row>
        <Col span={4} sm={4}>
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
          span
          flex={1}
        >
          <Search
            style={{ display: "block", margin: "auto" }}
            size="large"
            placeholder={t("料理名や食材でレシピをさがす")}
            onSearch={handleSearch}
          />
        </Col>
        {user ? (
          <>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              span={2}
              sm={2}
            >
              <Button>Tài khoản</Button>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              span={3}
              sm={3}
            >
              {router.pathname != "/recipes/create" && (
                <Link href="/recipes/create">
                  <Button href="/recipes/create" size="large" type="primary">
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
              span={2}
              sm={2}
            >
              <Button onClick={handleLogout} type="danger">
                Đăng xuất
              </Button>
            </Col>
          </>
        ) : (
          <Col
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            flex
          >
            <Link href="/login">
              <Button
                type="primary"
                style={{ marginRight: 15, marginLeft: 15 }}
              >
                {t("login")}
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
