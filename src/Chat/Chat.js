import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { widthPercentageToDP, heightPercentageToDP } from '../scaling';

export default class Chat extends React.Component {

  onBackPressed = () => {

  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column", backgroundColor: '#FFFFFF'}}>
        <View style={{height: heightPercentageToDP(15), marginLeft: 30 + 10, marginTop: 30+10, }}>
          <Icon name="arrow-back" size={30} color="#000" onPress = {() => {this.onBackPressed()}}/>
          <Text style={{color: '#000000', fontSize: 40, fontFamily: 'sofia pro regular', top:20}}>
            Daniel Coleson
          </Text>
        </View>
        <View style={{flex: 1, width: '100%', backgroundColor: '#81ecec'}}>
          <Text>
            test
          </Text>
        </View>
        <View style={{flexDirection:"row", height: heightPercentageToDP(10), backgroundColor: '#74b9ff', justifyContent: 'center'}}>

        </View>
      </View>
    )
  }
}