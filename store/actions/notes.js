export const ADD_NOTE = 'ADD_NOTE';
export const ERROR_NOTE = 'ERRORF_NOTE';
export const GET_NOTES = 'GET_NOTES';
import axios from '../../api/authInstance';


export const addNote = (note) => async dispatch => {

    try {

        const response = await axios.post('/notes/new_note', { note });
        dispatch({ type: ADD_NOTE, payload: response.data })

    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_NOTE, payload: error.response.data });
    }

}

export const getNotes = () => async dispatch => {
    try {
        const response = await axios.get('/notes/notes');
        dispatch({ type: GET_NOTES, payload: response.data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_NOTE, payload: error.response.data })
    }
}

export const getTodayNotes = () => async dispatch => {
    try {
        const response = await axios.get('/notes/today');
        dispatch({ type: GET_NOTES, payload: response.data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_NOTE, payload: 'error getting notes' })
    }
}