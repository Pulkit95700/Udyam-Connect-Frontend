import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import db from "../../firebase/config";
import { setMessages } from "../../reducers/ChatSlice";

const ChatBox = ({ receiver, roomId }) => {
  const { allMessages } = useSelector((state) => state.chats);
  const user = JSON.parse(localStorage.getItem("company"));

  const dispatch = useDispatch();

  const loadMessages = () => {
    // console.log(receiver)

    // make the ref of room
    const roomRef = doc(db, "rooms", roomId);

    // now make a query to get the messages
    const q = query(
      collection(db, "messages"),
      where("room", "==", roomRef),
      orderBy("timestamp")
    );

    // now subscribe to the query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        messages.push({
          id: doc.id,
          type: data.type,
          content: data.content,
          isReceived: data.sender.id !== user.email,
          isDelivered: data.status.isDelivered,
          isRead: data.status.isRead,
          time: Timestamp.now().toDate().toLocaleTimeString(),
        });
      });

      dispatch(setMessages(messages));

      // scroll to the bottom of the chat
      setTimeout(() => {
        const chatBox = document.getElementById("chat-box");
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 100);
    });

    // now unsubscribe the query
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = loadMessages();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      id="chat-box"
      className="bg-[#f7f5f5] w-full flex-col h-full gap-3 flex py-4 px-4 overflow-y-scroll"
    >
      {allMessages.map((message) => (
        <MessageItem
          key={message.id}
          message={message.content}
          time={message.time}
          isReceived={message.isReceived}
        />
      ))}
    </div>
  );
};

export default ChatBox;
