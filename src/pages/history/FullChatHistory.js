import React, { useEffect, useState } from 'react';
import "react-chat-elements/dist/main.css";
import { makeStyles } from '@material-ui/core/styles';
import { MessageList } from "react-chat-elements";
import { useParams, useLocation } from 'react-router-dom';
import { database } from '../../config/firbase';
import { ref, onValue } from 'firebase/database';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  messageText: {
    color: 'black',
  }
});

const FullChatHistory = () => {
  const classes = useStyles();
  const location = useLocation();
  const { customerId} = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, `Messages/${location.state.chatId}`);
    
    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data).map((msg) => ({
        position: msg.user._id === customerId ? 'right' : 'left',
        type: 'text',
        title: msg.user.name || '',
        text: msg.text || '',
        className: classes.messageText,
      })) : [];
      setMessages(messagesArray);
    };

    onValue(messagesRef, handleValueChange);
    // return () => {
    //   ref(database, `Messages/${location.state.chatId}`).off('value', handleValueChange);
    // };
  }, [customerId, classes.messageText, location.state.chatId]);

  return (
    <div>
      <MessageList
        className='message-list'
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={messages}
      />
    </div>
  );
}

export default FullChatHistory;
