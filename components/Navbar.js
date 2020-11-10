import Link from "next/link";
import { Col, Menu, Row } from "antd";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import Search from "antd/lib/input/Search";

const Navbar = () => {
  const handleClick = (e) => {
    console.log("click ", e);
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
            placeholder="input search text"
          />
        </Col>
        <Col span={4} sm={6}></Col>
      </Row>
    </Header>
  );
};

export default Navbar;
