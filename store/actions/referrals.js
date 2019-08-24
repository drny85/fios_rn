import axios from '../../api/authInstance';

export const GET_REFERRALS = 'GET_REFERRALS';
export const ERROR_REFERRAL = 'ERROR';
export const ADD_REFERRAL = 'ADD_REFERRAL';



export const getReferrals = () => async dispatch => {

    try {

        const response = await axios.get('/referrals');

        dispatch({ type: GET_REFERRALS, payload: response.data })


    } catch (error) {
        console.log(error);

        dispatch({ type: ERROR_REFERRAL, payload: error.response });
    }
}

export const addReferral = (referral) => async dispatch => {
    try {
        console.log(referral);
        const response = await axios.post('/add-referral', referral);
        dispatch({ type: GET_REFERRALS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR_REFERRAL, payload: error.response });
    }
}