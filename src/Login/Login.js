import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

//TODO: Add sofia pro FOR TEXT

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    const imagePath = '../../assets/images/chicken.png'
    const imageRatio = 0.40
    const imageWidth = widthPercentageToDP(imageRatio)
    const imageHeight = imageWidth * 564.0 / 307.0

    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
        <View style={{position:'absolute', marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 30, fontFamily: 'sofia pro regular'}}> 
            {imageWidth}'\n'{imageHeight}
          </Text>
          <TextInput style={{marginTop: heightPercentageToDP(18), fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70)}}
            underlineColorAndroid={'transparent'}
            placeholder="email"
            placeholderTextColor="#DDDDDD"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize='none'
          />
          <TextInput style={{marginTop: heightPercentageToDP(3), fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70)}}
            underlineColorAndroid={'transparent'}
            placeholder="password"
            placeholderTextColor="#DDDDDD"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
            autoCapitalize='none'
          />
        </View>
        <Image source={require(imagePath)} style={{position:'absolute', width: 1.333, height: 2.45, alignSelf: 'flex-end', marginTop: 10}}/>

      </View>
    )
  }
}
