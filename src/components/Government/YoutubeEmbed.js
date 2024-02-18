import React from 'react';

const YouTubeEmbed = ({ videoUrl }) => {
  // Extract the video ID from the YouTube URL
  const videoId = videoUrl?.split('v=')[1];

  return (
    <div className="youtube-embed self-center justify-self-center flex-1 flex rounded-lg justify-end">
      <iframe
        width="560"
        height="315"
        className='rounded-lg border-black shadow-lg '
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video Player"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;