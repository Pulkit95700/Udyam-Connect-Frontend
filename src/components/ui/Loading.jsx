import React from "react";
import LoaderImg from "../../assets/icons/Loading.gif";
const Loading = () => {
  return (
    <div className="w-32 h-62">
      <img
        src={LoaderImg}
        alt="loading"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default Loading;
