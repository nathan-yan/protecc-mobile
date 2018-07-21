import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { Button } from '../Component'
import QRCodeScanner from 'react-native-qrcode-scanner';
export default class ScanCode extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
      <QRCodeScanner
      onRead={(stuff)=>{console.log(stuff)}}
      topContent={
        <Text >
          Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity>
          <Text >OK. Got it!</Text>
        </TouchableOpacity>
      }
    />    
      </View>
    )
  }
}
