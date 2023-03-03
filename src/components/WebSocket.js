import React, { useEffect, useState } from "react";

const WebSocket = ({ url }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const newSocket = new window.WebSocket(url);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (event) => {
      const incomingMessage = event.data;
      setMessage(incomingMessage);
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket error", event);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const handleSendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.send(inputMessage.trim());
      setInputMessage("");
    }
  };

  return (
    <div>
      <p>{message}</p>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default WebSocket;
