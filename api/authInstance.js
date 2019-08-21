import axios from 'axios';
import { AsyncStorage } from 'react-native'

const getToken = async () => {
    let gotToken;
    const tk = await AsyncStorage.getItem('fiosData');
    if (tk) {
        const { token } = JSON.parse(tk);
        gotToken = token;
    }



}
let token;
getToken().then(t => {
    token = t;
}).catch(err => {
    token = null;
})

export default axios.create({
    baseURL: 'https://safe-woodland-98128.herokuapp.com',
    headers: {

        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQ2NjE1YzhkMGEzYTQ4YTA4MTkwMGEiLCJyb2xlcyI6eyJpc0FkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJjb2FjaCI6ZmFsc2V9LCJlbWFpbCI6InJvYmVydC5tZWxlbmRlekBkcmFzY29zYWxlcy5jb20iLCJpYXQiOjE1NjY0MDE2NjR9.Qq0AspE26mMSf7js_NfjlpNlml4mS625IXXVPgPLaE4eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQ2NjE1YzhkMGEzYTQ4YTA4MTkwMGEiLCJyb2xlcyI6eyJpc0FkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJjb2FjaCI6ZmFsc2V9LCJlbWFpbCI6InJvYmVydC5tZWxlbmRlekBkcmFzY29zYWxlcy5jb20iLCJpYXQiOjE1NjY0MDE2NjR9.Qq0AspE26mMSf7js_NfjlpNlml4mS625IXXVPgPLaE4eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzQ2NjE1YzhkMGEzYTQ4YTA4MTkwMGEiLCJyb2xlcyI6eyJpc0FkbWluIjpmYWxzZSwiYWN0aXZlIjp0cnVlLCJjb2FjaCI6ZmFsc2V9LCJlbWFpbCI6InJvYmVydC5tZWxlbmRlekBkcmFzY29zYWxlcy5jb20iLCJpYXQiOjE1NjY0MDE2NjR9.Qq0AspE26mMSf7js_NfjlpNlml4mS625IXXVPgPLaE4'

    }
})