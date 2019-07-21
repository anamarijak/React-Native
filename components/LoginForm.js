import React, { Component } from 'react';
import {View, TextInput, Text, Alert, AsyncStorage, StyleSheet, Dimensions} from 'react-native';
import LoginButton from './LoginButton'

const window = Dimensions.get('window');

//import style from './Styles/LoginFormStyle';
import api from '../utils/api';

export default class LoginForm extends Component {
    constructor (props){
        super(props);
        this.state = {
            email: '' ,
            password: '',
            isLoggedIn: false
        }
    }
    userLogin(){
        const password = this.state.password.trim(),
            email = this.state.email.trim();

        if(!password || !email)
            Alert.alert('Invalid input',`Email and password can't be empty!`);
        else{
            api.post('/authenticate',{
                password,
                email
            }).then(response => {
                AsyncStorage.setItem('token', response.data.token);
                this.setState({ isLoggedIn: true });
                this.props.navigation.navigate('Home');
            }).catch(err =>{
                console.log('ERROR');
                console.log(err.response.status);
                console.log(err.response.data);
                Alert.alert(`Status: ${err.response.status} Message: ${err.response.data}`);
                this.inputEmail.clear();
                this.inputPassword.clear();
            })
        }
    }

    async _checkLoggedIn(){
        const token = await AsyncStorage.getItem('token');
        if(token){
            try{
                const { data, status } = await api.get('/authorize',{ headers: { 'Authorization': `Bearer ${token}` }});
                status === 200 ? this.props.navigation.navigate('Home')
                    : Alert.alert('Session expired, please log in');
            } catch(err){
                console.log('Error',err);
                AsyncStorage.removeItem('token');
            }
        }
    }

    async componentDidMount() {
        await this._checkLoggedIn();
    }

    render(){
        return(

            <View style={ style.container }>
                <Text h3
                      style={ style.heading }
                >
                    Login
                </Text>
                <TextInput
                    style={ style.input }
                    name='email'
                    autoCorrect= { false }
                    placeholder='Email'
                    autoCapitalize='none'
                    returnKeyType='next'
                    ref={ref => this.inputEmail = ref}
                    onSubmitEditing = { () => this.inputPassword.focus() }
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
                    ref={ref => this.inputPassword = ref}
                    onSubmitEditing = { () => this.userLogin() }
                    onChange={(password) => this.setState({ password: password.nativeEvent.text }) }
                >
                </TextInput>
                <LoginButton
                    userLogin = { this.userLogin.bind(this) }
                />
            </View>
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