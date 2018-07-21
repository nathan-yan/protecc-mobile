import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, Animated, Keyboard } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { Button } from '../Component'

export default class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      marginTop: new Animated.Value(heightPercentageToDP(18))
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

              autoCapitalize='none'

            />
            <Text style = {{color: "white", fontSize: 25, fontFamily: "sofia pro regular"}}>or</Text>
            <Button text="scan code" style={{width: widthPercentageToDP(40), marginTop: heightPercentageToDP(-3)}}/>
          </Animated.View>

          <Text style={{color: '#FFFFFF', fontSize: 25, fontFamily: 'sofia pro regular', marginTop: heightPercentageToDP(10)}} onPress = {() => {
            this.props.navigation('CreateParty')
          }}> 
            create a party
          </Text>

        </View>      
      </View>
    )
  }
}
