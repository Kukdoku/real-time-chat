import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import Audio from "./components/Audio";
import Gif from "./components/Glf";
import Image from "./components/Image";
import Pdf from "./components/Pdf";
import Video from "./components/Video";
import "./message.css";

function Message({ message, userName }) {
  //   console.log(message.username);
  //   console.log(username);
  const isUser = userName === message.username;
  //   console.log(username, message.userame);

  // console.log(isUser);
  let comp;

  if (message.fileType === "images") {
    comp = <Image url={message.fileUrl} />;
  } else if (message.fileType === "audios") {
    comp = <Audio url={message.fileUrl} />;
  } else if (message.fileType === "videos") {
    comp = <Video url={message.fileUrl} />;
  } else if (message.fileType === "pdfs") {
    comp = <Pdf url={message.fileUrl} />;
  } else if (message.fileType === "GIF") {
    comp = <Gif url={message.fileUrl} />;
  }
  return (
    <div className={`message ${isUser && "message__user"}`}>
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
          alignItems: "center",
          // height: "10px",
        }}
      >
        <Avatar />
        <b style={{ marginLeft: "5px", height: "10" }}>
          {message.username ? `${message.username}` : `Unknown User`}
        </b>

        {/* <small>{message.timestamp.toDate()}</small> */}
      </div>
      <Card className={isUser ? "message__userCard" : "message__questCard"}>
        <CardContent>
          <Typography color="initial" varient="h5" component="h2">
            {message.message !== "" ? message.message : null}
            {message.fileType !== "None" ? comp : null}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
