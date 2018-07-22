import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native'

import { QRScanner, Button } from '../Component';

import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import api from '../Api'

export default class ScanCode extends Component {
  constructor (props) {
    super(props);  
  }
  
  onRead = async (qr) => {
    const { navigate } = this.props.navigation;

    let data = qr.data; 

    console.log(data);
    let res = await api.joinParty(data);
    
    if (res.status === 401){    // User is not logged in
      navigate("Login");
    }else if (res.status === 403){    // Party is closed
      Alert.alert("This party is closed!")
    }else if (res.status === 404) {   // Party does not exist
      Alert.alert("This party does not exist!")
    }else if (res.status === 409) {   // User is already in party
      Alert.alert("You're already in a party!")
    }else if (res.status === 200) {
      navigate("Main");
    }
  }
  
  render() {
    let width = widthPercentageToDP(50)
    let height = heightPercentageToDP(50);

    let dimensions = Math.min(width, height);

    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
        <View style = {{width: "100%", height: "100%"}}> 
          <QRScanner
          onReadCallback={this.onRead} topViewStyle = {{height: 0}} bottomViewStyle = {{height: 0}}/>    
        </View>
        
        <View style = {{position: "absolute", top: 0, left: 0, backgroundColor: "#000a", height: height - 100, width: "100%", zIndex: 1000, alignItems: "center"}}>
          <Text style = {{color: '#FFFFFF', fontSize: 40, fontFamily: 'sofia pro regular', marginTop: heightPercentageToDP(10)}}>scan a code</Text>
        </View>
        
        <View style = {{position: "absolute", top: height + 100, left: 0, backgroundColor: "#000a", height: height - 30, width: "100%", zIndex: 1000}} />
        <View style = {{position: "absolute", top: height - 100, left: 0, backgroundColor: "#000a", height: 200, width: width - 100, zIndex: 1000}} />
        <View style = {{position: "absolute", top: height - 100, left: width+ 100, backgroundColor: "#000a", height: 200, width: width - 100, zIndex: 1000}} />
     
        <View style = {{position: "absolute", top: height - 100, left: width - 100, backgroundColor: "transparent", height: 200, width: 200, zIndex: 1001}} />

      </View>
    )
  }
}
