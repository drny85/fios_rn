import React, {useEffect} from 'react'
import { View, Text , ActivityIndicator} from 'react-native'
import { AsyncStorage} from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth';

const StartupScreen = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await  AsyncStorage.getItem('fiosData');
            if (!userData) {
                navigation.navigate('Auth');
                return;
            }

            const data = JSON.parse(userData);
            const {token, user} = data;
            if (!user || !token) {
                navigation.navigate('Auth');
                return;
            }

            navigation.navigate('Main');
            dispatch(authActions.autoLogin(token, user));
    
        }
        tryLogin();

    }, [])
    return (
        <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
            <ActivityIndicator size='large' color="grey" /> 
        </View>
    )
}

export default StartupScreen
