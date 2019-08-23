import axios from '../../api/authInstance';

export const GET_REFERRALS = 'GET_REFERRALS';
export const ERROR = 'ERROR';



export const getReferrals = () => async dispatch => {

    try {

        const response = await axios.get('/referrals');

        dispatch({ type: GET_REFERRALS, payload: response.data })


    } catch (error) {
        console.log(error);

        dispatch({ type: ERROR, payload: error.response });
    }
}

