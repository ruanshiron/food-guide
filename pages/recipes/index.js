import { Typography, List, Space } from "antd";
import React from "react"
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Head from "next/head";
import Link from "next/link";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: `/recipes/${i}`,
    title: `レシピ ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "変ソリオ定都来記リ行識視ゅる会3価ソネフ部本ぴめけス会強ひ野供スせ和覧サア買謙テシ事設刈け。万衡採ノ半報リイシ青優イモ俊打ケシ禁容ぶぞぽ果軒あねぽ属属ネヱミ会支めじほ輝債加ミメ続紙載わん得校んるへめ広政はだて想59炭熟耳預2紹べゅき平難とゆめ否越腕披へ。",
    content:
      "期いク応武ワ平前く会子げリ阿趣ソ合死ヘキ認菓ま早79検フウ拠和てせク米姿ゆゅ度67作ネ索気づしこっ女刃尿憎潔ふざラ。",
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Recipes() {
  return (
    <div className="container">
      <h1>レシピをよむ一覧</h1>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                height={118}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<Link href={item.href}>{item.title}</Link>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
