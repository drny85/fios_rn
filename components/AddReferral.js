import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsReferees from '../store/actions/referee';
import moment from 'moment'

const AddReferral = () => {

    let allReferees = [];
    const referees = useSelector(state => state.referee.referees.map(ref => {
        return {
            label: ref.name + ' ' + ref.last_name, value: ref._id, key: ref._id
        }

    }));


    const [moveIn, setMoveIn] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [manager, setManager] = useState('');
    const [referralBy, setReferralBy] = useState('')
    const [status, setStatus] = useState('');

    const dispatch = useDispatch();

    const handleDatePicked = date => {
        setShowDate(false);
        setMoveIn(moment(date).format('MMMM Do YYYY'));

    }

    const hideDateTimePicker = () => {
        setShowDate(prevState => prevState = !prevState);
    }
    return (
        <View style={styles.screen}>
            <ScrollView style={{ marginTop: 20 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={styles.row}>
                        <Input label="Name" placeholder="name" />
                    </View>
                    <View style={styles.row}>
                        <Input label="Last Name" placeholder="last name" />
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={styles.row}>
                        <   Input label="Address" placeholder="address" />
                    </View>
                    <View style={styles.row}>
                        <Input label="Apt" placeholder="apt, suite, unit" />
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View style={styles.row}>
                        <Input keyboardType='numeric' label="Zip Code" placeholder="zip code" />
                    </View>
                    <View style={styles.row}>
                        <Input label="City" placeholder="city" />
                    </View>
                </View>
                <Input keyboardType='phone-pad' label="Phone" placeholder="phone" />
                <Input keyboardType='email-address' label="Email" placeholder="email" />
                {/* <Input label="Account manager" placeholder="manager" /> */}
                <Text style={{ padding: 3, marginLeft: 8, color: 'grey', fontWeight: '900' }}>Account manager</Text>
                <RNPickerSelect onValueChange={(value) => setManager(value)}
                    items={[{ label: 'Rodney', value: 'Rodney' }]}
                    itemKey={'1'}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'account mananger', value: null, color: 'black' }}
                />
                <Input value={moveIn} onChangeText={setMoveIn} label="Moving Date" onFocus={hideDateTimePicker} placeholder="moving date" />
                <DateTimePicker mode="date"
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                    isVisible={showDate} />
                <Text style={{ padding: 3, marginLeft: 8, color: 'grey', fontWeight: '900' }}>Referral By</Text>
                <RNPickerSelect onValueChange={(value) => setReferralBy(value)}
                    items={referees}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'referral by', value: null, color: 'black' }}
                />
                <Text style={{ padding: 2, marginLeft: 8, color: 'grey', fontWeight: '900' }}>Status</Text>
                <RNPickerSelect onValueChange={(value) => setStatus(value)}
                    items={[{ label: 'New', value: 'new' },
                    { label: 'Pending', value: 'pending' },
                    { label: 'closed', value: 'closed' },
                    { label: 'Not Sold', value: 'not sold' },
                    ]}
                    itemKey={'1'}
                    style={pickerSelectStyles}
                    placeholder={{ label: 'status', value: null, color: 'black' }}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%'
    },
    row: {
        width: '50%'
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '95%',
        marginHorizontal: 10,
        color: 'black',
        textTransform: 'capitalize',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: '95%',
        marginHorizontal: 10,
        textTransform: 'capitalize',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

AddReferral.navigationOptions = () => {
    return {
        headerTitle: 'Add Referral'
    }
}

export default AddReferral
