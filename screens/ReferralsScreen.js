import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, FlatList, Platform, StyleSheet, Dimensions, Switch } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Referral from '../components/Referral';
import { useSelector, useDispatch } from 'react-redux'
import * as refActions from '../store/actions/referrals';
import { Button, Overlay, SearchBar } from 'react-native-elements';
import Search from '../components/Search';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const ReferralsScreen = ({ navigation }) => {

    const [pending, setPending] = useState(false);
    const [closed, setClosed] = useState(false);
    const [not_sold, setNotSold] = useState(false);
    const [in_progress, setInProgress] = useState(false);
    const [nuevo, setNuevo] = useState(false);

    const alls = useSelector(state => state.referrals.referrals);
    const [referrals, setReferrals] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const resetFilter = () => {
        setClosed(false);
        setNuevo(false);
        setInProgress(false);
        setNotSold(false);
        setPending(false);
    }

    let filters = {
        nuevo,
        pending,
        closed,
        not_sold,
        in_progress
    };

    const dispatch = useDispatch();

    const [isRefreshing, setRefreshing] = useState(false);

    const callback = useCallback(async () => {

        await dispatch(refActions.getReferrals());
    }, [dispatch])

    useEffect(() => {

        setRefreshing(true);
        callback().then(res => {
            setReferrals(alls);
            setRefreshing(false);
        });
        navigation.setParams({ filterRef: () => setShowModal(prevState => prevState = !prevState) })
    }, []);

    const onSelected = id => {
        navigation.navigate('Details', { 'referralId': id });
    }
    const modalHandler = () => {
        if (filters.closed) {

            setReferrals(alls.filter(ref => ref.status === 'closed'));
        } else if (filters.pending) {

            setReferrals(alls.filter(ref => ref.status === 'pending'));
        } else if (filters.not_sold) {

            setReferrals(alls.filter(ref => ref.status === 'not sold'));
        } else if (filters.nuevo) {

            setReferrals(alls.filter(ref => ref.status === 'new'));
        } else if (filters.in_progress) {

            setReferrals(alls.filter(ref => ref.status === 'in progress'));
        }
        else {

            setReferrals(alls);
        }

        setShowModal(false);
    }

    return (
        <View>
            {/* <SearchBar autoCapitalize='none' onChange={searchHandler} autoCorrect={false} onChangeText={setSearch} value={search} placeholder="Search" lightTheme={true} /> */}
            <View>
                <Overlay
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    overlayBackgroundColor="#ede7e6"
                    height={HEIGHT - 200}
                    width={WIDTH - 80}
                    isVisible={showModal}>

                    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Button buttonStyle={{ justifyContent: 'center', marginBottom: 5, backgroundColor: '#d2d651' }} title="Clear Filters" onPress={resetFilter} />
                        <Text style={styles.text}>Filters</Text>
                        <View style={styles.textView}>
                            <Text style={styles.text}>New</Text>
                            <Switch value={nuevo} trackColor="orange" onValueChange={() => {
                                resetFilter();
                                setNuevo(true);
                            }} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Pending</Text>
                            <Switch value={pending} trackColor="orange" onValueChange={() => {
                                resetFilter();
                                setPending(true);
                            }} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Closed</Text>
                            <Switch value={closed} trackColor="orange" onValueChange={() => {
                                resetFilter();
                                setClosed(true);
                            }} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>In Progress</Text>
                            <Switch value={in_progress} trackColor="orange" onValueChange={() => {
                                resetFilter();
                                setInProgress(true);
                            }} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Not Sold</Text>
                            <Switch value={not_sold} trackColor="orange" onValueChange={() => {
                                resetFilter();
                                setNotSold(true);
                            }} />
                        </View>

                        <Button title="Okay" buttonStyle={{ paddingHorizontal: 20 }} onPress={modalHandler} />
                    </View>
                </Overlay>
            </View>
            <View>
                <Button buttonStyle={{ paddingHorizontal: 20, alignSelf: 'center', marginTop: 20, marginBottom: 10 }} title="Add Referral" onPress={() => navigation.navigate('Add')} />
            </View>
            <View>
                <FlatList
                    onRefresh={callback}
                    refreshing={isRefreshing}
                    data={referrals}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <Referral id={item._id} name={item.name} lastName={item.last_name}
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
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        width: '100%',
        alignItems: 'center'

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default ReferralsScreen;
