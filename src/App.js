import { Button, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { storage, db } from "./firebase";
import Message from "./Message.js";
import firebase from "firebase";
import Navbar from "./Navbar";
import AttachFileIcon from "@material-ui/icons/AttachFile";
// import EmojiTextarea from "react-emoji-textarea";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [userName, setUserName] = useState("");

  // file input

  const [file, setFile] = useState(null);
  // const [fileType, setFileType] = useState("None");
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault();

    if (file == null) {
      db.collection("message").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        username: userName,
        fileType: "None",
        fileUrl: null,
      });
      setInput("");
      setFile(null);
      setProgress(0);
    } else {
      let fileType;
      let ext;
      if (file !== null) {
        ext = file.name.split(".").pop();
      } else {
        ext = "no file";
      }

      // console.log(ext);
      if (["png", "jpg", "jpeg"].includes(ext)) {
        // console.log("donei");
        fileType = "images";
      } else if (["gif"].includes(ext)) {
        // console.log("doneg");
        fileType = "GIF";
      } else if (["mp4", "mkv", "wmv"].includes(ext)) {
        // console.log("donev");
        fileType = "videos";
      } else if (["wav", "mp3", "mpeg-4"].includes(ext)) {
        // console.log("donea");
        fileType = "audios";
      } else if (["pdf"].includes(ext)) {
        // console.log("donep");
        fileType = "pdfs";
      } else {
        // console.log("donen");
        fileType = "None";
      }

      // console.log(fileType);
      const uploadTask = storage.ref(`${fileType}/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error.message);
          alert(error.message);
        },
        () => {
          storage
            .ref(fileType)
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("message").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                username: userName,
                fileType: fileType,
                fileUrl: url,
              });
              setInput("");
              setFile(null);
              setProgress(0);
            });
        }
      );
    }
  };

  // const handleUpload = () => {
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert(error.message);
  //     },
  //     () => {
  //       storage
  //         .ref(image.name)
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           db.collection("posts").add({
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //             caption: caption,
  //             imageUrl: url,
  //             username: username,
  //           });
  //           setProgress(0);
  //           setCaption("");
  //           setImage(null);
  //         });
  //     }
  //   );
  // };

  // console.log(input);
  // console.log(!input);
  useEffect(() => {
    // console.log(db.collection("message"));
    db.collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

    // console.log(messages);
  }, []);

  // useEffect(() => {
  //   database.collection("message").onSnapshot((snapshot) => {
  //     setMessages(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  useEffect(() => {
    setUserName(
      prompt(
        "Please Write UserName, Not use Your Real Name, Every time You reload the page you have to fill this username"
      )
    );
  }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   db.collection("message").add({
  //     message: input,
  //     username: userName,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });

  //   setInput("");
  // };

  const FileHandleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
    // console.log(file);
    // console.log(image.name);
  };

  // console.log(messages);

  return (
    <div className="App">
      <Navbar username={userName} />

      <form className="app__form">
        {/* INput Field */}

        <Input
          placeholder="enter your message 🚀"
          className="app__message"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        {/* Image UPload */}

        <label htmlFor="file-upload" className="custom-file-upload">
          <AttachFileIcon />
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".png, .jpg, .jpeg,.mp4, .mkv, .wmv,.pdf,.gif,.wav,.mp3,mpeg-4"
          onChange={FileHandleChange}
        />

        {/* Audio File Upload */}

        {/* <EmojiTextarea /> */}

        <Button
          disabled={!input && !file}
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleUpload}
        >
          send
        </Button>
      </form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {file === null ? null : <p> {file.name}</p>}
        {progress === 0 ? null : (
          <progress value={progress} max="100" style={{ width: "100%" }} />
        )}
      </div>

      {/* messages display */}

      {messages.map(({ id, data }) => (
        <Message key={id} message={data} userName={userName} />
      ))}
    </div>
  );
}

export default App;
