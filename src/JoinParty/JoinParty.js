import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { Button } from '../Component'

export default class Login extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
      
        <View style={{position:'absolute', marginLeft: widthPercentageToDP(16), marginTop: heightPercentageToDP(13)}}>
          <Text style={{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular'}}> 
            party
          </Text>
          <TextInput style={{paddingLeft: 0, marginTop: heightPercentageToDP(18), fontSize: 40, color: "#fff", width: widthPercentageToDP(70), fontFamily: 'sofia pro regular'}}
            underlineColorAndroid={'transparent'}
            placeholder="party code"
            placeholderTextColor="#DDDDDD"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize='none'
          />
          <Text style = {{color: "white", fontSize: 25, fontFamily: "sofia pro regular"}}>or</Text>
          <Button text="scan code" style={{width: widthPercentageToDP(40), marginTop: heightPercentageToDP(4)}}/>

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
