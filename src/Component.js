import React, { Component } from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from './scaling'

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

export {
  Button
}