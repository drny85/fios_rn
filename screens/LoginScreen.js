import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { View, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements'
import * as authActions from '../store/actions/auth';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const loginHandler = () => {
        dispatch(authActions.login(email, password));
        if (auth.token || auth.user) {
            navigation.navigate('Main');
        } else {
            console.log(auth.error);
            return;
            
        }
       

    }
    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <Input autoCapitalize="none" onChangeText={setEmail} style={styles.email} value={email} label="Email" placeholder="Email" />
                <Input secureTextEntry onChangeText={setPassword} label="Password" value={password} style={styles.password} placeholder="Password" />
                <View style={styles.btn}>
                <Button onPress={loginHandler} title="Login" color="blue" />
            </View>
            </View>
            
        </View>
    )
}

LoginScreen.navigationOptions = () => {
    return {
        headerTitle: "Login"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form : {
        padding: 15,
        width: '80%',
        maxWidth: 400,
        marginBottom: 250,
        margin: 20
        
    },
    email: {
        padding: 20,
        marginBottom: 20
    },
    password: {
        padding: 20,
        marginTop: 30
    },
    btn: {
        marginTop: 20
    }
})

export default LoginScreen;
