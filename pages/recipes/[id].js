import {
  Button,
  Divider,
  List,
  Typography,
  Rate,
  Spin,
  Tooltip,
  message,
} from "antd";
import { useRouter } from "next/router";
import { LoadingOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import Comment from "../../components/Comment";
import Item from "antd/lib/list/Item";
import { storage, database, firebase } from "../../config/firebaseConfig";
import { useState, useEffect } from "react";
import useTranslation from "../../intl/useTranslation";
import useRatings from "../../hooks/useRatings";
import Rating from "../../components/Rating";
import { useAuth } from "../../utils/auth/AuthProvider";

const { Title, Paragraph } = Typography;

const storageRef = storage.ref();
const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

export default function Recipe() {
  const router = useRouter();
  const { t } = useTranslation();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPurchased, setIsPurchased] = useState(true);
  const { id } = router.query;
  const { ratings, average } = useRatings(id);

  const { user } = useAuth();

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

  async function getFavorite() {
    let userRef = database.collection("users");
    let snapshot = await userRef.where("uid", "==", user.uid).limit(1).get();
    if (snapshot.empty) {
      console.log("No such document!");
    } else {
      snapshot.forEach(async (doc) => {
        let res = await database.collection("users").doc(doc.id).get();
        let favorites = res.data().favorites;
        if (favorites.filter((item) => item.recipe_id === id).length > 0) {
          setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
      });
    }
  }

  useEffect(() => {
    if (id && user) {
      getData();
      getFavorite();
    }
  }, [id, user]);

  useEffect(() => {
    console.log(recipe.author);
    if (recipe.author && recipe.author === "admin") {
      if (!isFavorited) setIsPurchased(false);
    }
  }, [recipe]);

  const userRef = database.collection("users");

  const handleLike = async () => {
    setIsFavorited(true);
    let snapshot = await userRef.where("uid", "==", user.uid).limit(1).get();
    if (snapshot.empty) {
      console.log("No such document!");
    } else {
      snapshot.forEach((doc) => {
        let ref = database.collection("users").doc(doc.id);
        ref.update({
          favorites: firebase.firestore.FieldValue.arrayUnion({
            recipe_id: id,
            recipe_title: recipe.title,
          }),
        });
      });
    }
    message.success("Đã thêm công thức yêu thích");
  };

  const handleUnlike = async () => {
    setIsFavorited(false);
    let snapshot = await userRef.where("uid", "==", user.uid).limit(1).get();
    if (snapshot.empty) {
      console.log("No such document!");
    } else {
      snapshot.forEach((doc) => {
        let ref = database.collection("users").doc(doc.id);
        ref.update({
          favorites: firebase.firestore.FieldValue.arrayRemove({
            recipe_id: id,
            recipe_title: recipe.title,
          }),
        });
      });
    }
    message.success("Đã xóa công thức yêu thích");
  };

  const handlePurchase = () => {
    setIsPurchased(true);
    handleLike();
    message.success("Đã mua công thức");
  };

  return !isPurchased ? (
    <div style={{ textAlign: "center", fontSize: 18 }} className="container">
      Bạn cần phải mua để xem được công thức này
      <div style={{ textAlign: "center", padding: 15 }}>
        <Button
          type="link"
          size="large"
          style={{ margin: 10 }}
          onClick={() => window.history.back()}
        >
          Quay lại
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ margin: 10 }}
          onClick={handlePurchase}
        >
          Mua
        </Button>
      </div>
    </div>
  ) : loading ? (
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

        <Typography style={{ position: "relative" }}>
          <Title>{recipe.title}</Title>
          {isFavorited ? (
            <Button
              style={{ position: "absolute", right: 10, top: 0 }}
              type="text"
              shape="circle"
              icon={<HeartFilled style={{ fontSize: 30 }} />}
              onClick={handleUnlike}
            />
          ) : (
            <Button
              style={{ position: "absolute", right: 10, top: 0 }}
              type="text"
              shape="circle"
              icon={<HeartOutlined style={{ fontSize: 30 }} />}
              onClick={handleLike}
            />
          )}
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
          <h1>{t("材料")}</h1>
        </Divider>
        <List
          dataSource={recipe.ingredients}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={item.name}
                avatar={<b>{index + 1 + "."}</b>}
              />
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
