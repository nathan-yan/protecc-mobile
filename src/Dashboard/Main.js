import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import Mapbox from "@mapbox/react-native-mapbox-gl";
import Api from '../Api'

Mapbox.setAccessToken(process.env.PROTECC_MAPBOX);

export default class Splash extends Component {
  async componentDidMount() {
    const { navigate } = this.props.navigation;
  
    // Check if user is in a group
    // If user isn't in a group, go to login page
    // Otherwise, go to dashboard

    let res = await Api.reauthenticate();

    if (res.status === 401){    // No account associated with session
      navigate('Login')
    }else if (res.status === 201){  // Logged in and has a party
      navigate('Dashboard')
    }else if (res.status === 200) {   // Logged in and does not have a party
      navigate('CreateParty')
    }
  }

  render() {
    const imagePath = '../../assets/images/chicken_covering_nose.png'
    const imageRatio = 40 //in percentage
    const imageWidth = widthPercentageToDP(imageRatio)
    const imageHeight = Math.round(imageWidth * 564.0 / 307.0)

    return (
      <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.770]}
          style={{flex: 1}}
          userTrackingMode={Mapbox.UserTrackingModes.FollowWithHeading}
          >
        </Mapbox.MapView>
      </View>
    )
  }
}
