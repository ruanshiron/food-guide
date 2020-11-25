import { Button, Divider, notification } from "antd";
import React from "react";
import RecipeForm from "../../components/RecipeForm";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { database } from "../../config/firebaseConfig";
import searchIndex from "../../config/algoliaConfig";

const openNotification = () => {
  notification.open({
    message: "Created successfully",
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    onClick: () => {
      console.log("Created successfully");
    },
  });
};

const onSubmitForm = async (data) => {
  let res = await database.collection("recipes").add(data);
  let { objectID } = await searchIndex.saveObject({
    objectID: res.id,
    ...data,
  });
  // console.log(objectID);
  console.log(objectID);
  openNotification();
};

export default function create() {
  return (
    <div className="container">
      <Divider>
        <h1>新しいレシピ</h1>
      </Divider>
      <RecipeForm onSubmitForm={onSubmitForm} />
    </div>
  );
}
