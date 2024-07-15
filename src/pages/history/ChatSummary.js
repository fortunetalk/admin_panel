import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles";
import Loader from "../../Components/loading/Loader";
import { connect } from "react-redux";
import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader
} from "@minchat/react-chat-ui"
import { useLocation } from "react-router-dom";
import * as HistoryActions from '../../redux/Actions/historyActions.js'

const ChatSummary = ({ dispatch, chatSummaryData, customerFirebaseID }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    dispatch(HistoryActions.getChatSummary(location?.state))
    return ()=>{
      dispatch(HistoryActions.setChatSummary([]))
    }
  }, [])

  return (
    <div className={classes.container}>
      <Loader />
      {chatSummaryData && summaryInfo()}
    </div>
  );

  function summaryInfo() {
    console.log('jii')
    return (
      <MinChatUiProvider theme="#6ea9d7">
        <MainContainer style={{ height: '75vh' }}>
          <MessageContainer>
            {/* <MessageHeader /> */}
            <MessageList
              currentUserId={customerFirebaseID}

              messages={chatSummaryData}

            />
            {/* <MessageInput placeholder="Type message here" /> */}
          </MessageContainer>
        </MainContainer>
      </MinChatUiProvider>
    )
  }
};

const mapStateToProps = (state) => ({
  chatSummaryData: state.history.chatSummaryData,
  customerFirebaseID: state.history.customerFirebaseID
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatSummary);
