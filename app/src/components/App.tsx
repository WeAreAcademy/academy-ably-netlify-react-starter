import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Types } from "ably/promises";
import React, { useState } from "react";

import { MessageView } from "./MessageView";

const optionalClientId = "academyReactClient"; // When not provided in authUrl, a default will be used.
configureAbly({ authUrl: `/api/ably-token-request?clientId=${optionalClientId}` });

function App() {

  const [messages, setMessages] = useState<Types.Message[]>([]);

  const [channel, ablyClient] = useChannel("votes", (msg: Types.Message) => {
    console.log("Ably message received", msg);
    setMessages(prev => [...prev, msg]);
  })

  function handleVoteClick() {
    console.log("attempting to publish...")
    channel.publish("one-vote", {
      candidate: 17,
      message: "Hello world!"
    });
  }

  return (
    <div className="App">
      <button onClick={handleVoteClick
      }>Click to publish a vote!</button>
      <hr />
      {messages.map(msg => <MessageView message={msg} />)}
    </div >
  )
}

export default App
