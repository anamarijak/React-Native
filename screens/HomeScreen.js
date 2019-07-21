import React from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
//import LoginForm from '../components/LoginForm';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            style={styles.welcomeImage}
            source={require('../assets/images/sarajevo.jpg')}
        >
        <View style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <Text style={styles.getStartedText}>Teach Me</Text>
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf0dc',
  },
  welcomeImage: {
    flex:1,
    resizeMode: 'cover'
  },
  getStartedText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d5b895',
    fontFamily: 'space-mono'
  }
});
