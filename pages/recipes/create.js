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
  data.image = data.image[0].uid
  data.video = data.video[0].uid
  const ref = await database.collection('recipes').add(data)
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
