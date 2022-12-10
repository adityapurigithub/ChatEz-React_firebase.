import React from "react";
import formatRelative from "date-fns/formatRelative"; //used for converting date to readable format...
const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  return (
    <div>
      {photoURL ? (
        <img src={photoURL} width={45} style={{ borderRadius: "50%" }} />
      ) : null}
      {displayName ? <span>{displayName}</span> : null}
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
      {text ? <h5>{text}</h5> : null}
    </div>
  );
};

export default Message;
