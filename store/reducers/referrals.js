import { GET_REFERRALS, ERROR_REFERRAL, ADD_REFERRAL, DELETE_REFERRAL, FILTER } from "../actions/referrals";
import { SET_REFFERAL } from "../actions/auth";

const initialState = {
    referrals: [],
    referral: null,
    sortedReferrals: [],
    error: null,
    sortedReferrals: []
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
        case FILTER:
            console.log('HERE');
            console.log(state.referrals);
            return {
                ...state,
                referrals: {
                    ...state.referrals.filter(ref => {
                        if (action.payload) {
                            return ref.status === action.payload
                        }
                        return state.referrals;
                    })
                }
            }

        default:
            return state;
    }

}


export default referralReducer;