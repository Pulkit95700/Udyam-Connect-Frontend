import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import AvatarImg from "../../assets/icons/BusinessmanAvatar.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatBox from "./ChatBox";
import Popover from "@mui/material/Popover";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase/config";
import ChatInput from "./ChatInput";
import AddOptions from "./AddOptions";

const ChatContainer = ({ receiver, roomId }) => {
  /////////////////////////////////For Popover/////////////////////////////////////
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = (e) => {
    setShowOptions((prev) => !prev);
  };

  /////////////////////////////////////////////////////////////////////////////////
  const [isReceiverOnline, setIsReceiverOnline] = useState(false);

  const getReceiverOnline = async () => {
    const unsub = onSnapshot(doc(db, "users", receiver.email), (doc) => {
      setIsReceiverOnline(doc.data()?.isOnline);
    });

    return unsub;
  };

  useEffect(() => {
    // make our user online and fetch if the sender
    const unsub = getReceiverOnline();

    return () => {
      typeof unsub === "function" && unsub();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex py-2 px-4 gap-3 border-b border-[#dbdbdb]">
        <Avatar src={AvatarImg} className="!w-10 !h-10" />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{receiver.name}</h3>
          <p className="text-gray-400 text-xs">
            {isReceiverOnline ? "Online" : ""}
          </p>
        </div>

        <div className="action-buttons self-end ml-auto">
          <IconButton>
            <CurrencyRupeeIcon className="!w-6 !h-6" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="!w-6 !h-6" />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-1 overflow-y-scroll">
        <ChatBox receiver={receiver} roomId={roomId} />
      </div>

      <div className="flex gap-2 py-3 border-t border-[#dbdbdb] items-center px-2">
        {/* <div className="absolute -translate-y-[3.5rem]">
          <Chip label="Send your information" variant="outlined" />
        </div> */}
        <div className="relative">
          <IconButton onClick={toggleShowOptions}>
            <AddIcon className="!w-[1.4rem] !h-[1.4rem]" />
          </IconButton>

          <AddOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            className={`bg-white shadow-lg rounded-md absolute bottom-14 ${
              !showOptions && "hidden"
            }`}
          />
        </div>
        <ChatInput receiver={receiver} roomId={roomId} />
      </div>
    </div>
  );
};

export default ChatContainer;
