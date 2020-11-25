import { Card, Avatar, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { storage, database } from "../config/firebaseConfig";

const { Meta } = Card;

const Comment = ({ recipeID }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    async function getData() {
      const ref = database
        .collection("recipes")
        .doc(recipeID)
        .collection("comments");
      const docs = await ref.orderBy("created_at").get();

      docs.forEach((doc) => {
        setAllComment((allComment) => [...allComment, doc.data().comment]);
      });
    }

    getData();
  }, []);

  const handleSendComment = async () => {
    setAllComment((allComment) => [...allComment, comment]);
    setComment("");
    const ref = database
      .collection("recipes")
      .doc(recipeID)
      .collection("comments");
    await ref.add({
      comment: comment,
      created_at: Date.now(),
    });
  };

  return (
    <>
      {allComment.map((item, index) => {
        return (
          <Card bordered={false} key={index}>
            <Meta
              avatar={
                <Avatar src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" />
              }
              title="Ẩn danh"
              description={item}
            />
          </Card>
        );
      })}

      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Input.TextArea
          rows={4}
          showCount
          maxLength={200}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          style={{ width: 250 }}
          type="primary"
          shape="round"
          icon={<SendOutlined />}
          size={"large"}
          onClick={handleSendComment}
        >
          コメント
        </Button>
      </div>
    </>
  );
};

export default Comment;
