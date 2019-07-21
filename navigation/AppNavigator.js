import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
//import StackNavigator from './StackNavigator';

//import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
    },
    {
        initialRouteName: "Login"
    }
);

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Stack: RootStack,

},
    {
        initialRouteName: "Stack"
    }));