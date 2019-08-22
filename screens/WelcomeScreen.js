import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native'
import * as refActions from '../store/actions/referrals';
import { Button } from 'react-native-elements';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Referral from '../components/Referral';

const WelcomeScreen = () => {
    const [referrals, setReferrals] = useState([]);
    const referralss = useSelector(state => state.referrals);
    const dispatch = useDispatch()

    const getREF = () => {
        dispatch(refActions.getReferrals());
    }

    useEffect(() => {
        getREF();
    }, [])

    return (
        <View style={styles.screen}>
            <Referral />
            <Button title="Get" onPress={getREF} />
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
    }
})

export default WelcomeScreen
