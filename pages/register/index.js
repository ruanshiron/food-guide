import { Form, Input, Button, Checkbox, Card, Divider, message } from "antd";
import { firebase, database } from "../../config/firebaseConfig";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "../../intl/useTranslation";
import Link from "next/link";
import { useAuth } from "../../utils/auth/AuthProvider";

export default function Register() {
  const router = useRouter();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (values.password !== values.confirmPassword) {
      message.error(t("password_validations_error"));
      router.push("/register");
    } else {
      try {
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        const user = {
          email: res.user.email,
          uid: res.user.uid,
          name: values.name,
          about: "",
          role: "user",
          favorites: [],
        };
        await database.collection("users").add(user);
        message.success(t("signup_successfully"));
        router.push("/");
      } catch (error) {
        message.error(t("signup_error"));
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
      message.info(t("logged_in_message"));
    }
  }, [user]);

  return (
    <div className="container container-lg">
      <div className="outer">
        <div className="middle">
          <Card className="login-form">
            <Divider>
              <Link href="/">FOODGUIDE</Link>
            </Divider>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập họ tên",
                  },
                ]}
              >
                <Input placeholder="Name" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email",
                  },
                ]}
              >
                <Input placeholder="Email" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu xác nhận",
                  },
                ]}
              >
                <Input type="password" placeholder="Password" size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  {t("signup")}
                </Button>
              </Form.Item>

              <Divider></Divider>
              <Link href="/login">
                <Button className="signup-form-button" type="dashed">
                  {t("login")}
                </Button>
              </Link>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
