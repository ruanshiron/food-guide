import Head from 'next/head'
import { Typography, Divider, Row, Col, Card } from "antd";

export default function Home() {
  return (
    <>
      <Typography className='home-container'>
        <div style={{ textAlign: 'center', minHeight: 300, background: "#fdf2ca repeat 0 0 url(/images/homepage.jpeg)" }}>
          <h1 style={{ fontSize: 60, paddingTop: 50}}>Food Guide</h1>
          <h3>献立、簡単レシピに動画も！</h3>
          <h3>必ず見つかるレシピサイト</h3>
        </div>
      </Typography>

      <Typography className='home-container'>
        <Divider orientation="left">
          <h2>
            今日のオススメ
          </h2>
        </Divider>
        <Row justify="space-between" gutter={16} style={{ padding: "40px 100px" }}>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={<img alt="example" src="https://video.kurashiru.com/production/videos/7ba2b9a0-52d0-4f88-b19d-a2e101983110/compressed_thumbnail_square_large.jpg?1472440610ng" />}
            >
              <Card.Meta title="優しい味わい！大根のそぼろ煮" description="電子レンジで下処理をするので、時短・簡便！" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={<img alt="example" src="https://video.kurashiru.com/production/videos/a6fed850-d897-4ced-9855-55168ee50bb8/compressed_thumbnail_square_large.jpg?1475054146" />}
            >
              <Card.Meta title="大根のバタポンステーキ" description="中途半端に余った大根の消費に美味しくお召し上がりいただける一品です。" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              cover={<img alt="example" src="https://video.kurashiru.com/production/videos/32e91e87-7b9a-414f-b336-2f95e2e93533/compressed_thumbnail_square_large.jpg?1599532153" />}
            >
              <Card.Meta title="千切りキャベツ山盛り！キャベツお好み焼き" description="キャベツをたっぷり使用し、粉を少なめにしたお好み焼きのレシピです。" />
            </Card>
          </Col>
        </Row>
      </Typography>
    </>
  )
}
