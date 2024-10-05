import React, { useEffect, useState } from 'react';
import "react-chat-elements/dist/main.css";
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import * as HistoryActions from '../../redux/Actions/historyActions.js';
import { Modal, Backdrop, Fade } from '@material-ui/core';

const useStyles = makeStyles({
  chatContainer: {
    width: '100%',
    height: '80vh',
    overflowY: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
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
  },
  media: {
    maxWidth: '100%',
    borderRadius: '8px',
  },
});

const ImageModal = ({ open, handleClose, imageSrc }) => (
  <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{ timeout: 500 }}
  >
    <Fade in={open}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'relative',
      }}>
        <img src={imageSrc} alt="Full size" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    </Fade>
  </Modal>
);

const FullChatHistory = ({ chatSummaryData, dispatch }) => {
  const classes = useStyles();
  const location = useLocation();
  const { customerId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(HistoryActions.getChatSummary({ chatId: location.state.chatId, customerId, classes }));
    return () => {
      dispatch(HistoryActions.setChatSummary([]));
    };
  }, [dispatch, location.state.chatId, customerId, classes]);

  return (
    <div className={classes.chatContainer}>
      {chatSummaryData && chatSummaryData.map((message, index) => (
        <div key={index} className={classes.messageWrapper}>
          <div className={`${classes.message} ${message.position}`}>
            {message.type === 'text' && (
              <div className={classes.messageText}>{message.text}</div>
            )}
            {(message.type === 'photo' || message.type === 'video') && (
              <img
                src={message.data.uri}
                alt="media"
                onClick={() => handleImageClick(message.data.uri)}
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            )}
            {message.type === 'audio' && (
              <audio controls className={classes.media}>
                <source src={message.data.audioURL} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            )}
            <div className={classes.messageDate}>{message.date}</div>
          </div>
        </div>
      ))}

      {/* Image Modal */}
      <ImageModal
        open={modalOpen}
        handleClose={handleCloseModal}
        imageSrc={selectedImage}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  chatSummaryData: state.history.chatSummaryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FullChatHistory);
