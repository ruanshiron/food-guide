import { useEffect, useState } from "react";
import { database } from "../config/firebaseConfig";
import { useAuth } from "../utils/auth/AuthProvider";

export const useChat = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentOpponent, setCurrentOpponent] = useState(null);
  const { user } = useAuth();

  const toggleChatBox = () => {
    setShowChatBox((value) => !value);
  };

  const send = (text) => {
    const now = new Date();
    database
      .collection("users")
      .doc(user.id)
      .collection("messages")
      .add({
        sender: user.id,
        text: text,
        opponent: currentOpponent.id,
        createdAt: now
      })
      .then((doc) => {
        database
          .collection("users")
          .doc(currentOpponent.id)
          .collection("messages")
          .doc(doc.id)
          .set({
            sender: user.id,
            text: text,
            opponent: user.id,
            createdAt: now
          });
      });
  };

  useEffect(() => {
    if (!user) return;

    // all conversations
    database
      .collection("users")
      .get()
      .then((snap) => {
        let data = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id.trim(),
        }));
        setConversations([...data]);
        setCurrentOpponent({ ...data[0] });
      });

    // listener messages
    database
      .collection("users")
      .doc(user.id)
      .collection("messages")
      .orderBy('createdAt')
      .onSnapshot((q) => {
        q.docChanges().forEach((change) => {
          if (change.type === "added") {
            let doc = change.doc.data();
            console.log(doc);
            setMessages((messages) => [...messages, doc]);
          }
        });
      });
  }, [user]);

  useEffect(() => {
    conversations.map((conversation) => {});
  }, [conversations]);

  return {
    showChatBox,
    toggleChatBox,
    conversations,
    messages,
    currentOpponent,
    send,
    setCurrentOpponent,
  };
};
