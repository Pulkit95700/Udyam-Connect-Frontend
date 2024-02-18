import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import db from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

const ChatList = () => {
  const user = JSON.parse(localStorage.getItem("company"));
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    let responseChats = [];

    const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
      const allChats = doc.data()?.chats;
      let responseChats = [];
      for (const id in allChats) {
        responseChats.push({
          id: id,
          ...allChats[id],
        });
      }

      // response chats will be an object of chats with the id of the user and the last message sent by the user so i need to convert it to array of chats
      setChats(responseChats);
    });

    return unsub;
  };
  useEffect(() => {
    //  now load the chat list easily
    const unsub = getChats();
    return () => {
      typeof unsub === "function" && unsub();
    };
  }, []);

  return (
    <div className="Chat-list-section">
      <h3 className="text-2xl px-4 py-3">Chats</h3>
      <hr />
      <div className="chat-header py-4 px-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Chats "
          />
        </div>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            id={chat.id}
            name={chat.name}
            lastMessage={chat.lastMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
