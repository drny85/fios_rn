export const GET_MANAGERS = 'GET_MANAGERS';
export const ERROR_MANAGERS = 'ERROR_MANAGERS';
import axios from '../../api/authInstance';


export const getManagers = () => async dispatch => {
    try {
        const response = await axios.get('/manager/all-managers');
        dispatch({ type: GET_MANAGERS, payload: response.data });
    } catch (error) {
        console.log('MANAGER ERROR', error);
        dispatch({ type: ERROR_MANAGERS, payload: error })
    }
}