import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Platform } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Referral from '../components/Referral';
import { useSelector, useDispatch } from 'react-redux'
import * as refActions from '../store/actions/referrals';

const ReferralsScreen = ({navigation}) => {

    //const referrals = useSelector(state => state.referrals.referrals);
    const referrals = useSelector(state => state.referrals.referrals);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refActions.getReferrals())
    }, []);

    const onSelected = id => {
        navigation.navigate('Details', {'referralId': id});
    }

    return (
        <View>
            <View>
                <FlatList
                    data={referrals}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <Referral name={item.name} lastName={item.last_name}
                        email={item.email}
                        phone={item.phone}
                        moveIn={item.moveIn}
                        address={item.address}
                        status={item.status}
                        onSelected={onSelected.bind(this, item._id)}
                    />}
                />
            </View>
        </View>
    )
}

ReferralsScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Referrals",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={() => navigation.toggleDrawer()} title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
        </HeaderButtons>

    }
}

export default ReferralsScreen
