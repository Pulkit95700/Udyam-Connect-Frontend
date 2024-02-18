import { Avatar } from "@mui/material";
import React from "react";
import AvatarImg from "../../assets/icons/BusinessmanAvatar.png";
import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';


const ChatListItem = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigate = () => {
    if (id) {
      navigate("/chats/" + props.id);
    } else {
      window.location.href = window.location.href + '/' + props.id;
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="w-full flex border-t border-b gap-3 hover:bg-gray-100 cursor-pointer py-3 px-4 items-center"
    >
      <Avatar src={AvatarImg} className="!w-14 !h-14" />
      <div className="flex flex-col gap-1">
        <h3 className="text-md">{props.name}</h3>
        <div className="text-gray-400 text-sm">{parse(props.lastMessage)}</div>
      </div>
    </div>
  );
};

export default ChatListItem;
