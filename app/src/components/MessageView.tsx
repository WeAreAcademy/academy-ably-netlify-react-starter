import { Types } from "ably/promises";
import React from "react";
import formatRelative from 'date-fns/formatRelative'

interface MessageViewProps {
    message: Types.Message;
}
export function MessageView(props: MessageViewProps) {
    const msg = props.message;
    return <div>
        {msg.name} -
        {msg.clientId} -
        {formatRelative(msg.timestamp, new Date())} -
        {JSON.stringify(msg.data)}
    </div>;
}
