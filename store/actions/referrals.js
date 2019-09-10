import axios from '../../api/authInstance';

export const GET_REFERRALS = 'GET_REFERRALS';
export const ERROR_REFERRAL = 'ERROR';
export const ADD_REFERRAL = 'ADD_REFERRAL';
export const DELETE_REFERRAL = 'DELETE_REFERRAL';
export const SET_REFFERAL = 'SET_REFERRAL';



export const setReferral = id => async dispatch => {
    dispatch({ type: SET_REFFERAL, payload: id })
}


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

        const response = await axios.post('/add-referral', referral);
        dispatch({ type: ADD_REFERRAL, payload: response.data });

    } catch (error) {
        dispatch({ type: ERROR_REFERRAL, payload: error.response });
    }
}

export const deleteReferral = id => async dispatch => {
    console.log("ID", id);
    try {
        if (id) {
            return await axios.delete(`/referral/delete/${id}`)

            // dispatch({ type: DELETE_REFERRAL, payload: id });
        } else {
            console.log('WEY');
            dispatch({ type: ERROR_REFERRAL, payload: 'no referral found' });
        }
    }
    catch (error) {
        console.log('ERROR', error)
        dispatch({ type: ERROR_REFERRAL, payload: error.response.data.msg });
    }
}