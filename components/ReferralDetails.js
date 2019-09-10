import React from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Alert, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'react-native-elements'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import moment from 'moment';
import * as actionsReferral from '../store/actions/referrals';
import axios from '../api/authInstance';
import newLinking from 'expo/build/Linking/Linking';


const ReferralDetails = ({ navigation }) => {
    const referralId = navigation.getParam('referralId');
    const referralState = useSelector(state => state.referrals);
    const { error, referrals } = referralState;
    const referral = referrals.find(ref => ref._id === referralId);

    const dispatch = useDispatch();

    const sendEmail = () => {
        const body = {
            referral,
            email: referral.email
        }

        Alert.alert('Send Email', `You are about to send an email to ${referral.email}`, [{text: 'Send', onPress: () => {
            if (body.email) {
                axios.post('/email/collateral', body);
                dispatch(actionsReferral.getReferrals());
            } else {
                return;
            }
        }}, {text: 'Cancel', style: 'cancel'}])

        
        
    }

    const makeCall = () => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${referral.phone}`
        } else {
            phoneNumber = `telprompt:${referral.phone}`;
        }

        Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Sorry, can not make this call', 'Not phone call supported', [{text: 'Ok'}])
            } else {
                return Linking.openURL(phoneNumber)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }


    const deleteReferral = async id => {
        try {

            const res = await dispatch(actionsReferral.deleteReferral(id));

            if (res) {
                Alert.alert('Deleted', 'Referral has been deleted', [{ text: 'OK' }]);
                await dispatch(actionsReferral.getReferrals());
                navigation.navigate('Referrals');
            }

        } catch (error) {
            Alert.alert('Error', 'error', [{ text: 'OK' }])
            console.log('LL', error);
        }

    }

    if (!referral) return <ActivityIndicator size='large' />;

    return (
        <View style={styles.screen}>
            <View style={styles.body}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ ...styles.spacer, ...styles.capitalize, fontWeight: '600', fontSize: 24, textAlign: 'center' }}>{referral.name} {referral.last_name}</Text>
                        <TouchableOpacity onPress={() => deleteReferral(referralId)}>
                            <Icon iconStyle={{ marginRight: 10 }} name="ios-trash" type="ionicon" color="red" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Address: </Text><Text style={styles.capitalize}>{referral.address}</Text></Text>
                    {referral.status === 'closed' ?
                        (<><Text style={{ ...styles.spacer, textTransform: 'uppercase' }}><Text style={{ ...styles.spacer, fontWeight: '600' }}>MON: </Text>{referral.mon}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Due date: </Text>{moment(referral.due_date).format('MMMM Do YYYY')}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Order Date: </Text>{moment(referral.order_date).format('MMMM Do YYYY')}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Package: </Text>{referral.package}</Text>
                        </>)
                        :
                        null
                    }

                    {referral.apt ? <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Apt: </Text><Text style={styles.capitalize}>{referral.apt}</Text></Text> : null}
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>City: </Text>{referral.city}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Phone: </Text></Text>
                    <TouchableOpacity onPress={makeCall}>
                        <Text style={styles.spacer}>{referral.phone}</Text>
                    </TouchableOpacity>
                    </View>
                    
                    {referral.email ? <><Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Email: </Text><Text>{referral.email}</Text></Text></> : null}
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Move In: </Text>{new Date(referral.moveIn).toDateString()}</Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Referral By: </Text><Text style={styles.capitalize}>{referral.referralBy.name} {referral.referralBy.last_name}</Text></Text>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Collateral: </Text><Text style={styles.capitalize}>{referral.collateral_sent ? 'Yes' : 'No'}</Text></Text>
                    {!referral.collateral_sent ? 
                    <TouchableOpacity style={{marginRight: 10, borderWidth: 1 , padding: 5, borderRadius: 10, paddingHorizontal: 10, backgroundColor: '#c6c9cf', borderColor: '#c6c9cf'}} onPress={sendEmail}>
                            <Text>Send Collateral</Text>
                        </TouchableOpacity> : null
                    }
                    </View>
                    
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Status: </Text><Text style={{ textTransform: 'capitalize' }}>{referral.status}</Text></Text>
                </View>
                <ScrollView style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Comments or Notes</Text>
                    <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{referral.comment}</Text>
                </ScrollView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 5
    },

    body: {
        shadowColor: 'black',
        elevation: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.56,
        shadowRadius: 10,
        borderRadius: 10,
        height: '95%',
        maxHeight: '95%',
        fontSize: 18,
        marginHorizontal: 10
    },
    spacer: {
        padding: 10,
        fontSize: 18
    },
    capitalize: {
        textTransform: 'capitalize'
    }
})

ReferralDetails.navigationOptions = (props) => {
    const { navigation } = props;
    const refId = navigation.getParam('referralId');
    const deleteRef = navigation.getParam('deleteRef')
    return {
        headerTitle: 'Referral Details',
        headerRight:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item onPress={() => { }} title="Edit" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
            </HeaderButtons>

    }
}

export default ReferralDetails
