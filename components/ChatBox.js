import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Conversation,
  ConversationList,
  Sidebar,
  ArrowButton,
} from "@chatscope/chat-ui-kit-react";
import { useChat } from "../hooks/useChat";
import { Button } from "antd";
import { useAuth } from "../utils/auth/AuthProvider";

export const ChatBox = () => {
  const {
    showChatBox,
    toggleChatBox,
    conversations,
    messages,
    currentOpponent,
    setCurrentOpponent,
    send,
  } = useChat();

  const { user } = useAuth();
  return (
    user && (
      <div id="chat-box">
        <Button
          style={{
            display: !showChatBox ? "inline-block" : "none",
            bottom: -2,
          }}
          onClick={() => toggleChatBox()}
        >
          CHAT
        </Button>
        <div
          style={{
            display: showChatBox ? "block" : "none",
            height: 300,
            width: 500,
            bottom: -2,
          }}
        >
          <MainContainer>
            <Sidebar position="left" scrollable={false}>
              <ConversationList>
                {conversations.map((conversation, index) => (
                  <Conversation
                    key={index}
                    name={conversation.name}
                    active={conversation.id == currentOpponent?.id}
                    onClick={() => {
                      setCurrentOpponent(conversation);
                    }}
                  ></Conversation>
                ))}
              </ConversationList>
            </Sidebar>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Content
                  userName={currentOpponent?.receiver}
                />
                <ConversationHeader.Actions>
                  <ArrowButton
                    direction="down"
                    onClick={() => toggleChatBox()}
                  />
                </ConversationHeader.Actions>
              </ConversationHeader>
              <MessageList>
                {messages
                  .filter((v) => v.opponent == currentOpponent?.id)
                  .map((message, index) => (
                    <Message
                      model={{
                        message: message.text,
                        sender: message.receiver,
                        direction:
                          message.sender === currentOpponent?.id
                            ? "incoming"
                            : "outgoing",
                      }}
                    />
                  ))}
              </MessageList>
              <MessageInput
                attachButton={false}
                placeholder="Aa"
                onSend={(e) => send(e)}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    )
  );
};
