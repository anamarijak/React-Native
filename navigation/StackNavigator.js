import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
});

export default createAppContainer({
    ProfileStack,
});
