import { GET_REFERRALS, ERROR_REFERRAL, ADD_REFERRAL } from "../actions/referrals";

const initialState = {
    referrals: [],
    referral: null,
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
        case ADD_REFERRAL:
            return{
                ...state,
                referrals: [...state.referrals.concat(action.payload)]
            };

        default:
            return state;
    }

}


export default referralReducer;