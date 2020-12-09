import { Button, Divider, message, notification } from "antd";
import React from "react";
import RecipeForm from "../../components/RecipeForm";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { database } from "../../config/firebaseConfig";
import searchIndex from "../../config/algoliaConfig";
import useTranslation from "../../intl/useTranslation";
import { useRouter } from "next/router";

const openNotification = () => {
  notification.open({
    message: "Created successfully",
    icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    onClick: () => {
      console.log("Created successfully");
    },
  });
};

export default function create() {
  const { t } = useTranslation();
  const router = useRouter();

  const onSubmitForm = async (data) => {
    try {
      let res = await database.collection("recipes").add(data);
      let { objectID } = await searchIndex.saveObject({
        objectID: res.id,
        ...data,
      });
      // console.log(objectID);
      console.log(objectID);
      openNotification();
      window.scrollTo(0, 0);
      router.push(`/recipes/${objectID}`);
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="container">
      <Divider>
        <h1>{t("新しいレシピ")}</h1>
      </Divider>
      <RecipeForm onSubmitForm={onSubmitForm} />
    </div>
  );
}
