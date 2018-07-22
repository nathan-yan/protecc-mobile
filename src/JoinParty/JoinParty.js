import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, Animated, Keyboard, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { Button } from '../Component'

import api from '../Api'

export default class Login extends Component {
  constructor (props) {
    super(props)

    const { navigate } = this.props.navigation;
    this.navigate = navigate; 

    this.state = {
      marginTop: new Animated.Value(heightPercentageToDP(18)),
      joinPartyInput: ''
    }
  }

  createParty = async () => {
    let res = await api.createParty();
    console.log(res);
    if (res.status === 401) {    // User is not logged in
      this.navigate("Login");
    }else if (res.status === 409){   // User is already in party
      Alert.alert("You are already in a party!");
    }else if (res.status === 200){
      await this.props.screenProps.setPartyState()
      this.navigate("Main");
    }
  }
  
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    let targetHeight = heightPercentageToDP(18);

    Animated.timing(this.state.marginTop, {
      toValue: 0,
      duration: 200
    }).start()
  }
  
  _keyboardDidHide = () => {
    Animated.timing(this.state.marginTop, {
      toValue: heightPercentageToDP(18),
      duration: 200
    }).start()
  }

  onButtonPress = () => {
    if (this.state.joinPartyInput.length < 6) {
      this.navigate('JoinPartyScanCode')
    } else {
      api.joinParty(this.state.joinPartyInput).then((res) => {
        if (res.status === 200) {
          this.navigate('People')
        } else {
          Alert.alert('Party does not exist!')
        }
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
      
        <View style={{marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            party
          </Text>
          <Animated.View style = {{marginTop: this.state.marginTop}}>
            <TextInput style={{paddingLeft: 0, fontSize: 40, color: "#fff", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="party code"
              placeholderTextColor="#DDDDDD"
              maxLength={6}
              autoCapitalize='none'
              value={this.state.joinPartyInput}
              onChangeText={(joinPartyInput) => this.setState({joinPartyInput})}
            />
            <Text style = {{color: "white", fontSize: 25, fontFamily: "sofia pro regular", opacity: this.state.joinPartyInput.length===6 ? 0 : 1}}>or</Text>
            <Button text={this.state.joinPartyInput.length===6 ? "join code" : "scan code"} style={{width: widthPercentageToDP(40), marginTop: heightPercentageToDP(-3)}} onPress = {this.onButtonPress}/>
          </Animated.View>

          <Text style={{color: '#FFFFFF', fontSize: 25, fontFamily: 'sofia pro regular', marginTop: heightPercentageToDP(10)}} onPress = {() => {console.log("HELLO!");
            this.createParty()
          }}> 
            create a party
          </Text>

        </View>      
      </View>
    )
  }
}
