import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Animated, Keyboard  } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'
import Api from '../Api'

const duration = 200

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      showIndicator: false,
      keyboardHeight: new Animated.Value(0)
    }
  }

  onPressGetStarted = () => {
    if (this.state.name !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.password !== '') {
      this.setState({
        showIndicator: true
      })
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    Animated.timing(this.state.keyboardHeight, {
      duration: duration,
      toValue: -250
    }).start()
  }

  _keyboardDidHide = () => {
    Animated.timing(this.state.keyboardHeight, {
      duration: duration,
      toValue: 0
    }).start()
  }

  render() {
    return(
      <Animated.View style={{flex: 1, backgroundColor: '#527AFF', marginTop: this.state.keyboardHeight }}>
        <View style={{flex: 1, marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            sign up
          </Text>
          <View style={{flex:1, marginTop: heightPercentageToDP(18) }}>
            <TextInput style={{paddingLeft: 0, fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="name"
              placeholderTextColor="#DDDDDD"
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
              autoCapitalize='none'
              editable={!this.state.showIndicator}
            />
            <TextInput style={{paddingLeft: 0, fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="email"
              placeholderTextColor="#DDDDDD"
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              autoCapitalize='none'
              editable={!this.state.showIndicator}
            />
            <TextInput style={{paddingLeft: 0, fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="phone"
              placeholderTextColor="#DDDDDD"
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
              autoCapitalize='none'
              editable={!this.state.showIndicator}
            />
            <TextInput style={{paddingLeft: 0, fontSize: 30, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="password"
              placeholderTextColor="#DDDDDD"
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
              autoCapitalize='none'
              editable={!this.state.showIndicator}
            />
            <Button text="get started" style={{width: widthPercentageToDP(40)}} onPress={this.onPressGetStarted} showIndicator={this.state.showIndicator}/>
          </View>
        </View>
      </Animated.View>
    )
  }
}