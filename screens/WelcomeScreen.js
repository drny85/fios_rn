import React , {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import * as refActions from '../store/actions/referrals';
import { Button } from 'react-native-elements';

const WelcomeScreen = () => {
    const [referrals, setReferrals] = useState([]);
    const referralss = useSelector(state => state.referrals);
    console.log(referralss);
    const dispatch = useDispatch()

    const getREF = () => {
        console.log('Getting');
        dispatch(refActions.getReferrals());
    }
   
    return (
        <View style={styles.screen}>
            <Text>Welcome Screen </Text>
            <Button title="Get" onPress={getREF} />
        </View>
    )
}

WelcomeScreen.navigationOptions = () => {
    return {
        headerTitle: "Welcome"
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default WelcomeScreen
