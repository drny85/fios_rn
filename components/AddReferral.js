import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Input, Button } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";

const AddReferral = () => {

    const [moveIn, setMoveIn] = useState('');
    const [showDate, setShowDate] = useState(false);

    const handleDatePicked = date => {
        setMoveIn(date);
    }

    const hideDateTimePicker = () => {
        setShowDate(prevState => prevState = !prevState);
    }
    return (
        <View style={styles.screen}>
            <View>
                <Input label="Name" placeholder="name" />
                <Input label="Last Name" placeholder="last name" />
                <Input label="Address" placeholder="address" />
                <Input label="Apt" placeholder="apt, suite, unit" />
                <Input label="Zip Code" placeholder="zip code" />
                <Input label="City" placeholder="city" />
                <Input label="Phone" placeholder="phone" />
                <Input label="Email" placeholder="email" />
                <Input label="Account manager" placeholder="manager" />
                <Input value={moveIn} onChangeText={setMoveIn} label="Moving Date" onFocus={hideDateTimePicker} placeholder="moving date" />
                <DateTimePicker mode="date"
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                    isVisible={showDate} />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

AddReferral.navigationOptions = () => {
    return {
        headerTitle: 'Add Referral'
    }
}

export default AddReferral
