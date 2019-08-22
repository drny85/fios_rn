import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

const ReferralDetails = ({navigation}) => {
    const referralId = navigation.getParam('referralId');
    const referral = useSelector(state => state.referrals.referrals.find(ref => ref._id === referralId));
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Referral Details</Text>
            <View style={styles.body}>
                <View>
                    {referral.status === 'closed' ?
                     (<><Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>MON: </Text>{referral.mon}</Text>
                     <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Due date: </Text>{referral.due_date}</Text> 
                     <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Order Date: </Text>{referral.order_date}</Text>
                     </>)
                     :
                     null
                    }
                    <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Full Name: </Text>{referral.name} {referral.last_name}</Text>
                    <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Address: </Text>{referral.address}</Text>
                    {referral.apt ? <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Apt: </Text>{referral.apt}</Text> : null}
                    <Text style={styles.spacer}><Text style={{...styles.spacer, fontWeight:'600'}}>Address: </Text>{referral.address}</Text>
                </View>
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
        padding: 15
    },
    body: {
        shadowColor: 'black',
        elevation: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.56,
        shadowRadius: 10,
        borderRadius: 10,
        height: '85%',
        maxHeight: '90%',
        fontSize: 18
    },
    spacer: {
        padding: 10,
        fontSize: 18,
        textTransform: 'capitalize'
    }
})

export default ReferralDetails
