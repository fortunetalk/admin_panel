import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getUniqueId } from '../../utils/services'
import { database } from '../../config/firbase'
import { onValue, orderByChild, push, query, ref, serverTimestamp, update } from 'firebase/database'
import { set } from 'date-fns'


function* getSupportChatMessageData(actions) {
    try {
        const { dispatch } = actions.payload
        const customerData = yield select(state => state.customer.customerData)

        const ref = database.ref(`CustomerSupportMessages/${customerData?._id}`).orderByChild('createdAt')
        ref.on('value', snapshot => {
            try {
                const msg = [];

                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        msg.push({ ...message });
                    } catch (e) {
                        console.log(e)
                    }
                })
                dispatch({
                    type: actionTypes.SET_SUPPORT_CHAT_MESSAGES_DATA,
                    payload: msg.reverse(),
                })
            } catch (e) {
                console.log(e)
            }

        })

    } catch (e) {
        console.log(e)
    }
}

function* sendSupportChatMessage(actions) {
    try {
        const { payload } = actions
        const currentCustomerSupport = yield select(state => state.chatSupport.currentCustomerSupport)
        const message = {
            ...payload,
            _id: getUniqueId(),
            user: {
                _id: 'admin',
                name: 'Admin',
                avatar: '',
            },
            sent: true,
            received: false,
            createdAt: new Date().getTime(),
            addedAt: serverTimestamp(),
        }

        const chatRef = ref(database, `CustomerSupportMessages/${currentCustomerSupport?.user?._id}`)
        const listRef = ref(database, `CustomerSupport/${currentCustomerSupport?.user?._id}`)
        update(listRef, {message, user: {
            _id: currentCustomerSupport?.user?._id,
            name: currentCustomerSupport?.user?.name,
            avatar: currentCustomerSupport?.user?.avatar,
        }})
        push(chatRef, {
            ...message
        })

    } catch (e) {
        console.log(e)
    }
}


function* getSupportChatCustomerList(actions) {
    try {
        const { dispatch } = actions.payload

        const customerSupportRef = ref(database, 'CustomerSupport');
        const customerSupportQuery = query(customerSupportRef, orderByChild('createdAt'));
        onValue(customerSupportQuery, (snapshot) => {
            if (snapshot.exists()) {
                const msg = [];
                snapshot.forEach(childSnapshot => {
                    try {
                        const message = childSnapshot.val();
                        msg.push({ ...message, id: message?._id });
                    } catch (e) {
                        console.log(e)
                    }
                })
                dispatch({
                    type: actionTypes.SET_SUPPORT_CUSTOMER_LIST,
                    payload: msg.reverse(),
                })

            } else {
                console.log("No data available");
            }
        }, (error) => {
            console.error("Error fetching data: ", error);
        });
        // ref.on('value', snapshot => {
        //     try {
        //         const msg = [];
        //         console.log(snapshot.val())
        //         snapshot.forEach(childSnapshot => {
        //             try {
        //                 const message = childSnapshot.val();
        //                 msg.push({ ...message, id: message?._id });
        //             } catch (e) {
        //                 console.log(e)
        //             }
        //         })
        //         dispatch({
        //             type: actionTypes.SET_SUPPORT_CUSTOMER_LIST,
        //             payload: msg.reverse(),
        //         })
        //     } catch (e) {
        //         console.log(e)
        //     }

        // })

    } catch (e) {
        console.log(e)
    }
}


export default function* chatSupportSaga() {
    yield takeLeading(actionTypes.GET_SUPPORT_CHAT_MESSAGES_DATA, getSupportChatMessageData)
    yield takeLeading(actionTypes.SEND_SUPPORT_CHAT_MESSAGE, sendSupportChatMessage)
    yield takeLeading(actionTypes.GET_SUPPORT_CUSTOMER_LIST, getSupportChatCustomerList)
}   