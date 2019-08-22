import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Referral = props => {
    const { name, lastName, email, phone, moveIn, address } = props
    return (
        <View style={styles.referral}>
            <View style={styles.nameView}>
                <Text style={styles.name}>{name} {lastName}</Text>
            </View>
            <View style={styles.detailView}>
                <Text style={styles.address}><Text style={styles.bold}>Address:</Text>{address}</Text>
                <Text style={styles.moving}><Text style={styles.bold}>Moving:</Text>{moveIn}</Text>
            </View>
            <View style={styles.info}>
                <Text><Text style={styles.bold}>Phone:</Text>{phone}</Text>
                <Text><Text style={styles.bold}>Email:</Text>{email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nameView: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
    bold: {
        fontWeight: '600',
        paddingRight: 4
    },
    name: {
        fontSize: 24,
        fontWeight: '600'
    },
    moving: { fontSize: 16 },

    address: {
        fontSize: 16,
        marginBottom: 4
    },
    detailView: {
        height: '35%',
        paddingVertical: 8
    },

    info: {
        height: '30%',
        justifyContent: 'space-between'
    },
    referral: {
        width: '90%',
        maxWidth: 500,
        padding: 20,
        margin: 10,
        shadowColor: 'black',
        elevation: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        borderRadius: 10,
        height: 200,
        maxHeight: 300,
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left'
    }
})

export default Referral
