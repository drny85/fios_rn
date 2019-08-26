import React from 'react';
import moment from 'moment'
import { View, Text, StyleSheet } from 'react-native'

const Note = ({ note, date }) => {
    return (
        <View style={styles.note}>
            <Text>{note}</Text>
            <View style={styles.text}>
                <Text style={styles.mute}>{moment(date).format('MMMM Do YYYY, hh:mm:ss a')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    note: {

        shadowColor: 'black',
        padding: 10,
        elevation: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.28,
        margin: 5,
        shadowRadius: 5,
        borderRadius: 10,
        height: 'auto',

        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    mute: {
        textAlign: 'left',
        fontStyle: 'italic',
        color: 'gray',
        opacity: 0.8,
        marginTop: 20
    },
    text: {
        alignItems: 'flex-start',
        padding: 20
    }
});

export default Note
