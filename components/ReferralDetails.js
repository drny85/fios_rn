import React from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import moment from 'moment'


const ReferralDetails = ({ navigation }) => {
    const referralId = navigation.getParam('referralId');
    const referral = useSelector(state => state.referrals.referrals.find(ref => ref._id === referralId));

    return (
        <View style={styles.screen}>
            <View style={styles.body}>
                <View>
                    <Text style={{ ...styles.spacer, ...styles.capitalize, fontWeight: '600', fontSize: 24, textAlign: 'center' }}>{referral.name} {referral.last_name}</Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Address: </Text><Text style={styles.capitalize}>{referral.address}</Text></Text>
                    {referral.status === 'closed' ?
                        (<><Text style={{ ...styles.spacer, textTransform: 'uppercase' }}><Text style={{ ...styles.spacer, fontWeight: '600' }}>MON: </Text>{referral.mon}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Due date: </Text>{referral.due_date}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Order Date: </Text>{moment(referral.order_date).format('MMMM Do YYYY')}</Text>
                            <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Package: </Text>{referral.package}</Text>
                        </>)
                        :
                        null
                    }

                    {referral.apt ? <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Apt: </Text><Text style={styles.capitalize}>{referral.apt}</Text></Text> : null}
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>City: </Text>{referral.city}</Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Zip Code: </Text>{referral.zipcode}</Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Phone: </Text>{referral.phone}</Text>
                    {referral.email ? <><Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Email: </Text><Text>{referral.email}</Text></Text></> : null}
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Move In: </Text>{moment(referral.moveIn).format('MMMM Do YYYY')}</Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Referral By: </Text><Text style={styles.capitalize}>{referral.referralBy.name} {referral.referralBy.last_name}</Text></Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Collateral: </Text><Text style={styles.capitalize}>{referral.collateral_sent ? 'Yes' : 'No'}</Text></Text>
                    <Text style={styles.spacer}><Text style={{ ...styles.spacer, fontWeight: '600' }}>Status: </Text>{referral.status}</Text>
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
    return {
        headerTitle: 'Referral Details',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={() => { }} title="Edit" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} />
        </HeaderButtons>
    }
}

export default ReferralDetails
