import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const Search = () => {
    return (
        <View style={styles.view}>
            <TextInput style={styles.input} placeholder="Search" />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        maxHeight: 100,
        height: 90,
        width: '100%',
        padding: 10
    },
    input: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        margin: 5
    }
})

export default Search
