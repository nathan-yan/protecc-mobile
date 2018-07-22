import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Animated, Keyboard, TouchableHighlight, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'
import Api from '../Api'
import ImagePicker from 'react-native-image-picker';
import base64Img from 'base64-img'

const duration = 200

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      avatarSource: '',
      showIndicator: false,
      keyboardHeight: new Animated.Value(0)
    }
  }

  onPressGetStarted = () => {
    if (this.state.name !== '' && this.state.email !== '' && this.state.phone !== '' && this.state.password !== '') {
      this.setState({
        showIndicator: true
      })

      Api.createUser(this.state.name, this.state.email, this.state.password, this.state.avatarSource).then((res) => {
        
      })
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    this.getDefaultAvatarPicture().then((data) => {
      this.setState({avatarSource: data})
    })
  }

  getDefaultAvatarPicture = async () => {
    var data = base64Img.base64Sync('../../assets/images/happychicken.png');
    return data
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

  onAvatarPress = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200
    }
    ImagePicker.showImagePicker(options, (response) => {   
      if (response.didCancel) {
      
      }
      else if (response.error) {

      }
      else if (response.customButton) {

      }
      else {    
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source
        })
      }
    });
  }

  render() {

    return(
      <Animated.View style={{flex: 1, backgroundColor: '#527AFF', marginTop: this.state.keyboardHeight }}>
        <View style={{flex: 1, marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            sign up
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center', marginRight: widthPercentageToDP(16), marginTop: heightPercentageToDP(3), marginBottom: heightPercentageToDP(3)}}>  
            <TouchableHighlight underlayColor="#2980b9" style={{width: widthPercentageToDP(33), height: widthPercentageToDP(33), borderRadius: widthPercentageToDP(33)/2}} onPress={this.onAvatarPress}>
              <Image source={this.state.avatarSource} style={{width: widthPercentageToDP(33), height: widthPercentageToDP(33), borderRadius: widthPercentageToDP(33)/2}}/>
            </TouchableHighlight>
            <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular'}}>
              tap to change
            </Text>
          </View>
          <View style={{flex:1}}>
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