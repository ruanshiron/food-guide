import {
  Button,
  Divider,
  List,
  Typography,
  Card,
  Spin,
  Row,
  Col,
  Image,
  Avatar,
  Tabs,
  Form,
  Input,
  Tag,
} from "antd";
import { useRouter } from "next/router";
import {
  LoadingOutlined,
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons";
import { storage, database } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import useTranslation from "../../intl/useTranslation";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

const storageRef = storage.ref();
const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 6 },
};

export default function Recipe() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  async function getData() {
    console.log(id);
    const ref = database.collection("users");
    const snapshot = await ref.where("uid", "==", id).limit(1).get();
    if (snapshot.empty) {
      console.log("No such document!");
    } else {
      snapshot.forEach((doc) => {
        setEmail(doc.data().email);
        setName(doc.data().name);
        setLoading(false);
      });
    }
  }
  useEffect(() => id && getData(), [id]);

  const handleChangeTab = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return loading ? (
    <div style={{ textAlign: "center" }} className="container">
      <Spin spinning={true} indicator={antIcon}></Spin>
    </div>
  ) : (
    <div className="container" style={{ textAlign: "center", marginTop: 50 }}>
      <Row>
        <Col span={24}>
          <Avatar size={200} icon={<UserOutlined />} />
          {isEditingName ? (
            <>
              <Row
                style={{ display: "block", textAlign: "center", padding: 30 }}
              >
                <Input
                  value="Test"
                  style={{ width: 200, fontSize: 24 }}
                ></Input>
              </Row>

              <Button type="primary" style={{ marginRight: 15 }}>
                Lưu
              </Button>
              <Button type="secondary" onClick={() => setIsEditingName(false)}>
                Hủy
              </Button>
            </>
          ) : (
            <>
              <Title style={{ margin: "30px 0 10px" }}>{name}</Title>
              <span>{email}</span>
              <br />
              <Button type="link" onClick={() => setIsEditingName(true)}>
                Chỉnh sửa
              </Button>
            </>
          )}

          <Tabs defaultActiveKey="1" onChange={handleChangeTab}>
            <TabPane tab="Trang chính" key="1">
              <Row style={{ marginTop: 30 }}>
                <Col span={9} style={{ padding: "0 15px" }}>
                  <Divider orientation="left">
                    <h1>Giới thiệu</h1>
                  </Divider>
                  {isEditingAbout ? (
                    <>
                      <TextArea
                        rows={10}
                        value="Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book."
                      />
                      <Row style={{ marginTop: 15, textAlign: "center" }}>
                        <Button type="primary" style={{ marginRight: 15 }}>
                          Lưu
                        </Button>
                        <Button
                          type="secondary"
                          onClick={() => setIsEditingAbout(false)}
                        >
                          Hủy
                        </Button>
                      </Row>
                    </>
                  ) : (
                    <>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>
                      <Button
                        type="link"
                        onClick={() => setIsEditingAbout(true)}
                      >
                        Chỉnh sửa
                      </Button>
                    </>
                  )}

                  <Divider style={{ marginTop: 50 }} orientation="left">
                    <h1>Huy hiệu</h1>
                  </Divider>
                  <div style={{ textAlign: "left" }}>
                    <Tag>Đầu bếp</Tag>
                    <Tag icon={<StarFilled />} color="orange">
                      Đầu bếp nổi tiếng
                    </Tag>
                  </div>
                </Col>
                <Col span={15} style={{ padding: "0 15px" }}>
                  <Divider orientation="left">
                    <h1>Công thức của tôi</h1>
                  </Divider>
                  <List style={{ marginBottom: 50 }}>
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <Card.Meta
                        style={{ textAlign: "left" }}
                        title="Gà chiên nước mắm"
                      />
                      <Button
                        style={{ position: "absolute", right: 10, top: 18 }}
                        type="text"
                        shape="circle"
                        icon={<HeartOutlined />}
                      />
                    </Card>
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <Card.Meta
                        style={{ textAlign: "left" }}
                        title="Rauuuuuuuu"
                      />
                      <Button
                        style={{ position: "absolute", right: 10, top: 18 }}
                        type="text"
                        shape="circle"
                        icon={<HeartFilled />}
                      />
                    </Card>
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <Card.Meta
                        style={{ textAlign: "left" }}
                        title="Trứng kho thịt"
                      />
                      <Button
                        style={{ position: "absolute", right: 10, top: 18 }}
                        type="text"
                        shape="circle"
                        icon={<HeartOutlined />}
                      />
                    </Card>
                  </List>

                  <Divider orientation="left">
                    <h1>Đã thích</h1>
                  </Divider>
                  <List style={{ marginBottom: 30 }}>
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <Card.Meta
                        style={{ textAlign: "left" }}
                        title="Gà chiên nước mắm"
                      />
                      <Button
                        style={{ position: "absolute", right: 10, top: 18 }}
                        type="text"
                        shape="circle"
                        icon={<HeartFilled />}
                      />
                    </Card>
                    <Card style={{ marginBottom: 16 }} hoverable>
                      <Card.Meta
                        style={{ textAlign: "left" }}
                        title="Rauuuuuuuu"
                      />
                      <Button
                        style={{ position: "absolute", right: 10, top: 18 }}
                        type="text"
                        shape="circle"
                        icon={<HeartFilled />}
                      />
                    </Card>
                  </List>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Thay đổi mật khẩu" key="2">
              <Form
                {...layout}
                style={{ marginTop: 30 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Mật khẩu mới"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
