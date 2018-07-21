import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'

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
    const imageRatio = 40 //in percentage
    const imageWidth = widthPercentageToDP(imageRatio)
    const imageHeight = Math.round(imageWidth * 564.0 / 307.0)

    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
        <View style={{position:'absolute', marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 30, fontFamily: 'sofia pro regular'}}> 
            login
          </Text>
          <TextInput style={{marginTop: heightPercentageToDP(18), fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
            underlineColorAndroid={'transparent'}
            placeholder="email"
            placeholderTextColor="#DDDDDD"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize='none'
          />
          <TextInput style={{fontSize: 30, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
            underlineColorAndroid={'transparent'}
            placeholder="password"
            placeholderTextColor="#DDDDDD"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <Button text="login" style={{width: widthPercentageToDP(40), height: heightPercentageToDP(4), marginTop: heightPercentageToDP(6)}}/>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity>
              <Text>
                sign up
              </Text>
            </TouchableOpacity>
            <Text>
              {'\u00b7'}
            </Text>
            <TouchableOpacity>

            </TouchableOpacity>
          </View>
        </View>
        <Image source={require(imagePath)} style={{position:'absolute', width: imageWidth, height: imageHeight, alignSelf: 'flex-end', marginTop: 10}}/>
      
      </View>
    )
  }
}
