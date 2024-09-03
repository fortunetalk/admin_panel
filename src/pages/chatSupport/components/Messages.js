import React, { useEffect, useState } from "react";
import { Avatar, Message, MessageSeparator } from "@chatscope/chat-ui-kit-react";
import moment from "moment";

const Messages = ({ messageOne, messageTwo, }) => {
    console.log(messageOne);
    console.log(messageTwo);
    const [seprateMessageVisible, setSeprateMessageVisible] = useState(false);

    useEffect(() => {
        function areDatesSame() {
            const date1 = new Date(messageOne.date);
            let date2;

            if (!messageTwo) {
                date2 = new Date();
            }
            else {
                date2 = new Date(messageTwo.date);
            }

            return date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate();

        }
        if (areDatesSame()) {
            setSeprateMessageVisible(false);
        }
        else {
            setSeprateMessageVisible(true);
        }

    }, []);

    return (
        <>
            {seprateMessageVisible && <MessageSeparator content={moment(messageOne.date).format('DD-MM-YYYY')} />}
            <Message
                model={{
                    direction: messageOne.direction,
                    message: messageOne.message,
                    position: messageOne.position,
                    sender: messageOne.sender,
                    sentTime: messageOne.sentTime,

                }}
            >
                {messageOne.direction === 'incoming' && (
                    <Avatar
                        name={messageOne.name}
                        src={messageOne.avatarSrc}
                    />
                )}
            </Message>
        </>
    );
};

export default Messages;
