import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import Api from '../Api'

import { partyDataContext, splashReauthenticateStatus } from "../../App"

export default class Splash extends Component {
  async componentDidMount() {
    /*
    const { navigate } = this.props.navigation;

    var checker = setInterval(() => {
      if (splashReauthenticateStatus){
        console.log(splashReauthenticateStatus)
      if (splashReauthenticateStatus === 401){
        navigate('Login')
        clearInterval(checker);
      }else if (splashReauthenticateStatus === 201){
        if (partyDataContext){
          navigate("Main");
          clearInterval(checker);
        }
      }else if (splashReauthenticateStatus === 200){
        navigate("JoinParty")
        clearInterval(checker);
      }else {
        clearInterval(checker);
      }
    }
    }, 100)*/

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
