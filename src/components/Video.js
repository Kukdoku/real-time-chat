import React from "react";
import ReactPlayer from "react-player";
import "./video.css";

function Video({ url }) {
  return (
    <div className="videos">
      <ReactPlayer
        url={url}
        controls="true"
        className="video"
        height="300px"
        width="350px"
      />
    </div>
  );
}

export default Video;
