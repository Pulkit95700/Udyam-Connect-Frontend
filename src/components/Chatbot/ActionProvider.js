import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage(
      "Hello, how can I help? Here are some options you can choose from",
      {
        widget: "ChooseOptions",
        payload: {
          handleCompany: () => {
            console.log("Company");
          },
          handleProduct: handleProduct,
        },
      }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };

  const handleProduct = () => {
    const botMessage = createChatBotMessage(
      "Ok. What you need to do",
      {
        widget: "ProductFilter",
      }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  }
  const handleCompanySearch = () => {
    const botMessage = createChatBotMessage(
      "",
      {
        widget: "ChooseOptions",
        payload: {
          handleCompany: () => {
            console.log("Company");
          },
          handleProduct: () => {
            console.log("Product");
          },
        },
      }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  }

  

  const handleDog = () => {
    const botMessage = createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: "dogPicture",
        payload: "dog",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello: handleHello,
            handleDog: handleDog,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
