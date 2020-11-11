import { Button, Divider } from "antd";
import React from "react";
import RecipeForm from "../../components/RecipeForm";
import { SaveOutlined } from "@ant-design/icons";

export default function create() {
  return (
    <div className="container">
      <Divider>
        <h1>新しいレシピ</h1>
      </Divider>
      <RecipeForm />
      <div style={{ textAlign: "center" }}>
        <Button type="primary" size="large" icon={<SaveOutlined />}>
          セーブ
        </Button>
      </div>
    </div>
  );
}
