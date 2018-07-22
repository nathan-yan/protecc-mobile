import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import Api from '../Api'

export default class Splash extends Component {
  async componentDidMount() {
    const { navigate } = this.props.navigation;
  
    // Check if user is in a group
    // If user isn't in a group, go to login page
    // Otherwise, go to dashboard

    let res = await Api.reauthenticate();
    console.log(res);
    if (res.status === 401){    // No account associated with session
      navigate('Login')
    }else if (res.status === 201){  // Logged in and has a party
      navigate('Main')
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
        <Image source = {require(imagePath)} style = {{width: 200, height: 200}} />
      </View>
    )
  }
}
