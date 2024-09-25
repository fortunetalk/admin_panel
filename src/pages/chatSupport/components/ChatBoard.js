import { Avatar, Button, ChatContainer, ConversationHeader, MessageInput, MessageList, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { connect } from "react-redux";
import { off, onValue, orderByChild, query, ref, serverTimestamp } from "firebase/database";
import { database } from "../../../config/firbase";
import moment from "moment";
import { getUniqueId } from "../../../utils/services";
import * as SupportChatActions from '../../../redux/Actions/supportChatActions'


const ChatBoard = ({ dispatch, currentCustomerSupport }) => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    // const handleAttachClick = () => {
    //    console.log("Attach clicked");
    //   };

    //   const handleAttachClick = () => {

    //     console.log("Attach clicked");

    //     // Create a file input element
    //     const fileInput = document.createElement('input');
    //     fileInput.type = 'file';
    //     // fileInput.style.display = 'none'; 
    //     fileInput.style.position = 'absolute';
    //     fileInput.style.left = '-9999px'; // Hide off-screen
    //     fileInput.multiple = true; // Allow multiple files

    //     // Append the file input to the document body
    //     document.body.appendChild(fileInput);

    //     // Trigger file input click
    //     fileInput.click();

    //     // Add an event listener to handle file selection
    //     fileInput.addEventListener('change', (event) => {
    //       const files = Array.from(event.target.files);
    //       if (files.length > 0) {
    //         files.forEach(file => {
    //           if (file) {
    //             // Handle file processing here
    //             console.log('Selected file:', file);

    //             // For image previews, you might want to create an object URL
    //             if (file.type.startsWith('image/')) {
    //               const reader = new FileReader();
    //               reader.onload = (e) => {
    //                 // Create an image preview URL
    //                 console.log('Image preview URL:', e.target.result);
    //               };
    //               reader.readAsDataURL(file);
    //             }

    //             dispatch(SupportChatActions.sendSupportChatMessage({ text }));

    //             // Optionally, you can handle further actions with the file here
    //             // e.g., upload file, dispatch actions, etc.
    //           }
    //         });
    //       }

    //       // Clean up by removing the file input element
    //       document.body.removeChild(fileInput);
    //     });
    //   };


    const handleAttachClick = () => {
        console.log("Attach clicked");

        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.position = 'absolute'; // Move off-screen
        fileInput.style.left = '-9999px'; // Hide off-screen
        fileInput.multiple = true; // Allow multiple files

        // Append the file input to the document body
        document.body.appendChild(fileInput);

        // Trigger file input click
        fileInput.click();

        // Add an event listener to handle file selection
        fileInput.addEventListener('change', (event) => {
            const files = Array.from(event.target.files);

            if (files.length > 0) {
                // Process each file
                files.forEach(file => {
                    if (file) {
                        // Handle file processing here
                        console.log('Selected file:', file);

                        // Check if the file is an image for preview purposes
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                // Create an image preview URL
                                console.log('Image preview URL:', e.target.result);

                                // If you want to send the file as part of the chat, you may need to handle file uploading here
                                // For example, you might need to upload the file to a server or cloud storage and get the URL
                            };
                            reader.readAsDataURL(file);
                        } else {
                            // For non-image files, handle as needed
                            // For example, you might upload to a server and then dispatch the file URL or ID
                            console.log('Non-image file selected:', file);
                        }

                        dispatch(SupportChatActions.sendSupportChatMessage({ text: `File attached: ${file.name}` }));
                    }
                });
            }

            // Clean up by removing the file input element
            document.body.removeChild(fileInput);
        });
    };




    const handleSend = (text) => {
        console.log('send message', text);
        dispatch(SupportChatActions.sendSupportChatMessage({ text }));
    };

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


                    <Button 
                        border
                        onClick={() => inputRef.current?.focus()}
                        style={{ marginBottom: "1rem", color: "red" }}
                    >
                        Set focus
                    </Button>

                    <MessageInput
                        placeholder="Type message here"
                        onAttachClick={handleAttachClick}
                        onSend={handleSend}
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
