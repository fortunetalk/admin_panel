import React from "react";
import { Avatar, Conversation, } from "@chatscope/chat-ui-kit-react";
import { connect } from "react-redux";
import * as ChatSupportActions from  '../../../redux/Actions/supportChatActions';

const Conversations = ({ dispatch, customerListData }) => {
    console.log(customerListData, 'dsfjsdjkfhsjdfhsjs');
    return (
        <>
            {
                customerListData.map((item, index) => {
                    console.log("item", item)
                    return (
                        <Conversation
                            info={item.text}
                            lastSenderName={item.user.name}
                            name={item.user.name}
                            onClick={() =>{
                                dispatch(ChatSupportActions.setCurrentCustomerSupport(item));
                            }}
                        >

                            <Avatar
                                name={item.user.name}
                                src={item.user.avatar}
                            />
                            {/* <Conversation.Operations onClick={()=>{
                               console.log("kjdhjksf");
                            }} /> */}
                        </Conversation>
                    )

                })}
        </>

    );
};

const mapStateToProps = state => ({
    customerListData: state.chatSupport.customerListData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
