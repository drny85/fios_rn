import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Colors.secondady} />
    )
}

export default CustomHeaderButton;
