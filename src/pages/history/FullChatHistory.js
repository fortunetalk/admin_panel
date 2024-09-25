import React, { useEffect, useState } from 'react';
import "react-chat-elements/dist/main.css";
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { database } from '../../config/firbase';
import { ref, onValue } from 'firebase/database';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import * as HistoryActions from '../../redux/Actions/historyActions.js'

const useStyles = makeStyles({
  chatContainer: {
    width: '100%',
    height: '80vh',
    overflowY: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5'
  },
  messageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    maxWidth: '80%',
    wordBreak: 'break-word',
    position: 'relative',
  },
  right: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1f5fe',
  },
  left: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  messageText: {
    margin: '0 10px',
    color: 'black',
  },
  messageDate: {
    fontSize: '0.75rem',
    color: 'gray',
    marginTop: '4px',
    textAlign: 'right',
    marginRight: '10px',
    marginTop: '4px',
    marginBottom: '2px', // To provide spacing below the date
  },
  media: {
    maxWidth: '100%',
    borderRadius: '8px',
  }
});

const FullChatHistory = ({ chatSummaryData, dispatch }) => {
  const classes = useStyles();
  const location = useLocation();
  const { customerId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(HistoryActions.getChatSummary({ chatId: location.state.chatId, customerId, classes }))
    return () => {
      dispatch(HistoryActions.setChatSummary([]))
    }
  }, [])

  // useEffect(() => {
  //   const messagesRef = ref(database, `Messages/${location.state.chatId}`);


  //   const handleValueChange = (snapshot) => {
  //     const data = snapshot.val();
  //     const messagesArray = data ? Object.values(data).map((msg) => {
  //       // Handle timestamp
  //       const timestamp = msg.addedAt;
  //       let formattedDate = '';

  //       if (timestamp) {
  //         let dateObj = typeof timestamp === 'number' ? new Date(timestamp) : new Date(Date.parse(timestamp));
  //         formattedDate = format(dateObj, 'eeee MMM d, yyyy h:mm a'); // Format as "DayOfWeek Month Date, Year h:mm AM/PM"
  //       }

  //       return {
  //         position: msg.user._id === customerId ? classes.right : classes.left,
  //         text: msg.image ? '' : msg?.text,
  //         date: formattedDate,
  //         type: msg.image ? 'photo' : (msg.video ? 'video' : (msg.audio ? 'audio' : 'text')),
  //         data: {
  //           uri: msg.image || msg.video || msg.audio,
  //           position: msg.user._id === customerId ? classes.right : classes.left
  //         }
  //       };
  //     }) : [];
  //     setMessages(messagesArray);
  //   };

  //   onValue(messagesRef, handleValueChange);

  //   // return () => {
  //   //   ref(database, `Messages/${location.state.chatId}`).off('value', handleValueChange);
  //   // };
  // }, [customerId, classes.right, classes.left, location.state.chatId]);

  return (
    <div className={classes.chatContainer}>
      {chatSummaryData && chatSummaryData.map((message, index) => (
        <div key={index} className={classes.messageWrapper}>
          <div className={`${classes.message} ${message.position}`}>
            {message.type === 'text' && (
              <div className={classes.messageText}>{message.text}</div>
            )}
            {(message.type === 'photo' || message.type === 'video') && (
              <img src={message.data.uri} alt="media" className={classes.media} />
            )}
            {message.type === 'audio' && (
              <audio controls src={message.data.audioURL} className={classes.media} />
            )}
            <div className={classes.messageDate}>{message.date}</div> {/* Date below the message */}
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  chatSummaryData: state.history.chatSummaryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(mapStateToProps, mapDispatchToProps)(FullChatHistory);
