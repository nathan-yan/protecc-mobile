import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'
import Api from '../Api'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showIndicator: false
    }
  }

  onPressLogin = () => {
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({
        showIndicator: true
      })
      // Api.login(this.state.email, this.state.password).then((res => {
      //   this.setState({
      //     showIndicator: false
      //   })
      //   if (res.status === 200) {
      //     this.props.navigation.navigate('JoinParty')
      //   }
      // }))
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
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            login
          </Text>
          <TextInput style={{paddingLeft: 0, marginTop: heightPercentageToDP(18), fontSize: 32, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
            underlineColorAndroid={'transparent'}
            placeholder="email"
            placeholderTextColor="#DDDDDD"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize='none'
          />
          <TextInput style={{paddingLeft: 0, fontSize: 30, color: "#DDDDDD", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
            underlineColorAndroid={'transparent'}
            placeholder="password"
            placeholderTextColor="#DDDDDD"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            secureTextEntry={true}
            autoCapitalize='none'
          />
          <Button text="login" style={{width: widthPercentageToDP(40)}} onPress={this.onPressLogin} showIndicator={this.state.showIndicator}/>
          <View style={{flexDirection: 'row', marginTop: heightPercentageToDP(3)}}>
            <TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
                sign up
              </Text>
            </TouchableOpacity>
            <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
              {' \u00b7 '}
            </Text>
            <TouchableOpacity>
              <Text style={{color: '#FFFFFF', fontFamily: 'sofia pro regular', fontSize: 20}}>
                use google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={require(imagePath)} style={{position:'absolute', width: imageWidth, height: imageHeight, alignSelf: 'flex-end', marginTop: 10}}/>
      
      </View>
    )
  }
}
