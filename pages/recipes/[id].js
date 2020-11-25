import { Button, Divider, List, Typography, Rate, Spin, Tooltip } from "antd";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import Comment from "../../components/Comment";
import Item from "antd/lib/list/Item";
import { storage, database } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import useTranslation from "../../intl/useTranslation"
import useRatings from "../../hooks/useRatings";
import Rating from "../../components/Rating";

const { Title, Paragraph } = Typography;

const storageRef = storage.ref();
const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

export default function Recipe() {
  const router = useRouter();
  const { t } = useTranslation()
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = router.query;
  const { ratings, average } = useRatings(id);

  async function getData() {
    const ref = database.collection("recipes").doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      let data = doc.data();
      data.image = await storageRef
        .child(`recipes/${doc.data().image}`)
        .getDownloadURL();
      data.video = await storageRef
        .child(`recipes/${doc.data().video}`)
        .getDownloadURL();
      setRecipe(data);
      setLoading(false);
    }
  }
  useEffect(() => id && getData(), [id]);

  return loading ? (
    <div style={{ textAlign: "center" }} className="container">
      <Spin spinning={true} indicator={antIcon}></Spin>
    </div>
  ) : (
    <div className="container">
      <div style={{ paddingBottom: "30px" }}>
        <p>2020.20.10</p>
        <video width="100%" controls style={{ marginBottom: 30 }}>
          <source src={recipe.video} type="video/mp4" />
        </video>

        <Typography>
          <Title>{recipe.title}</Title>
          <Paragraph>{recipe.description}</Paragraph>
        </Typography>
        <Item>
          <Tooltip title={`${ratings.length} reviews`} placement="right">
            <div>
              <Rate allowHalf defaultValue={average} disabled />
            </div>
          </Tooltip>
        </Item>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>
          {t("材料")}
          </h1>
        </Divider>
        <List
          dataSource={recipe.ingredients}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta title={item.name} />
              <div>{item.quantity}</div>
            </List.Item>
          )}
        />
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>{t("作り方")}</h1>
        </Divider>
        <List
          dataSource={recipe.steps}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={<h1>{index + 1 + "."}</h1>}
                title={item}
              />
            </List.Item>
          )}
        />
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>{t("tips")}</h1>
        </Divider>
        <Typography>
          <Paragraph>{recipe.point}</Paragraph>
        </Typography>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>{t("評価")}</h1>
        </Divider>

        <Item style={{ paddingLeft: 50 }}>
          <Rating recipeID={id} />
        </Item>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>{t("コメント")}</h1>
        </Divider>
        <Typography>
          <Comment recipeID={router.query.id} />
        </Typography>
      </div>
    </div>
  );
}
