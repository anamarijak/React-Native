import React, { Component } from 'react';
import {ScrollView, View, TextInput, Text, Alert, AsyncStorage, StyleSheet, Dimensions} from 'react-native';
import RegisterButton from './RegisterButton'
import api from '../utils/api';
const window = Dimensions.get('window');


export default class RegisterForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            username: '' ,
            email:'',
            password: ''
        }
    }
    userRegister(){
        const username = this.state.username.trim(),
            password = this.state.password.trim(),
            email = this.state.email.trim();

        if(!username || !password || !email)
            Alert.alert('Invalid input',`All fields are required! `);
        else{
            api.post('/register',{
                username,
                password,
                email
            }).then(response => {
                console.log(response.data);
                this.props.navigation.navigate('Login');
            }).catch( err => console.log(err))
        }
    }
    render(){
        return(
            <ScrollView>
                <View style={ style.container }>
                    <Text h3
                          style={ style.heading }
                    >
                        Register
                    </Text>
                    <TextInput
                        style={ style.input }
                        name='username'
                        autoCorrect= { false }
                        placeholder='Username'
                        autoCapitalize='none'
                        returnKeyType='next'
                        onChangeText={(username) => this.setState({ username }) }
                    >
                    </TextInput>
                    <TextInput
                        style={ style.input }
                        name='email'
                        autoCorrect= { false }
                        placeholder='Email'
                        autoCapitalize='none'
                        returnKeyType='next'
                        onChangeText={(email) => this.setState({ email }) }
                    >
                    </TextInput>
                    <TextInput
                        style={ style.input }
                        name='password'
                        autoCorrect= { false }
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        returnKeyType='send'
                        onChange={(password) => this.setState({ password: password.nativeEvent.text }) }
                    >
                    </TextInput>
                    <RegisterButton
                        userRegister = { this.userRegister.bind(this) }
                    />
                </View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    container : {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#faf0dc',
        marginBottom: 20,
        height: 50,
        width: window.width - 60,
        color: '#a67a5b'
    },
    heading:{
        color: '#faf0dc',
        fontSize: 24,
        width: window.width - 60,
        borderBottomWidth: 3,
        borderBottomColor: '#a67a5b',
        marginBottom: 15,
        paddingBottom: 20,
        textAlign: 'center'
    },
});