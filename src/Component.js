import React, { Component } from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from './scaling'

import QRCodeScanner from 'react-native-qrcode-scanner'
class Button extends Component {
  render() {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: heightPercentageToDP(6)}}>
        <TouchableOpacity style={{paddingTop: 6, paddingBottom: 8, justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: 6, ...this.props.style}} activeOpacity={0.5} onPress={this.props.onPress}>
          <Text style={{color: '#527AFF', fontFamily: 'sofia pro regular', textAlign: 'center', width: '100%', fontSize: 20}}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
        {
          this.props.showIndicator &&
          <ActivityIndicator size="large" color="#FFFFFF" style={{marginLeft: widthPercentageToDP(4)}}/>
        }
      </View>
    )
  }
}

export default class QRScanner extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#527AFF'}}>
      <QRCodeScanner
      onRead={this.props.onReadCallback}  topViewStyle = {{height: 0}} bottomViewStyle = {{height: 0}} containerStyle = {{padding:0, margin: 0, height: "100%"}}cameraStyle = {{height: "100%"}}/>    
      </View>
    )
  }
}

export {
  Button,
  QRScanner
}