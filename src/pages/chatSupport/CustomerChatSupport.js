import React, { useState, useRef, useEffect } from "react";
import { Grid, Button } from "@mui/material";
// import { MessageList, ChatList, Input } from "react-chat-elements";
import '../chatSupport/chatsupport.css';
import { GiftedChat } from 'react-web-gifted-chat';
import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, InfoButton, MainContainer, Message, MessageInput, MessageList, MessageSeparator, TypingIndicator, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useStyles } from "../../assets/styles.js";


const CustomerChatSupport = () => {
    var classes = useStyles();
    const inputReference = useRef(null); // Correctly define the reference
    const [inputValue, setInputValue] = useState(''); // Define state for input value
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        setMessages([{
            id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                id: 2,
                name: 'React',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
        },])
    }, [])

    const messageData = [
        {
            position: 'left',
            type: 'text',
            text: 'Hello! How can I assist you today?',
            date: new Date(),
            view: 'single',
        },
        {
            position: 'right',
            type: 'text',
            text: 'I need help with my horoscope reading.',
            date: new Date(),
            view: 'single',
        },
        {
            position: 'left',
            type: 'text',
            text: 'Sure! Could you please provide me with your birth details?',
            date: new Date(),
            view: 'single',
        },
        {
            position: 'right',
            type: 'text',
            text: 'I was born on January 1, 1990, at 10:00 AM.',
            date: new Date(),
            view: 'single',
        },
        {
            position: 'left',
            type: 'text',
            text: 'Thank you for the information. I’ll prepare your reading and get back to you shortly.',
            date: new Date(),
            view: 'single',
        },
    ];

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            // Add your logic to send the message
            setInputValue(''); // Clear input after sending
        }
    };
    const onSend = (message) => {
        setMessages(preState => {
            return GiftedChat.append(preState, message)
        });
    };

    return (
        <Grid container spacing={1} >


            <Grid item lg={12} sm={12} md={12} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center !important', textAlign: 'center', }}>
                    <div className={classes.heading} style={{ textAlign: 'center', color: 'black', fontSize: '20px', fontWeight: '600' }}> Customer Chat Support</div>
                </div>

            </Grid>

            <Grid item lg={4} sm={4} md={4} xs={4}>
                <ConversationList
                    style={{
                        height: '75vh'
                    }}
                >
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Lilly"
                        name="Lilly"
                    >
                        <Avatar
                            name="Lilly"
                            src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Joe"
                        name="Joe"
                    >
                        <Avatar
                            name="Joe"
                            src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Emily"
                        name="Emily"
                    >
                        <Avatar
                            name="Emily"
                            src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Kai"
                        name="Kai"
                    >
                        <Avatar
                            name="Kai"
                            src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Akane"
                        name="Akane"
                    >
                        <Avatar
                            name="Akane"
                            src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Eliot"
                        name="Eliot"
                    >
                        <Avatar
                            name="Eliot"
                            src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Zoe"
                        name="Zoe"
                    >
                        <Avatar
                            name="Zoe"
                            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Patrik"
                        name="Patrik"
                    >
                        <Avatar
                            name="Patrik"
                            src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Lilly"
                        name="Lilly"
                    >
                        <Avatar
                            name="Lilly"
                            src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Joe"
                        name="Joe"
                    >
                        <Avatar
                            name="Joe"
                            src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Emily"
                        name="Emily"
                    >
                        <Avatar
                            name="Emily"
                            src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                        />
                    </Conversation>
                    <Conversation
                        info="Yes i can do it for you"
                        lastSenderName="Kai"
                        name="Kai"
                    >
                        <Avatar
                            name="Kai"
                            src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
                        />
                    </Conversation>
                </ConversationList>
            </Grid>

            <Grid item lg={8} sm={8} md={8} xs={8}>
                <ChatContainer
                    style={{
                        height: '75vh'
                    }}
                >
                    <ConversationHeader>
                        <Avatar
                            name="Emily"
                            src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                        />
                        <ConversationHeader.Content
                            // info="Active 10 mins ago"
                            userName="Emily"
                        />
                        {/* <ConversationHeader.Actions>
                        <VoiceCallButton />
                        <VideoCallButton />
                        <InfoButton />
                    </ConversationHeader.Actions> */}
                    </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}>
                        <MessageSeparator content="Saturday, 30 November 2019" />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'single',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'Hello my friend',
                                sender: 'Oliver',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'first',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'normal',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'normal',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello Ranjeet',
                                position: 'last',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'first',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'normal',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'normal',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'last',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'first',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'last',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                        <MessageSeparator content="Saturday, 31 November 2019" />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'single',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'single',
                                sender: 'Oliver',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'first',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'normal',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'normal',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'last',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'first',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'normal',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'normal',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Hello my friend',
                                position: 'last',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            avatarSpacer
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'first',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Hello my friend',
                                position: 'last',
                                sender: 'Emily',
                                sentTime: '15 mins ago'
                            }}
                        >
                            <Avatar
                                name="Emily"
                                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                            />
                        </Message>
                    </MessageList>
                    <MessageInput placeholder="Type message here" />
                </ChatContainer>
            </Grid>
        </Grid>
    );
};

export default CustomerChatSupport;
