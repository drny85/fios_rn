export const ADD_REFEREE = 'ADD_REFEREE';
export const GET_REFEREES = 'GET_REFEREES';
export const ERROR_REFEREE = 'ERROR_REFEREE'
import axios from '../../api/authInstance';

export const getReferees = () => async dispatch => {
    try {
        const response = await axios.get('/referee/all-referees');
        dispatch({ type: GET_REFEREES, payload: response.data })
    } catch (error) {
        dispatch({ type: ERROR_REFEREE, payload: error.response.data });
    }
}