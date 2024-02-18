import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const ChatBotComponent = () => {
  const [showChatbot, toggleChatbot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <div className="fixed left-full flex flex-col gap-2 items-end -translate-x-[calc(100%+2rem)] top-full -translate-y-[calc(100%+2rem)]">
      {showChatbot && (
        <motion.div
          initial={{ opacity: 0, y: 0, x: "100%", scale: 0.3 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="border border-[#dbdbdb] rounded-md shadow-lg"
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            messageHistory={loadMessages()}
            headerText='Chatbot'
            saveMessages={saveMessages}
            actionProvider={ActionProvider}
          />
        </motion.div>
      )}

      <Fab
        onClick={() => toggleChatbot(!showChatbot)}
        color="primary"
        aria-label="edit"
        className="z-[100]"
      >
        {showChatbot ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CloseIcon />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MessageIcon />
          </motion.div>
        )}
      </Fab>
    </div>
  );
};

export default ChatBotComponent;
