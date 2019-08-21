import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Referral = props => {
    return (
        <View style={styles.referral}>
            <View style={styles.nameView}>
                <Text style={styles.name}>Robert Melendez</Text>
            </View>
            <View style={styles.detailView}>
                <Text style={styles.address}><Text style={{ fontWeight: '600' }}>Address:</Text> 63 well Ave</Text>
                <Text style={styles.moving}><Text style={{ fontWeight: '600' }}>Moving:</Text> 06/09/2019</Text>
            </View>
            <View style={styles.info}>
                <Text><Text>Phone:</Text>347-234-5555</Text>
                <Text><Text>Email:</Text>drny85@me.com</Text>
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
    name: {
        fontSize: 24,
        fontWeight: '600'
    },
    moving: { fontSize: 16 },

    address: {
        fontSize: 16
    },
    detailView: {
        height: '30%'
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
