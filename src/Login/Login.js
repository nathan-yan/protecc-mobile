import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Animated, Keyboard  } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'
import Api from '../Api'

const duration = 200 //animation duration

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showIndicator: false,
      keyboardHeight: new Animated.Value(heightPercentageToDP(18)),
      imageWidth: new Animated.Value(widthPercentageToDP(40)),
      imageHeight: new Animated.Value(this.getChickenImageHeight(40))
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
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(this.state.imageWidth, {
        duration: duration,
        toValue: widthPercentageToDP(20),
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: this.getChickenImageHeight(20),
      })
    ]).start()
  }

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.state.keyboardHeight, {
        duration: duration,
        toValue: heightPercentageToDP(18),
      }),
      Animated.timing(this.state.imageWidth, {
        duration: duration,
        toValue: widthPercentageToDP(40),
      }),
      Animated.timing(this.state.imageHeight, {
        duration: duration,
        toValue: this.getChickenImageHeight(40),
      })
    ]).start()
  }

  onPressLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({
        showIndicator: true
      })
      Api.createUser(this.state.email, this.state.phone, this.state.password).then((res => {
        this.setState({
          showIndicator: false
        })
        if (res.status === 200) {
          this.props.navigation.navigate('JoinParty')
        }
      }))
    }
  }

  getChickenImageHeight = (widthPercentage) => {
    var width = widthPercentageToDP(widthPercentage)
    var height = Math.round(width * 564.0 / 307.0)

    return height
  }

  render() {
    const imagePath = '../../assets/images/chicken.png'
  
    return (
      <View style={{flex: 1, backgroundColor: '#527AFF' }}>
        <View style={{flex: 1, marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            login
          </Text>
          <Animated.View style={{flex:1, marginTop: this.state.keyboardHeight }}>
            <TextInput style={{paddingLeft: 0, fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
              underlineColorAndroid={'transparent'}
              placeholder="email"
              placeholderTextColor="#DDDDDD"
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
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
            <Button text="login" style={{width: widthPercentageToDP(40)}} onPress={this.onPressLogin} showIndicator={this.state.showIndicator}/>
            <View style={{flexDirection: 'row', marginTop: heightPercentageToDP(3)}}>
              <TouchableOpacity disabled={this.state.showIndicator} onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
                  sign up
                </Text>
              </TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
                {' \u00b7 '}
              </Text>
              <TouchableOpacity disabled={this.state.showIndicator}>
                <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
                  use google
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <Animated.Image source={require(imagePath)} style={{position:'absolute', alignSelf: 'flex-end', marginTop: 10, width: this.state.imageWidth, height: this.state.imageHeight}}/>
      </View>
    )
  }
}