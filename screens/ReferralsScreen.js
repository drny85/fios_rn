import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Platform, StyleSheet, Modal } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Referral from '../components/Referral';
import { useSelector, useDispatch } from 'react-redux'
import * as refActions from '../store/actions/referrals';
import { Button } from 'react-native-elements';

const ReferralsScreen = ({ navigation }) => {
    //
    //const referrals = useSelector(state => state.referrals.referrals);
    const referrals = useSelector(state => state.referrals.referrals.filter(ref => ref.status === 'new'));
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const filterHandler = useCallback(() => {
        console.log('Filter');
    }, [])

    useEffect(() => {
        dispatch(refActions.getReferrals());
        navigation.setParams({ filterRef: () => setShowModal(prevState => prevState = !prevState) })
    }, []);

    const onSelected = id => {
        navigation.navigate('Details', { 'referralId': id });
    }

    return (
        <View>
            <View>
                <Button buttonStyle={{ paddingHorizontal: 20, alignSelf: 'center', marginTop: 20, marginBottom: 10 }} title="Add Referral" onPress={() => navigation.navigate('Add')} />
            </View>
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
                        collateral={item.collateral_sent}
                        onSelected={onSelected.bind(this, item._id)}
                    />}
                />
            </View>

        </View>
    )
}

ReferralsScreen.navigationOptions = ({ navigation }) => {
    const filter = navigation.getParam('filterRef');

    return {
        headerTitle: "Referrals",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={() => navigation.toggleDrawer()} title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={filter} title="Filter" iconName={Platform.OS === 'android' ? 'md-funnel' : 'ios-funnel'} />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ReferralsScreen;
