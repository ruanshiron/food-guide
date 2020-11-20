import { Button, Divider, notification } from "antd";
import React from "react";
import RecipeForm from "../../components/RecipeForm";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { database } from "../../config/firebaseConfig"

const openNotification = () => {
  notification.open({
    message: 'Created successfully',
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    onClick: () => {
      console.log('Created successfully');
    },
  });
};

const onSubmitForm = async(data) => {
  await database.collection('recipes').add(data)
  console.log(data)
  openNotification()
}

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
