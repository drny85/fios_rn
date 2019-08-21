import axios from '../../api/authInstance';

export const GET_REFERRALS = 'GET_REFERRALS';
export const ERROR = 'ERROR';

export const getReferrals = () => async dispatch => {
    console.log('HERE');
    try {
        
        const response = await axios.get('/referrals');
        console.log(response.data);
        dispatch({type: GET_REFERRALS, payload: response.data})
        console.log('W');
        
    } catch (error) {
        console.log('ERROR');
        dispatch({type: ERROR, payload: error.response.data});
    }
}