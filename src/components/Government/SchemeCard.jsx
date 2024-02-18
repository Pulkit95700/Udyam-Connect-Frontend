import React from "react";
import YouTubeEmbed from "./YoutubeEmbed";

function toSentenceCase(inputString) {
  // Use regular expressions to find sentence boundaries (period followed by a space or the beginning of the string)
  // Then use a callback function to capitalize the first letter of each match and convert the rest to lowercase
  return inputString.replace(/(^\w|[\.\!\?]\s*\w)/g, function (match) {
    return match.toUpperCase();
  });
}

const SchemeCard = (props) => {
  return (
    <div
      className={`w-full rounded-lg border border-[#dbdbdb] shadow-lg flex gap-8 px-8 py-10 ${props.className}`}
    >
      <div className="w-1/2 rounded-lg">
        <h1 className="text-2xl font-mono">{toSentenceCase(props.name)}</h1>
        <ul className="!list-disc points mt-4 flex gap-2 flex-col">
          {props?.points?.map((point) => {
            return <li className="flex">🪩 {point}</li>;
          })}
        </ul>
        <div className="flex gap-4 mt-4">
          <p className="text-md  mt-4 flex gap-4">
            Url:{" "}
            <a href={props.siteUrl} className="underline text-violet-400">
              Apply Here
            </a>
          </p>
        </div>
      </div>
      <YouTubeEmbed videoUrl={props.videoUrl} />
    </div>
  );
};

export default SchemeCard;
