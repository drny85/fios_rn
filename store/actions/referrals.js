import axios from '../../api/authInstance';
import { AsyncStorage } from 'react-native'

export const GET_REFERRALS = 'GET_REFERRALS';
export const ERROR = 'ERROR';

export const getReferrals = () => async dispatch => {

    try {

        const response = await axios.get('/referrals', { headers: { 'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQ2NjE1YzhkMGEzYTQ4YTA4MTkwMGEiLCJyb2xlcyI6eyJpc0FkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJjb2FjaCI6ZmFsc2V9LCJlbWFpbCI6InJvYmVydC5tZWxlbmRlekBkcmFzY29zYWxlcy5jb20iLCJpYXQiOjE1NjY0MjE1Mjl9.zCM3nqbAl9bgANICutWm-WVAN8JT7XKNxc0GPkLfnJg' } });
        dispatch({ type: GET_REFERRALS, payload: response.data })
        console.log('W');

    } catch (error) {
        console.log(error.data.headers);
        console.log('ERROR');
        dispatch({ type: ERROR, payload: error.response.data });
    }
}