import Link from "next/link";
import { Col, Menu, Row, Button, Modal } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const handleClick = (e) => {
    console.log("click ", e);
  };

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = (e) => {
    console.log("OK ", e);
    setVisible(false)
  };

  const handleCancel = (e) => {
    console.log("Cancel ", e);
    setVisible(false)
  };

  return (
    <Header>
      <Row>
        <Col span={4} sm={6}>
          <Menu onClick={handleClick} mode="horizontal">
            <Menu.Item key="mail" >
              <Link href="/">Food Guide</Link>
            </Menu.Item>
            <Menu.Item key="app" >
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
          span={16}
          sm={12}
        >
          <Search
            style={{ display: "block", margin: "auto" }}
            size="large"
            placeholder="料理名・食材でレシピをさがす"
          />
        </Col>
        <Col push={3} span={4} sm={6}>
          <Button type="primary" onClick={showModal}>
            レシピを作る
          </Button>
          <Modal
            title="レシピを作る"
            visible={visible}
            style={{ top: 30 }}
            width={650}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <AddRecipeForm />
          </Modal>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
