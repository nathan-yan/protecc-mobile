import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Cookie from 'react-native-cookies';

console.log(Cookie.get("https://api.protecc.us"));

import Mapbox from '@mapbox/react-native-mapbox-gl';
import Api from '../Api'

export default class MainDashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      coordinates: {
        longitude: 0,
        latitude: 0
      },
      showingMenu: false
    }

    this.mapRef; 
  }

  updateLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude
        }
      })
    });
  }

  goToLocation = () => {
    console.log("SETTING")

    this.mapRef.setCamera({
      centerCoordinate: [this.state.coordinates.longitude, this.state.coordinates.latitude],
    });
  }
  
  async componentDidMount() {
    const { navigate } = this.props.navigation;
  
    this.updateLocation();

    navigator.geolocation.watchPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      console.log(res)

      let res_ = await Api.updateLocation(latitude, longitude);
      console.log(res_)

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude
        }
      })
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
    return (
      <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
         <Icon name="menu" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {console.log("PRESSED!"); this.showMenu()}}/>

        <TouchableOpacity style = {{position: "absolute", top: 100, left: 30, borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center",  backgroundColor: "#fffb", zIndex: 1000}} onPress = {() => {
          this.goToLocation()
        }}>
            <Icon name="my-location" size={30} color= "#555" />
        </TouchableOpacity>
      
        <Mapbox.MapView
            ref = {(map) => this.mapRef = map}
            styleURL={Mapbox.StyleURL.Light}
            zoomLevel={15}
            centerCoordinate={[this.state.coordinates.longitude, this.state.coordinates.latitude]}
            style={{width: "100%", height: "100%"}}
            >
            <Mapbox.PointAnnotation anchor = {{x:0.0, y:1}} id = 'dfjsoiefjoef' coordinate = {[this.state.coordinates.longitude, this.state.coordinates.latitude]}>
              <View style = {{justifyContent: "center"}}>
                <View style = {{borderRadius: 5, padding: 10, paddingTop: 1, paddingBottom: 5, marginBottom: 2, backgroundColor: "#f05056"}}>
                  <Text style = {{fontFamily: "sofia pro regular", color: "white", fontSize: 20}}>you</Text>
                </View>
                
                <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#f05056"}} />
              </View>
              </Mapbox.PointAnnotation>
        </Mapbox.MapView>

        { this.state.showingMenu && 
         
          <View style = {{position: "absolute", width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", backgroundColor: "white", zIndex: 10000}}>
            <Icon name="close" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {console.log("PRESSED!"); this.hideMenu()}}/>

            <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
              <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "#527aff"}}>party code</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
              <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>headcount</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
              <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>people</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
              <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
              <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>settings</Text>
            </TouchableOpacity>

          </View>
        }
      </View>
    )
  }
}
