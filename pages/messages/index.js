import { Col, Row } from "antd";
import { ChatList, Navbar, MessageList, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

export default function Messages() {
  return (
    <>
      <Navbar
        center={<div>MESSAGES</div>}
      />
      <Row>
        <Col md={6}>
          <ChatList
            className="chat-list"
            dataSource={[
              {
                avatar: "https://facebook.github.io/react/img/logo.svg",
                alt: "Reactjs",
                title: "Facebook",
                subtitle: "What are you doing?",
                date: new Date(),
                unread: 0,
              },
              {
                avatar: "https://facebook.github.io/react/img/logo.svg",
                alt: "Reactjs",
                title: "Facebook",
                subtitle: "What are you doing?",
                date: new Date(),
                unread: 0,
              },
              {
                avatar: "https://facebook.github.io/react/img/logo.svg",
                alt: "Reactjs",
                title: "Facebook",
                subtitle: "What are you doing?",
                date: new Date(),
                unread: 0,
              },
            ]}
          />
        </Col>
        <Col md={18}>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={[
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "right",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
              {
                position: "left",
                type: "text",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                date: new Date(),
              },
            ]}
          />
          <Input
            placeholder="Type here..."
            multiline={true}
            rightButtons={
              <Button color="white" backgroundColor="black" text="Send" />
            }
          />
        </Col>
      </Row>
    </>
  );
}
