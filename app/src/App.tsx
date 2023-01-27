import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Types } from "ably/promises";
import React, { useState } from "react";

import './App.css';
import { MessageView } from "./MessageView";

const optionalClientId = "neillReactClient"; // When not provided in authUrl, a default will be used.
configureAbly({ authUrl: `/api/ably-token-request?clientId=${optionalClientId}` });

function App() {

  const [messages, setMessages] = useState<Types.Message[]>([]);

  const [channel, ablyClient] = useChannel("votes", (msg: Types.Message) => {
    console.log("Ably message received", msg);
    setMessages(prev => [...prev, msg]);
  })

  return (
    <div className="App">
      <button onClick={() => {
        console.log("attempting to publish...")
        channel.publish("one-vote", { message: "Hello world!" });
      }
      }>Click to publish</button>
      <hr />
      {messages.map(msg => <MessageView message={msg} />)}
    </div >
  )
}

export default App
