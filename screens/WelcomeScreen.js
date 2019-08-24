import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform, ImageBackground, Dimensions } from 'react-native'
import * as refActions from '../store/actions/referrals';
import * as actionsReferee from '../store/actions/referee';
import * as actionsManager from '../store/actions/managers';
import { Button } from 'react-native-elements';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';


const WelcomeScreen = () => {

    const dispatch = useDispatch()

    const getREF = () => {
        dispatch(refActions.getReferrals());
        dispatch(actionsReferee.getReferees());
        dispatch(actionsManager.getManagers());

    }

    useEffect(() => {
        getREF();
    }, [])

    return (
        <View style={styles.screen}>
            <ImageBackground resizeMethod='auto' style={styles.img} source={{ uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }}>
                <View style={styles.textView}>
                    <Text style={styles.text}>Welcome</Text>
                </View>

            </ImageBackground>
        </View>
    )
}

WelcomeScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Welcome",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={() => navigation.toggleDrawer()} title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
        </HeaderButtons>

    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        resizeMode: "contain",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 30,
        padding: 40,
        color: 'white',
        fontWeight: '800',
        letterSpacing: 2,
        fontStyle: 'italic'

    },
    textView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default WelcomeScreen
