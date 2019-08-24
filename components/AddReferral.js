import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Input, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import Colors from '../constants/Colors';
import * as actionsReferral from '../store/actions/referrals';

const AddReferral = () => {
    // get all referees
    const referees = useSelector(state => state.referee.referees.map(ref => {
        return {
            label: ref.name + ' ' + ref.last_name, value: ref._id, key: ref._id
        }
    }));
    // get all account managers
    const managers = useSelector(state => state.managers.managers.map(ref => {
        return {
            label: ref.name + ' ' + ref.last_name, value: ref._id, key: ref._id
        }
    }));

    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [apt, setApt] = useState('')
    const [moveIn, setMoveIn] = useState('');
    const [zipcode, setZipCode] = useState('');
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [manager, setManager] = useState('');
    const [referralBy, setReferralBy] = useState('')
    const [status, setStatus] = useState('new');

    const dispatch = useDispatch();
    const [showDate, setShowDate] = useState(false);


    const formHandler = () => {



        const referral = {
            name,
            lastName, address, email, city, moveIn, phone, status, apt, manager, referralBy, zipcode
        }
        // dispatch(actionsReferral.addReferral(referral));
    }

    const handleDatePicked = date => {
        setShowDate(false);
        setMoveIn(moment(date).format('MMMM Do YYYY'));

    }

    const hideDateTimePicker = () => {
        setShowDate(prevState => prevState = !prevState);
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={100}>
            <View style={styles.screen}>

                <ScrollView style={{ marginTop: 20 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={styles.row}>
                            <Input label="Name" onChangeText={setName} value={name} placeholder="name" />
                        </View>
                        <View style={styles.row}>
                            <Input label="Last Name" onChangeText={setLastName} value={last_name} placeholder="last name" />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={styles.row}>
                            <Input value={address} onChangeText={setAddress} label="Address" placeholder="address" />
                        </View>
                        <View style={styles.row}>
                            <Input value={apt} onChangeText={setApt} label="Apt" placeholder="apt, suite, unit" />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={styles.row}>
                            <Input value={zipcode} onChangeText={setZipCode} keyboardType='numeric' label="Zip Code" placeholder="zip code" />
                        </View>
                        <View style={styles.row}>
                            <Input value={city} onChangeText={setCity} label="City" placeholder="city" />
                        </View>
                    </View>
                    <Input keyboardType='phone-pad' onChangeText={setPhone} value={phone} label="Phone" placeholder="phone" />
                    <Input autoCapitalize='none' autoCorrect={false} keyboardType='email-address' onChangeText={setEmail} value={email} label="Email" placeholder="email" />

                    {/* <Input label="Account manager" placeholder="manager" /> */}
                    <Text style={{ padding: 3, marginLeft: 8, color: 'grey', fontWeight: '900' }}>Account manager</Text>
                    <RNPickerSelect onValueChange={(value) => setManager(value)}
                        items={managers}
                        style={pickerSelectStyles}
                        value={manager}
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
                        value={referralBy}
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
                        value={status}
                        style={pickerSelectStyles}
                        placeholder={{ label: 'status', value: null, color: 'black' }}
                    />

                    <View style={{ marginTop: 15, padding: 10 }}>
                        <Button buttonStyle={{ backgroundColor: Colors.primary }} onPress={formHandler} title="Add Referral" />
                    </View>

                </ScrollView>

            </View>
        </KeyboardAvoidingView>
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
