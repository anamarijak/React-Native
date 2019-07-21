import React, { Component } from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import RegisterForm from '../components/RegisterForm';
//import style from './Styles/RegisterScreenStyle';

export default class RegisterScreen extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        title: 'Register',
        headerStyle:{ backgroundColor: '#faf0dc' },
        headerTintColor: '#c19770',
        headerTitleStyle: { fontWeight: 'bold' }
    };
    render() {
        return (

            <KeyboardAvoidingView
                style={ style.container}
                behavior={ 'padding' }
                enabled
            >
                <RegisterForm
                    navigation={this.props.navigation}
                />
            </KeyboardAvoidingView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf0dc',
        justifyContent: 'center',
        alignItems: 'center'
    },

})