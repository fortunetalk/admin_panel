import React from "react";
import { Avatar, Conversation,  } from "@chatscope/chat-ui-kit-react";

const Conversations = ({ info, name, lastSenderName, src }) => {
    
    return (
        <Conversation
        info={info}
        lastSenderName={lastSenderName}
        name={name}>

        <Avatar
            name={name}
             src={src}
        />

    </Conversation>
    );
};

export default Conversations;
