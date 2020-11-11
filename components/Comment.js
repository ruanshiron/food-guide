import { Card, Avatar, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Comment = () => {
  return (
    <>
      <Card bordered={false}>
        <Meta
          avatar={
            <Avatar src="https://image.accounts.kurashiru.com/users/8216e82e-b19e-4220-9025-dc9a81280edc/profile_picture_large.jpg?t=1513761336" />
          }
          title="金魚"
          description="砂糖が苦手なのですが、どうしても必要ですか？"
        />
      </Card>
      <Card bordered={false} style={{ marginLeft: 50 }}>
        <Meta
          avatar={
            <Avatar src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/104884723_1686372068182431_3074915069927318108_n.jpg?_nc_cat=101&ccb=2&_nc_sid=85a577&_nc_ohc=EYq3ORYWmHsAX_Eo0YP&_nc_ht=scontent.fhan3-3.fna&oh=580416e956d8d0b0fd87dccffd9f8b39&oe=5FD188F6" />
          }
          title="うみはら"
          description="甘みを加えることでコクが出ておいしくなりますが、お好みの味になるように分量は調節していただいて大丈夫ですよ。おいしく作れますように。"
        />
      </Card>
      <Card bordered={false}>
        <Meta
          avatar={
            <Avatar src="https://image.accounts.kurashiru.com/users/a13255d8-00e2-4a89-a078-b94675e40a06/profile_picture_large.jpg?t=1520408478" />
          }
          title="みみ"
          description="お肉入れたら美味しくないですか？"
        />
      </Card>
      <Card bordered={false}>
        <Meta
          avatar={
            <Avatar src="https://image.accounts.kurashiru.com/users/288ad051-f8c5-4640-8b0c-7e9637ddb884/profile_picture_large.jpg?t=1562520527" />
          }
          title="あこママ"
          description="醤油とかの代わりにめんつゆで代用できますか？もしできるなら、分量教えてほしいです！"
        />
      </Card>

      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Input.TextArea rows={4} showCount maxLength={200} />
        <Button
          style={{ width: 250 }}
          type="primary"
          shape="round"
          icon={<SendOutlined />}
          size={"large"}
        >
          コメント
        </Button>
      </div>
    </>
  );
};

export default Comment;
