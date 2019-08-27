import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Platform, Alert, ScrollView } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { Input, Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../constants/Colors';
import * as notesActions from '../store/actions/notes';
import Note from '../components/Note';

const NotesScreen = () => {

    const notes = useSelector(state => state.notes.notes);

    const disptach = useDispatch();
    const callback = useCallback(() => {
        disptach(notesActions.getTodayNotes());
    }, [disptach]);

    const [note, setNote] = useState('')

    useEffect(() => {
        callback()
    }, [])

    const addNote = () => {

        if (note.length < 3) {
            Alert.alert('Error', 'Please type a note', [{ text: 'Ok' }]);
            return;
        }
        disptach(notesActions.addNote(note));
        setNote('');
    }

    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <Input autoCorrect={false} multiline={true} numberOfLines={4} value={note} onChangeText={setNote} label="Note" placeholder="type a note" />
                <Button title="Add Note" onPress={addNote} buttonStyle={{ paddingHorizontal: 20, marginTop: 20, backgroundColor: Colors.primary, padding: 5 }} />
            </View>
            <ScrollView style={{ width: '90%' }}>
                {notes.map(n => {
                    return <Note key={n._id} note={n.note} date={n.created} />
                })}
            </ScrollView>
        </View>
    )
}


NotesScreen.navigationOptions = ({ navigation }) => {


    return {
        headerTitle: "Notes",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item onPress={() => navigation.toggleDrawer()} title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    form: {
        width: '90%',
        padding: 10,
        marginTop: 20
    }
})
export default NotesScreen
