import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { Mapbox } from "../../App";
import Api from '../Api'

console.log("STUFF");

export default class MainDashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      coordinates: {
        longitude: 0,
        latitude: 0
      }
    }
  }
  
  
  async componentDidMount() {
    const { navigate } = this.props.navigation;
  
    navigator.geolocation.getCurrentPosition(async (res) => {
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


    Mapbox.setAccessToken("pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ");

    return (
      <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[this.state.coordinates.longitude, this.state.coordinates.latitude]}
          style={{width: "100%", height: "100%"}}
          >
            <Mapbox.PointAnnotation id = 'dfjsoiefjoef' coordinate = {[this.state.coordinates.longitude, this.state.coordinates.latitude]}>
              <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#f05056"}} />
            </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    )
  }
}
