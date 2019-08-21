import { GET_REFERRALS } from "../actions/referrals";

const initialState = {
    referrals: [],
    referral: null,
    error: null,
    sortedReferrals: []
}

 const referralReducer = (state= initialState, action) => {

    switch (action.type) {
        case GET_REFERRALS:
            return {
                ...state,
                referrals: [...action.payload],
                error: null
            }
            
        default:
            return state;
    }
   
 }


 export default referralReducer;