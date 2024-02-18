import React from "react";
import Layout from "../components/Layout/Layout";

const Fallback = () => {
  return (
    <Layout>
      <div
        className="tenor-gif-embed"
        data-postid="24291746"
        data-share-method="host"
        data-aspect-ratio="1"
        data-width="100%"
      >
        <a href="https://tenor.com/view/loading-loading-gif-loading-screen-loading-image-gif-24291746">
            Loading Loading Gif
        </a>
      </div>{" "}
      <script
        type="text/javascript"
        async
        src="https://tenor.com/embed.js"
      ></script>
    </Layout>
  );
};

export default Fallback;
