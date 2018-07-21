import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

class Button extends Component {
  render() {
    return(
      <TouchableOpacity style={{justifyContent: 'center' ,backgroundColor: '#FFFFFF', borderRadius: 6, ...this.props.style}} activeOpacity={0.5}>
        <Text style={{color: '#527AFF', fontFamily: 'sofia pro regular', textAlign: 'center', width: '100%', fontSize: 16}}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

export {
  Button
}