import * as actionTypes from '../actionTypes'

const initialState = {
    chatSupportData: [],
    micVisible: true,
    messageValue: '',
    customerListData:[],
    currentCustomerSupport: null,
}

const chatSupport = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_SUPPORT_CHAT_MESSAGES_DATA:
            return {
                ...state,
                chatSupportData: payload
            }
        case actionTypes.SET_MIC_VISIBLE:
            return {
                ...state,
                micVisible: payload
            }
        case actionTypes.SET_SUPPORT_CHAT_MESSAGE_VALUE:
            return {
                ...state,
                messageValue: payload
            }
        case actionTypes.SET_SUPPORT_CUSTOMER_LIST:
            return {
                ...state,
                customerListData: payload
            }
        case actionTypes.SET_CURRENT_CUSTOMER_SUPPORT:
            return {
                ...state,
                currentCustomerSupport: payload
            }
        default:
            return state
    }
}

export default chatSupport