import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Message from "./Message";
import style from "./Channel.module.css";
const Channel = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState([]);

  const [initializing, setInitializing] = useState("true");

  const { db, user } = props;
  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")

        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(data);
          setMessages(data);
          setInitializing(false);
        });
      return unsubscribe; //cleanup
    }
  }, [db]);

  const handleChange = (e) => {
    setnewMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setnewMessage("");
  };

  if (initializing) return "Loading...";

  return (
    <div className={style.Channel}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Enter Message"
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
      <ul>
        {messages.map((msg) => {
          return (
            <li key={msg.id}>
              <Message {...msg} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channel;
