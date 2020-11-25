import { Divider, Row, Col, Tag, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RecipeCard from "../components/RecipeCard";
import useRecipes from "../hooks/useRecipes";
import useTranslation from "../intl/useTranslation"

const chefs = [
  { src: "https://i.imgur.com/pYpqi1v.png" },
  {
    src:
      "https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/10353110_1568599166687430_1416722809578967040_n.jpg?_nc_cat=104&ccb=2&_nc_sid=ba80b0&_nc_ohc=0LX-Du5kFjQAX_fWGIq&_nc_ht=scontent.fhan2-6.fna&oh=766716133d6cb5fe9bfe5ffe2970e2bd&oe=5FD277F0",
  },
  {
    src:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/97116271_1787037028104496_322437548691423232_o.jpg?_nc_cat=108&ccb=2&_nc_sid=8bfeb9&_nc_ohc=a-GvxKi6T4MAX8-N7gr&_nc_ht=scontent.fhan2-3.fna&oh=d627088855bf587a7fb70f40a8f9348a&oe=5FD0CA5F",
  },
  {
    src:
      "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/45804440_941790919348225_3914881021224419328_o.jpg?_nc_cat=109&ccb=2&_nc_sid=174925&_nc_ohc=nTTFee4BrkYAX_MVdeb&_nc_ht=scontent.fhan2-5.fna&oh=2486388042e826f952b2211fd40f327c&oe=5FD19858",
  },
  {
    src:
      "https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/16649203_586428338234050_6126128784764679403_n.jpg?_nc_cat=103&ccb=2&_nc_sid=cdbe9c&_nc_ohc=f_xWRr_tpesAX8zFCCy&_nc_ht=scontent.fhan2-6.fna&oh=5c80e92afaa5de0ebb7d2392ad1d76fa&oe=5FD32B2E",
  },
  {
    src:
      "https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/23622220_2056772447889079_8060687045552129362_n.jpg?_nc_cat=111&ccb=2&_nc_sid=0debeb&_nc_ohc=23U1R58M5rUAX_BXZKH&_nc_ht=scontent.fhan2-2.fna&oh=7b159929b03e642ca49ced1784e463be&oe=5FD05843",
  },
  {
    src:
      "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/124022964_2713691562222505_5724321518775122311_o.jpg?_nc_cat=105&ccb=2&_nc_sid=19026a&_nc_ohc=KFfdlmhNtQ0AX9uNSuf&_nc_ht=scontent.fhan2-4.fna&oh=2157e76fda4d3d82f5c69d37cec897b9&oe=5FD27CD9",
  },
];

const keywords = ["Sườn xào", "Thịt lợn", "Món rau", "Canh", "Bắp cải", "Tôm chiên"];

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Banner = () => {
  const { t } = useTranslation()
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: 300,
        background: "#fdf2ca repeat 0 0 url(/images/homepage.jpeg)",
        marginBottom: 30,
      }}
    >
      <h1 style={{ fontSize: 60, paddingTop: 50 }}>Food Guide</h1>
      <h3>{t("slogan1")}</h3>
      <h3>{t("slogan2")}</h3>
    </div>
  );
};

export default function Home() {
  const { recipes, loading } = useRecipes();
  const { t } = useTranslation()

  return loading ? (
    <div style={{ textAlign: "center" }} className="container">
      <Spin spinning={true} indicator={antIcon}></Spin>
    </div>
  ) : (
    <div className="container container-lg">
      <Row>
        <Col style={{ padding: 15 }} xs={24} md={18}>
          <Banner />
          <Divider orientation="left">
            <h2>{t("今日のオススメ")}</h2>
          </Divider>
          <Row gutter={16}>
            {recipes.map((item, index) => (
              <Col key={index} span={8}>
                <RecipeCard data={item} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col style={{ padding: 16 }} xs={24} md={6}>
          <div style={{ marginBottom: 15 }}>
            <h2>{t("定番のキーワード")}</h2>
            {keywords.map((keyword, index) => (
              <Tag key={index} style={{ marginBottom: 7 }}>{keyword}</Tag>
            ))}
          </div>
          <div style={{ marginBottom: 15 }}>
            <h2>{t("最高のシェフ")}</h2>
            <Row gutter={8}>
              {chefs.map((chef, index) => (
                <Col key={index} style={{ marginBottom: 8 }} xs={8} md={12}>
                  <img
                    width={"100%"}
                    height={156}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    src={chef.src}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
