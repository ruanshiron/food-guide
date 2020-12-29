import { Button, Popconfirm, Table, Typography, message } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { database } from "../../config/firebaseConfig";
import { useAuth } from "../../utils/auth/AuthProvider";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    align: "right",
  },
  {
    title: "Xóa",
    dataIndex: "operation",
    render: (text, record) => (
      <Popconfirm
        title="Chắc chắn muốn xóa"
        onConfirm={() => console.log("deleted")}
      >
        <a style={{ color: "red" }}>Xóa</a>
      </Popconfirm>
    ),
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const { user, role } = useAuth();

  const getAllUser = async () => {
    const docs = await database.collection("users").get();
    if (docs.empty) {
      console.log("No such document!");
    } else {
      docs.forEach((doc) => {
        let user = {
          email: doc.data().email,
          name: doc.data().name,
          role: doc.data().role,
        };
        setUsers((users) => [...users, user]);
      });
    }
  };

  useEffect(() => {
    if (user && role === "admin") {
      getAllUser();
    } else {
      router.push(`/`);
      message.info("Bạn không có quyền truy cập trang này");
    }
  }, []);

  return (
    <>
      <Typography.Title>Danh sách người dùng</Typography.Title>
      <Table
        columns={columns}
        dataSource={users}
        bordered
        title={() => (
          <>
            <Button>Làm mới</Button>
          </>
        )}
        footer={() => "Người dùng"}
        pagination={false}
      />
    </>
  );
};

export default Users;
