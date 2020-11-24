import { Button, Divider, Image, List, Typography, Rate, Spin } from "antd";
import { useRouter } from "next/router";
import { FireOutlined, HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import Comment from '../../components/Comment'
import Item from "antd/lib/list/Item";
import { storage, database } from "../../config/firebaseConfig"
import { useState, useEffect } from "react";
const { Title, Paragraph, Text, Link } = Typography;

// const ingredients = [
//   { name: "ingredient 1", quantity: "1" },
//   { name: "ingredient 1", quantity: "1" },
//   { name: "ingredient 1", quantity: "1" },
//   { name: "ingredient 1", quantity: "1" },
//   { name: "ingredient 1", quantity: "1" },
// ];

// const steps = [
//   "大根は皮を剥き2㎝の厚さに切り、さらにそれを4等分に切ります。ボールにひたひたのお水入れ600ｗのレンジで10分加熱します。",
//   "大根は皮を剥き2㎝の厚さに切り、さらにそれを4等分に切ります。ボールにひたひたのお水入れ600ｗのレンジで10分加熱します。",
//   "大根は皮を剥き2㎝の厚さに切り、さらにそれを4等分に切ります。ボールにひたひたのお水入れ600ｗのレンジで10分加熱します。",
// ];

const storageRef = storage.ref();
const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

export default function Recipe() {
  const router = useRouter();
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(true)

  const id = router.query.id;

  useEffect(() => {
    async function getData() {
      const ref = database.collection('recipes').doc(id)
      const doc = await ref.get()
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        let data = doc.data()
        data.image = await storageRef.child(`recipes/${doc.data().image}`).getDownloadURL()
        data.video = await storageRef.child(`recipes/${doc.data().video}`).getDownloadURL()
        setRecipe(data)
        setLoading(false)
      }
    }
    
    getData()
  }, [])

  return (
    loading ? <div style={{ textAlign: 'center' }} className="container" ><Spin spinning={true} indicator={antIcon}></Spin></div> :
    <div className="container">
      <div style={{ paddingBottom: "30px" }}>
        <p>2020.20.10</p>
        {/* <Image
          style={{ marginBottom: "30px" }}
          width="100%"
          src={recipe.image}
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        /> */}
        <video width="100%" controls  style={{ marginBottom: 30 }} >
          <source src={recipe.video} type="video/mp4"/>
        </video>

        <Typography>
          <Title>
            {recipe.title}
          </Title>
          <Paragraph>
            {recipe.description}
          </Paragraph>
          {/* <Paragraph>調理時間：30分</Paragraph>
          <Paragraph>費用目安：300円前後</Paragraph>
          <Paragraph>
            <FireOutlined style={{ marginRight: "4px" }} />
            カロリー: <Text strong>3000</Text>
          </Paragraph> */}
        </Typography>
        <Item><Rate allowHalf defaultValue={3.5} disabled /></Item>
        {/* <Button
          type="primary"
          shape="round"
          icon={<HeartOutlined />}
          size="large"
        >
          お気に入り
        </Button> */}
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>
            材料
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
          <h1>作り方</h1>
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
          <h1>料理のコツ・ポイント</h1>
        </Divider>
        <Typography>
          <Paragraph>
            {recipe.point}
          </Paragraph>
        </Typography>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>評価</h1>
        </Divider>
  
        <Item style={{ paddingLeft: 50 }}><Rate /><Button　type="primary"　shape="round">送信</Button></Item>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <Divider orientation="left">
          <h1>コメント</h1>
        </Divider>
        <Typography>
          <Comment recipeID={router.query.id} />
        </Typography>
      </div>
    </div>
  );
}
