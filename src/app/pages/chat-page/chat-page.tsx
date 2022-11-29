import "./chat-page.scss";

import { Avatar, Button, Col, Form, Input, message, Row } from "antd";

import UserContext from "app/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import LoadingContext from "app/contexts/loading-context";
import axios from "axios";
import { MessageOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { ChatDtoInterface } from "app/interfaces/chat-dto.interface";
import { isEmpty, reject } from "lodash";
var stompClient: any = null;

interface Notification {
  uuid: string;
  senderId: string;
}

const ChatPage = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const [text, setText] = useState("");
  const [userChats, setUserChats] = useState<ChatDtoInterface[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatDtoInterface | null>(
    null
  );
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    connect();
    //loadUserChats();

    return () => {
      sessionStorage.removeItem("activeChat");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (!selectedChat) {
      sessionStorage.removeItem("activeChat");
      return;
    }
    sessionStorage.setItem("activeChat", JSON.stringify(selectedChat));
    onChatOpen(selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    const chatId = sessionStorage.getItem("chatContact");
    if (chatId) {
      const chat = userChats.find((c) => c.uuid === chatId);
      if (chat) setSelectedChat(chat);
    }
    if (selectedChat?.uuid === chatId) {
      sessionStorage.removeItem("chatContact");
      //sendMessage("Hello i'm from post");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChats]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + currentUser?.uuid + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err: any) => {
    console.log("connect error: " + err);
  };

  const loadUserChats = () => {
    setLoading(true);
    axios
      .get(`/chat/${currentUser?.uuid}`)
      .then(async (res) => {
        const promises = res.data.map((item: ChatDtoInterface) =>
          axios
            .get(`/user/${item.recipientUuid}`)
            .then(({ data }) => {
              return (item = {
                ...item,
                imageUrl: data.imageUrl,
                recipientName: data.firstName + " " + data.lastName,
              });
            })
            .catch((err) => console.log(err))
        );
        await Promise.all(promises).then((data: ChatDtoInterface[]) => {
          setUserChats(data);
        });
      })
      .catch((err) => reject(err))
      .finally(() => setLoading(false));
  };

  const onChatOpen = (chat: ChatDtoInterface) => {
    const params: any = {
      updateStatus: chat.newMessages > 0,
    };
    axios
      .get(`/chat/${chat.uuid}/messages`, { params })
      .then((res) => {
        const data = res.data;
        setMessages(data);
      })
      .catch((err) => reject(err));
  };

  const onMessageReceived = (msg: any) => {
    const notification: Notification = JSON.parse(msg.body);
    const chat = sessionStorage.getItem("activeChat");
    if (chat && JSON.parse(chat).recipientUuid === notification.senderId) {
      axios
        .get(`/message/${notification.uuid}`)
        .then(() => {
          onChatOpen(JSON.parse(chat));
        })
        .catch((err) => reject(err));
    } else {
      message.info("Received a new message from " + notification.senderId);
    }
  };

  const sendMessage = (msg: string) => {
    const recipient =
      selectedChat?.userUuid === currentUser?.uuid
        ? selectedChat?.recipientUuid
        : selectedChat?.userUuid;
    if (msg.trim() !== "") {
      const message = {
        chatId: selectedChat?.uuid,
        senderId: currentUser?.uuid,
        recipientId: recipient,
        content: msg,
        timestamp: moment().format("YYYY-MM-DD"),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    }
  };

  const avatarComponent = (chat: ChatDtoInterface, size: number) => {
    return chat.imageUrl ? (
      <Avatar
        size={size}
        src={process.env.REACT_APP_AZURE_CONTAINER_URL + chat.imageUrl}
      ></Avatar>
    ) : (
      <Avatar size={size} icon={<UserOutlined></UserOutlined>}></Avatar>
    );
  };

  return (
    <section className="chat-page">
      <Row className="messages">
        <Col span={8}>
          <div className="chat-list">
            <div className="chat-header">
              <h2>{t("chatPage.messages")}</h2>
            </div>
            {userChats.map((chat) => (
              <div
                className={
                  selectedChat?.uuid === chat.uuid
                    ? "chat-item chat-open"
                    : "chat-item"
                }
                key={chat.uuid}
                onClick={() => setSelectedChat(chat)}
              >
                <div>
                  {avatarComponent(chat, 60)}
                  <p className="recipient-name">{chat.recipientName}</p>
                </div>
                {chat.newMessages > 0 && (
                  <MessageOutlined className="msg-icon"></MessageOutlined>
                )}
              </div>
            ))}
          </div>
        </Col>
        <Col span={16}>
          <div className="chat-messages">
            {selectedChat ? (
              <div>
                <div className="chat-header">
                  {avatarComponent(selectedChat, 60)}
                  <p className="recipient-name">{selectedChat.recipientName}</p>
                </div>
                <ScrollToBottom className="scroll-msg">
                  <ul>
                    {messages.map((msg) => (
                      <li
                        className={
                          msg.senderId === currentUser?.uuid ? "sent" : "reply"
                        }
                        key={msg.uuid}
                      >
                        {msg.senderId !== currentUser?.uuid &&
                          avatarComponent(selectedChat, 30)}
                        <p>{msg.content}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollToBottom>
                <div className="flex">
                  <Form
                    onFinish={() => {
                      sendMessage(text);
                      setText("");
                      onChatOpen(selectedChat);
                    }}
                  >
                    <Form.Item>
                      <Input.Group className="send-input">
                        <Input
                          placeholder={t("chatPage.inputText")}
                          value={text}
                          onChange={(event) => setText(event.target.value)}
                          size={"large"}
                        />
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          icon={<SendOutlined />}
                        >
                          {t("chatPage.submit")}
                        </Button>
                      </Input.Group>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : isEmpty(userChats) ? (
              <p className="no-selected">{t("chatPage.noChats")}</p>
            ) : (
              <p className="no-selected">{t("chatPage.selectChat")}</p>
            )}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ChatPage;
