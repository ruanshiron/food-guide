import { List, Space, Button } from "antd";
import React from "react";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import useRecipes from "../../hooks/useRecipes";
import useTranslation from "../../intl/useTranslation"

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const RecipeItem = ({ data }) => {
  return (
    <List.Item
      key={data.title}
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText
          icon={MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}
      extra={<img height={118} alt="logo" src={data.src} />}
    >
      <List.Item.Meta
        title={<Link href={`/recipes/${data.id}`}>{data.title}</Link>}
        description={data.description}
      />
    </List.Item>
  );
};

export default function Recipes() {
  const router = useRouter();
  const { q } = router.query;
  const { t } = useTranslation()

  const { recipes, loading, more } = useRecipes("search", 10, q);

  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={more}>{t("もっと")}</Button>
    </div>
  );

  return (
    <div className="container">
      <h1>{q ? t("検索の結果") : t("レシピ一覧")}</h1>
      <List
        itemLayout="vertical"
        loading={loading}
        loadMore={loadMore}
        size="large"
        dataSource={recipes}
        renderItem={(item) => <RecipeItem data={item} />}
      />
    </div>
  );
}
