import Link from "next/link";
import { Col, Menu, Row, Button, Modal, Dropdown } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { useRouter } from "next/router";

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
    router.push("/recipes?q=keyword");
  };

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
                <Link href="/recipes">レシピをよむ</Link>
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
              placeholder="料理名・食材でレシピをさがす"
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
            sm={6}
          >
            {router.pathname != "/recipes/create" && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Link href="/recipes/create">Add By New Page</Link>
                    </Menu.Item>
                    <Menu.Item onClick={showModal}>Add By Popup</Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                arrow
              >
                <Button size="large" style={{ marginRight: 8 }} type="primary">
                  レシピを作る
                </Button>
              </Dropdown>
            )}
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
