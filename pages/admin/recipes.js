import { Button, Popconfirm, Table, Typography, message } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { database } from "../../config/firebaseConfig";
import useRatings from "../../hooks/useRatings";
import { useAuth } from "../../utils/auth/AuthProvider";

const columns = [
  {
    title: "Tên",
    dataIndex: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },
  {
    title: "Đánh giá",
    dataIndex: "rating",
    align: "right",
  },
  {
    title: "Thao tác",
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

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const router = useRouter();
  const { user, role } = useAuth();

  const fetchRatingsById = async (id) => {
    const ref = database.collection("recipes").doc(id).collection("ratings");
    const collection = await ref.get();

    if (collection.docs.length <= 0) return 0;
    return collection.docs
      .map((doc) => doc.data().point)
      .reduce((a, v, i) => (a * i + v) / (i + 1));
  };

  const getAllRecipe = async () => {
    const docs = await database.collection("recipes").get();
    if (docs.empty) {
      console.log("No such document!");
    } else {
      docs.forEach(async (doc) => {
        let recipe = {
          title: doc.data().title,
          description: doc.data().description,
          rating: await fetchRatingsById(doc.id),
        };
        setRecipes((recipes) => [...recipes, recipe]);
      });
    }
  };

  useEffect(() => {
    if (user && role === "admin") {
      getAllRecipe();
    } else {
      router.push(`/`);
      message.info("Bạn không có quyền truy cập trang này");
    }
  }, []);

  return (
    <>
      <Typography.Title>Danh sách công thức nấu ăn</Typography.Title>
      <Table
        columns={columns}
        dataSource={recipes}
        bordered
        title={() => (
          <>
            <Button>Làm mới</Button>
          </>
        )}
        footer={() => "Công thức nấu ăn"}
        pagination={false}
      />
    </>
  );
};

export default Recipes;
