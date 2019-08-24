import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import moment from 'moment'


const Referral = props => {
    const { name, lastName, email, phone, moveIn, address, status, collateral, onSelected } = props

    const setColor = (status) => {
        switch (status) {
            case 'closed':

                return '#6ca33e'

                break;
            case 'pending':
                return '#adac58'

                break;
            case 'not sold':
                return '#a14335'
                break;

            default:
                break;
        }
    }
    return (
        <TouchableOpacity style={{ ...styles.referral, shadowColor: setColor(status) }} activeOpacity={0.5} onPress={onSelected}>
            <View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{name} {lastName}</Text>
                </View>
                <View style={styles.detailView}>
                    <Text style={styles.address}><Text style={styles.bold}>Address: </Text>{address}</Text>
                    <Text style={styles.moving}><Text style={styles.bold}>Moving: </Text>{moment(moveIn).format('MMMM Do YYYY')}</Text>
                </View>
                <View style={styles.info}>
                    <Text><Text style={styles.bold}>Phone: </Text>{phone}</Text>
                    <Text><Text style={styles.bold}>Email: </Text>{email}</Text>
                    <Text style={styles.bold}><Text style={{ fontWeight: '600' }}>Collateral: </Text><Text style={styles.capitalize}>{collateral ? 'Yes' : 'No'}</Text></Text>
                    <Text><Text style={styles.bold}>Status: </Text>{status}</Text>
                </View>
                <View style={styles.btnView}>
                    <Button title="View Details" buttonStyle={styles.btn} color={Colors.secondady} onPress={onSelected} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    nameView: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'

    },
    bold: {
        fontWeight: '600',
        paddingRight: 4,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 18
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    moving: { fontSize: 18 },

    address: {
        fontSize: 18,
        marginBottom: 4,
        textTransform: 'capitalize'
    },
    detailView: {

        paddingVertical: 8
    },

    sold: {
        backgroundColor: '#6ca33e'
    },
    notSold: {
        backgroundColor: '#a14335'
    },

    info: {

        justifyContent: 'space-between'

    },
    btn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 15,
        marginTop: 30,
        alignSelf: 'center'

    },
    referral: {
        width: '90%',
        maxWidth: 500,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        elevation: 5,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.56,
        shadowRadius: 18,
        borderRadius: 10,
        height: 300,
        maxHeight: 500,
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'left',
        fontSize: 20

    },

    btnView: {

        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    capitalize: {
        textTransform: 'capitalize'
    }
})

export default Referral
