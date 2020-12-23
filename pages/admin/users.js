import { Button, Popconfirm, Table, Typography } from "antd";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "email",
    dataIndex: "address",
  },
  {
    title: "Số bài viết",
    className: "column-money",
    dataIndex: "money",
    align: "right",
  },
  {
    title: "operation",
    dataIndex: "operation",
    render: (text, record) => (
      <Popconfirm
        title="Chắc chắn muốn xóa"
        onConfirm={() => console.log("deleted")}
      >
        <a style={{ color: "red" }}>Delete</a>
      </Popconfirm>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "300",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "1,256",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "120",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    money: "300",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "1,256",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "120",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    money: "300",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "1,256",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "120",
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    money: "300",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    money: "1,256",
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    money: "120",
    address: "Sidney No. 1 Lake Park",
  },
];

const Users = () => {
  return (
    <>
      <Typography.Title>Danh sách người dùng</Typography.Title>
      <Table
        columns={columns}
        dataSource={data}
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
