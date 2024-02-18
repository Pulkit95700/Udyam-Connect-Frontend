import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    if(message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')){
        actions.handleHello();
    }

    if(message.toLowerCase().includes('dog')){
        actions.handleDog();
    }

  };   

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;