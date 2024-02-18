import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../reducers/ChatSlice";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase/config";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactQuillInput from "./ReactQuillInput";

const ChatInput = ({ receiver, roomId }) => {
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("company"));

  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // first make the senderRef, receiverRef and roomRef
    const senderRef = doc(db, "users", user.email);
    const receiverRef = doc(db, "users", receiver.email);
    const roomRef = doc(db, "rooms", roomId);

    // now make a message object

    const messageObj = {
      content: message,
      sender: senderRef,
      receiver: receiverRef,
      room: roomRef,
      status: {
        isDelivered: true,
        isRead: false,
      },
      timestamp: Timestamp.now(),
      type: "text",
    };

    const docRef = await addDoc(collection(db, "messages"), messageObj);

    // now add the sender to the user's list of chats and receiver's list of chats
    // kuch sender ka daa store karna hai  har waqt so i could make a collection of chat there and can store the data of the sender of only its emailId and the last message sent by him
    const senderChatRef = doc(db, "users", user.email);
    const receiverChatRef = doc(db, "users", receiver.email);

    const senderChatsIncludedObj = {
      id: receiver.id,
      email: receiver.email,
      name: receiver.name,
      lastMessage: message,
      lastMessageTimestamp: Timestamp.now(),
    };

    const receiverChatsIncludedObj = {
      id: user.id,
      email: user.email,
      name: user.company_name,
      lastMessage: message,
      lastMessageTimestamp: Timestamp.now(),
    };

    await updateDoc(senderChatRef, {
      [`chats.${receiver.id}`]: senderChatsIncludedObj,
    });

    await updateDoc(receiverChatRef, {
      [`chats.${user.id}`]: receiverChatsIncludedObj,
    });

    // now set the message to empty
    setMessage("");
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  return (
    <form onSubmit={handleSendMessage} className="flex gap-2 flex-1">
      <div className="input-box flex gap-1 bg-gray-100 rounded flex-1  py-2 px-2">
        <IconButton className="!p-1">
          <SentimentSatisfiedAltIcon className="!w-6 !h-6" />
        </IconButton>
        <ReactQuillInput value={message} onChange={setMessage} />
        {/* <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="outline-none border-none focus:ring-0 flex-1 bg-inherit focus:border-0 focus:outline-none"
        /> */}
      </div>
      <button
        onClick={handleSendMessage}
        className="bg-green-500 rounded-full text-white px-4 py-2 "
      >
        <SendIcon className="!w-6 !h-6" />
      </button>
    </form>
  );
};

export default ChatInput;
