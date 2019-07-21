import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: '#a67a5b',
    inactiveTintColor: '#c19770',
      style: {
        backgroundColor: '#faf0dc'
      }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: MapScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarOptions: {
    activeTintColor: '#a67a5b',
    inactiveTintColor: '#c19770',
    style: {
      backgroundColor: '#faf0dc'
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-place' : 'md-locate'}
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarOptions: {
    activeTintColor: '#a67a5b',
    inactiveTintColor: '#c19770',
    style: {
      backgroundColor: '#faf0dc'
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-message' : 'md-chatboxes'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  ChatStack,
});




