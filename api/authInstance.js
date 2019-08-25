import axios from 'axios';
import { AsyncStorage } from 'react-native'


const instance = axios.create({
    baseURL: 'https://cd5916c7.ngrok.io'
})

instance.interceptors.request.use(
    async (config) => {
        const data = await AsyncStorage.getItem('fiosData');
       
        if (data) {
            const { token, user } = JSON.parse(data);
            config.headers['x-auth-token'] = token || '';
        }
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
);


export default instance;