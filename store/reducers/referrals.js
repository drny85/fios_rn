import { GET_REFERRALS, ERROR_REFERRAL, ADD_REFERRAL, DELETE_REFERRAL, SET_REFFERAL } from "../actions/referrals";


const initialState = {
    referrals: [],
    referral: null,
    sortedReferrals: [],
    error: null
 
}

const referralReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_REFERRALS:
            return {
                ...state,
                referrals: [...action.payload],
                error: null
            };
        case ERROR_REFERRAL:
            return {
                ...state,
                error: action.payload
            };
        case DELETE_REFERRAL:
            const newReferrals = [...state.referrals.filter(ref => ref._id !== action.payload)]
            return {
                ...state,
                referrals: [...newReferrals]
            }
        case ADD_REFERRAL:

            return {
                ...state,
                referrals: [...state.referrals, action.payload]
            };
        case SET_REFFERAL:
            return {
                ...state,
                referral: { ...state.referrals.find(ref => ref._id === action.payload) }
            };
       
        default:
            return state;
    }

}


export default referralReducer;