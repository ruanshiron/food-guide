import Link from "next/link";
import { Col, Menu, Row, Button, Modal, Avatar, Dropdown, Divider } from "antd";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { useRouter } from "next/router";
import useTranslation from "../intl/useTranslation";
import { useAuth } from "../utils/auth/AuthProvider";
import { firebase } from "../config/firebaseConfig";
import { UserOutlined } from "@ant-design/icons";

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

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/recipes/create">{t("レシピを作る")}</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/">{t("profile")}</Link>
      </Menu.Item>
      <Menu.Item danger onClick={handleLogout}>
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    router.pathname != "/login" &&
    router.pathname != "/register" && (
      <Header>
        <Row>
          <Col span={5} sm={5}>
            <Menu onClick={handleClick} mode="horizontal">
              <Menu.Item key="mail">
                <Link href="/">FOODGUIDE</Link>
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
              style={{
                display: "block",
                marginLeft: 8,
                maxWidth: 600,
                marginRight: 8,
              }}
              size="large"
              placeholder={t("料理名や食材でレシピをさがす")}
              onSearch={handleSearch}
            />
          </Col>
          {user ? (
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              span={2}
              sm={2}
            >
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar
                    className="ant-dropdown-link"
                    size="large"
                    shape="square"
                    icon={<UserOutlined />}
                  />
                </a>
              </Dropdown>
            </Col>
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
    )
  );
};

export default Navbar;
