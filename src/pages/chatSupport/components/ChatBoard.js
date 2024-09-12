import { Avatar, ChatContainer, ConversationHeader, MessageInput, MessageList, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";
import { off, onValue, orderByChild, query, ref, serverTimestamp } from "firebase/database";
import { database } from "../../../config/firbase";
import moment from "moment";
import { getUniqueId } from "../../../utils/services";
import * as SupportChatActions from '../../../redux/Actions/supportChatActions'


const ChatBoard = ({ dispatch, currentCustomerSupport }) => {

    const [messageData, setMessageData] = useState(null)
    useEffect(() => {
        if (!currentCustomerSupport) {
            return
        }
        const customerSupportRef = ref(database, `CustomerSupportMessages/${currentCustomerSupport?.user?._id}`);
        const customerSupportQuery = query(customerSupportRef, orderByChild('createdAt'));

        const handleValueChange = (snapshot) => {
            if (snapshot.exists()) {
                const msg = [];
                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        const data = {
                            message: message?.text,
                            direction: message?.user._id !== 'admin' ? 'incoming' : 'outgoing',
                            position: 'single',
                            sender: message?.user?.name,
                            sentTime: message?.createdAt, // Corrected `cratedAt` to `createdAt`
                            name: message?.user?.name,
                            date: new Date(message?.createdAt),
                            avatarSrc: message?.user?.avatar,
                        };
                        msg.push(data);
                    } catch (e) {
                        console.log(e);
                    }
                });
                setMessageData(msg);
            } else {
                console.log("No data available");
            }
        };

        onValue(customerSupportQuery, handleValueChange, (error) => {
            console.error("Error fetching data:", error);
        });

        return () => {
            off(customerSupportQuery, 'value', handleValueChange);
        };
    }, [currentCustomerSupport])

    return (
        <>
            {currentCustomerSupport &&
                <ChatContainer
                    style={{
                        height: '75vh'
                    }}
                >
                    <ConversationHeader>
                        <Avatar
                            name={currentCustomerSupport?.user?.name}
                            src={currentCustomerSupport?.user?.avatar}
                        />
                        <ConversationHeader.Content
                            // info="Active 10 mins ago"
                            userName={currentCustomerSupport?.user?.name}
                        />
                    </ConversationHeader>
                    {/* typingIndicator={<TypingIndicator content="Emily is typing" />} */}
                    <MessageList>
                        {messageData && messageData.map((msg, index) => (
                            <Messages
                                key={index}
                                messageOne={msg}
                                messageTwo={index - 1 >= 0 ? messageData[index - 1] : null}
                            />
                        ))}

                    </MessageList>
                    <MessageInput placeholder="Type message here" 
                    // onAttachClick={ () => {
                    //     if (fileInputRef.current) {
                    //       fileInputRef.current.click();
                    //     }
                    //   }:
                      

                     onSend={(text) => {
                        console.log('send message', text)
                        dispatch(SupportChatActions.sendSupportChatMessage({ text }))
                    }}
                     />
                </ChatContainer>
            }
        </>
    );
}

const mapStateToProps = state => ({
    currentCustomerSupport: state.chatSupport.currentCustomerSupport
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoard);
