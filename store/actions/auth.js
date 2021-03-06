export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN'
export const LOGOUT = 'LOGOUT';


import axios from '../../api/authInstance';
import { AsyncStorage } from 'react-native'


export const login = (email, password) => async dispatch => {
    try {

        const response = await axios.post('/user/login', { email, password });
        dispatch({ type: LOGIN, payload: response.data });
        saveToken(response.data.token, response.data.user);
    } catch (error) {

        dispatch({ type: ERROR, payload: 'Invalid email or password' });
        removeToken();

    }
}


export const logout = () => async dispatch => {
    try {
        await AsyncStorage.removeItem('fiosData');
        dispatch({ type: LOGOUT })
    } catch (error) {
        dispatch({ type: ERROR })
    }
}

const saveToken = async (token, user) => {
    await AsyncStorage.setItem('fiosData', JSON.stringify({
        token: token,
        user: user
    }))
}

const removeToken = async () => {
    await AsyncStorage.removeItem('fiosData');
}

export const autoLogin = (token, user) => {
    return {
        type: AUTO_LOGIN, payload: { token, user }
    }

}


