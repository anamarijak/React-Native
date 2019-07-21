import React, { Component } from 'react';
import {KeyboardAvoidingView, Button, ScrollView, View, StyleSheet, Text} from 'react-native';

import LoginForm from '../components/LoginForm';
//import style from './Styles/LoginScreenStyle';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        title: 'Login',
        headerStyle:{ backgroundColor: '#faf0dc' },
        headerTintColor: '#a67a5b',
        headerTitleStyle: { fontWeight: 'bold' }
    };
    render() {
        return (
            <KeyboardAvoidingView
                style={ style.container }
                behavior='padding'
            >
                <ScrollView >
                    <View style={ style.container }>
                        <LoginForm navigation={this.props.navigation} />
                        <View style={style.inside}>
                            <Text style={{fontSize: 10, color: '#a67a5b', paddingBottom: 10}}>If you don't have an account, be free to register.</Text>
                        <Button
                            color='#a67a5b'
                            title={ 'Register' }
                            onPress={() => this.props.navigation.navigate('Register')} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf0dc',
    },
    inside: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'

    }
});