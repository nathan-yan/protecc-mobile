import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Cookie from 'react-native-cookies';

import Mapbox from '@mapbox/react-native-mapbox-gl';
import Api from '../Api'
import Menu from './Menu'

Mapbox.setAccessToken("pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ");

export default class MainDashboard extends Component {
  constructor(props){
    super(props)
    
    const headcount = this.props.navigation.getParam('headcount', false);
    
    this.state = {
      coordinates: {
        longitude: 0,
        latitude: 0,
        initLongitude: null, 
        initLatitude: null
      },
      showingMenu: false ^ headcount,
      headcount: headcount
    }

    this.mapRef; 

  }

  initiateHeadCount = () => {
    this.setState({
      showingMenu: false,
      headcount: true
    })
  }

  updateLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: this.state.coordinates.initLongitude,
          initLatitude: this.state.coordinates.initLatitude,
        }
      })
    });
  }

  updateLocationSetInit = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);



      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: longitude,
          initLatitude: latitude
        }
      });
    });
  }

  goToLocation = () => {
    this.mapRef.setCamera({
      centerCoordinate: [this.state.coordinates.longitude, this.state.coordinates.latitude],
    });
  }
  
  renderAnnotations = () => {
    let partyData = this.props.screenProps.partyData;
    let annotations = partyData.members.map((member, i) => {
      // TODO: add this.state.coordinates.longitude, this.state.coordinates.latitude for your own location

      if (!member.location) return;
      return <Mapbox.PointAnnotation anchor = {{x:0.0, y:1}} id = {"member-" + i} coordinate = {[member.location.lon, member.location.lat]} key = {"member-" + i}>
      <View style = {{justifyContent: "center"}}>
        <View style = {{borderRadius: 5, padding: 10, paddingTop: 1, paddingBottom: 5, marginBottom: 2, backgroundColor: "#f05056"}}>
          <Text style = {{fontFamily: "sofia pro regular", color: "white", fontSize: 20}}>{member.name}
          </Text>
        </View>
        
        <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#f05056"}} />
      </View>
      </Mapbox.PointAnnotation>
    })

    return annotations

  }

  async componentDidMount() {
    setInterval(this.updateLocation, 5000);
    const { navigate } = this.props.navigation;
  
    this.updateLocationSetInit();

    navigator.geolocation.watchPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;
      Alert.alert("UPDATED LOCATION!");

      let res_ = await Api.updateLocation(latitude, longitude);

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: this.state.coordinates.initLongitude,
          initLatitude: this.state.coordinates.initLatitude,
        }
      })
    }, {
      enableHighAccuracy: true,
      distanceFilter: 5
    });


  }

  showMenu = () => {
    this.setState({
      showingMenu: true
    })
  }

  hideMenu = () => {
      this.setState({
        showingMenu: false
      })
    

    /*{ mocked: false,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:   timestamp: 1532220403446,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:   coords:
07-21 17:54:25.666 16762 21684 I ReactNativeJS:    { speed: 0,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:      heading: 0,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:      accuracy: 21.452999114990234,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:      longitude: -122.3359941,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:      altitude: 24,
07-21 17:54:25.666 16762 21684 I ReactNativeJS:      latitude: 47.6064186 } }*/
    
  }

  render() {
    let partyData = this.props.screenProps.partyData;
    
    console.log(this.state.coordinates)
    return (
      
      <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
         <Icon name="menu" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {this.showMenu()}}/>

        <TouchableOpacity style = {{position: "absolute", top: 100, left: 30, borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center",  backgroundColor: "#fffb", zIndex: 1000}} onPress = {() => {
          this.goToLocation()
        }}>
            <Icon name="my-location" size={30} color= "#555" />
        </TouchableOpacity>
      

        <Mapbox.MapView
            ref = {(map) => this.mapRef = map}
            styleURL={Mapbox.StyleURL.Light}
            zoomLevel={15}
            centerCoordinate={[this.state.coordinates.initLongitude || 0, this.state.coordinates.initLatitude || 0]}
            style={{width: "100%", height: "100%"}}
            >
              {this.renderAnnotations()}            
           </Mapbox.MapView>
        { this.state.showingMenu && 
         
          <Menu hideMenuCallback = {this.hideMenu} navigator = {this.props.navigation} initiateHeadCount = {this.initiateHeadCount}/>
        }
      </View>
    )
  }
}
