import React, { useState, useRef, useEffect } from "react";
import { Grid, Button } from "@mui/material";
// import { MessageList, ChatList, Input } from "react-chat-elements";
import '../chatSupport/chatsupport.css';
import { Avatar, ChatContainer, Conversation, ConversationHeader, ConversationList, InfoButton, MainContainer, Message, MessageInput, MessageList, MessageSeparator, TypingIndicator, VideoCallButton, VoiceCallButton } from "@chatscope/chat-ui-kit-react";

import { useStyles } from "../../assets/styles.js";
import Messages from "./components/Messages.js";
import Conversations from "./components/Conversations.js";
import moment from "moment/moment.js";
import { connect } from "react-redux";
import * as ChatSupportActions from '../../redux/Actions/supportChatActions.js'
import ChatBoard from "./components/ChatBoard.js";


const CustomerChatSupport = ({ dispatch }) => {
    var classes = useStyles();
    const inputReference = useRef(null); // Correctly define the reference
    const [inputValue, setInputValue] = useState(''); // Define state for input value

    useEffect(() => {
        dispatch(ChatSupportActions.getSupportChatCustomerList({ dispatch }))
    }, [])

    const messageData = [
        {
            message: 'Hello my friend',
            direction: 'incoming',
            position: 'single',
            sender: 'Emily',
            sentTime: '15 mins ago',
            name: 'Emily',
            date: new Date(new Date('2024-08-29T05:30:20.601+00:00')),
            avatarSrc: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
        },
        {
            message: 'How are you?',
            direction: 'outgoing',
            position: 'first',
            sender: 'Emily',
            sentTime: '10 mins ago',
            name: 'Emily',
            date: new Date(new Date('2024-08-29T05:30:20.601+00:00')),
            avatarSrc: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
        },
        {
            message: 'How are you?',
            direction: 'outgoing',
            position: 'normal',
            sender: 'Emily',
            sentTime: '10 mins ago',
            name: 'Emily',
            date: new Date(new Date('2024-08-29T05:30:20.601+00:00')),
            avatarSrc: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
        },
        {
            message: 'How are you?',
            direction: 'outgoing',
            position: 'last',
            sender: 'Emily',
            sentTime: '10 mins ago',
            name: 'Emily',
            date: new Date(new Date('2024-08-30T05:30:20.601+00:00')),
            avatarSrc: 'https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg',
        }
    ];

    const conversationData = [
        {
            info: "Yes I can do it for you",
            lastSenderName: "Zoe",
            name: "Zoe",
            avatarsenderSrc: 'https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg',
        },
        {
            info: "I'll get it done ASAP",
            lastSenderName: "John",
            name: "John",
            avatarsenderSrc: 'https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg',
        },
    ];

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            // Add your logic to send the message
            setInputValue('');
        }
    };


    return (
        <Grid container spacing={1} >
            <Grid item lg={12} sm={12} md={12} xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center !important', textAlign: 'center', }}>
                    <div className={classes.heading} style={{ textAlign: 'center', color: 'black', fontSize: '20px', fontWeight: '600' }}> Customer Chat Support</div>
                </div>
            </Grid>

            <Grid item lg={4} sm={4} md={4} xs={4}>
                <ConversationList style={{ height: '75vh' }} >
                    <Conversations />
                </ConversationList>
            </Grid>

            <Grid item lg={8} sm={8} md={8} xs={8}>
                <ChatBoard />
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CustomerChatSupport);



