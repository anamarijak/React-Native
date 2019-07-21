import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, AsyncStorage, ActivityIndicator, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";

import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import api from '../utils/api';

export default class App extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      chatMessage: "",
      chatMessages: []
    };
    this.socket = io(api.baseURL);
    this.socket.on("newMessage",this._onReceive.bind(this));
  }


   componentDidMount() {
    this._getMessages();
    this._getUser();
    this.socket.emit('all', {chatMessage: this.state.chatMessage});

  }
  async componentWillUnmount(){
    this.socket.close();
  }
  _getMessages = async () => {
    try{
      const token = await AsyncStorage.getItem('token');
      const chatMessage  = await fetch('https://agile-refuge-69227.herokuapp.com/messages/all');
      const hehe = await chatMessage.json();
      this.setState({chatMessages: hehe.results, loading: false});
      console.log(this.chatMessages, "chat");

      const messages = chatMessages.map((message, index) => {
        return {
          _id: message._id,
          text: message.content,
          createdAt: message.createdAt,
          user: message.from
        }
      });

      this.setState({messages, user: user._id});
    } catch (e) {
      console.log('ERROR',e.response); //ovo je error
    }

    console.log(this.state);
  };
  _getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {data:{user} } = await api.get('/user/me',{ headers: { 'Authorization': `Bearer ${token}` }});
      this.setState({user, showLoader: false});
    }catch (e) {
      console.log('ERROR',e.response?e.response:e);
    }
  };
  _onReceive(chatMessages =[]) {
    this.setState((previousState) => {
      return {
        chatMessages: GiftedChat.append(previousState.chatMessages, chatMessages)
      };
    });
  }
  _onSend(chatMessages = []) {
    this.socket.emit('new_message',{chatMessages,chatMessage: this.state.chatMessage});
    this.setState((previousState) => {
      return {
        chatMessages: GiftedChat.append(previousState.chatMessages, chatMessages),
      };
    });

    //console.log(this.state.chatMessages, "ovo je too");
  }

  render() {
    return(
        this.state.showLoader ?
            <ActivityIndicator  animating = {this.state.showLoader} size={'large'} color="#ff0000" /> :
            <View style={{flex: 1}}>
              <GiftedChat
                  user={this.state.user}
                  messages = {this.state.chatMessages}
                  onSend={this._onSend.bind(this)}
                  alwaysShowSend={true}
                  isAnimated={true}
                  loadEarlier={true}
                  isLoadingEarlier={true}
              />
              {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
              <KeyboardAvoidingView />
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf0dc"
  }
});