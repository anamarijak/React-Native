import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";

//import MapView from "react-native-maps";
import { Constants, MapView, Location, Permissions } from 'expo';
//import ProfileScreen from '../navigation/StackNavigator';
//import { StackActions, NavigationActions } from 'react-navigation';


const { width, height } = Dimensions.get("window");

import api from '../utils/api';



export default class MapScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.goToProfile = this.goToProfile.bind(this);
    this.state = {
      region: {
        "latitude": 43.8486719,
        "longitude":  18.3901648,
        "latitudeDelta": 0.04864195044303443,
        "longitudeDelta": 0.040142817690068 },
      locationResult: null,
      location: {coords: { latitude: 44.015316, longitude: 18.027134 }},
      markers: []
    }
  };


  async componentDidMount() {
    this._getLocationAsync();
    this._getOtherUsersLocation();
  }

  _handleMapRegionChange = region =>{
    this.setState({region});
  };

  _getLocationAsync = async () => {
    try{
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      const { locationServicesEnabled } = await Location.getProviderStatusAsync();
      if (status !== 'granted') {
        this.setState({
          locationResult: 'Permission to access location was denied',
          location
        });
      }
      if(status === 'granted' && locationServicesEnabled){
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        this.setState({locationResult:JSON.stringify(location), location});
        this._updateUserLocation(location);
      } else throw new Error('Service not available');
    } catch (err) {
      console.log("Error: ", err.reponse ? err.response : err);
      Alert.alert('Unable to get your location, please check if your location is turned on');
    }

  };
  _updateUserLocation = async (location) => {
    try{
      const token = await AsyncStorage.getItem('token');
      api.put('/user/location',{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          { headers: { 'Authorization': `Bearer ${token}` } });
      //console.log(this.state.location)
    } catch(err) {
      console.log(err.response.data);
    }
  };
  _getOtherUsersLocation = async () => {
    try{
      const token = await AsyncStorage.getItem('token');
      const result = await api.get('/user/all',{ headers: { 'Authorization': `Bearer ${token}` }});
      this.setState({ markers: result.data.users });
      //console.log(result.data.users);
    } catch (err){
      console.log("Error map");
      console.log(err.response.status);
      console.log(err.response.data);
    }
  };
  _usersList = () => {
    this.props.navigation.navigate('UserList',{
      users: this.state.markers
    })
  };
  goToProfile = () => {
    //this.props.navigation.navigate('ProfileScreen');
    //Alert.alert("Radi");
    //this.props.navigation.navigate('ProfileStack', {}, NavigationActions.navigate({ routeName: 'ProfileScreen' }))
    this.props.navigation.navigate('Profile');
  }

  render() {
    return (
        <View style={ styles.container }>

          <MapView
              style={{alignSelf: 'stretch', height: height - 20, width}}
              initialRegion={ this.state.region }
              onRegionChange={ this._handleMapRegionChange }
              loadingEnabled = { true }
              followuserLocation={ true }
              showsMyLocationButton={ true }
              zoomEnabled={true}
          >
            { this.state.location ?
                <MapView.Marker
                    coordinate={{longitude: this.state.location.coords.longitude, latitude: this.state.location.coords.latitude }}
                    title="Me"
                    pinColor={'#d5b895'}
                /> : null
            }
            {
              this.state.markers.length>0 ?
                  this.state.markers.map( element => /*{
                      var myJSON = JSON.stringify(element.coords);
                      Alert.alert(myJSON)}*/
                      <MapView.Marker
                          key = { element.user.id }
                          coordinate={element.coords}
                          title={ element.user.username }
                          pinColor={'#a67a5b'}
                      />
                     )
                  : undefined
            }
          </MapView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },

  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});