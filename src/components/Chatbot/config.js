import { createChatBotMessage } from "react-chatbot-kit";
import "./Widgets/DogPicture.jsx";
import DogPicture from "./Widgets/DogPicture.jsx";
import ChooseOptions from "./Widgets/ChooseOptions.jsx";
import ProductFilter from "./Widgets/ProductFilter.jsx";

const user = JSON.parse(localStorage.getItem("company"));

const config = {
  initialMessages: [
    createChatBotMessage(`Hello ${user?.legal_name}, how can I help you?`),
  ],
  botName: "Chatbot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: "ChooseOptions",
      widgetFunc: (props) => <ChooseOptions {...props} />,
    },
    {
      widgetName: "ProductFilter",
      widgetFunc: (props) => <ProductFilter {...props} />,
    },
  ],
};

export default config;
