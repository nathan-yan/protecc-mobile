import React, { Component } from 'react';
import { View, StyleSheet, Animated, Image, Text, TextInput, TouchableOpacity, TouchableHighlight,TouchableWithoutFeedback, Alert, FlatList } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'

import { setPartyStateDirectly, getPartyState, getUserState } from '../../App'

export default class Summary extends Component {
  getFlatListData = () => {
    var { near, far } = this.props
    var members = getPartyState().members

    var nearArray = []
    var farArray = []

    var obj = {}
    for (var i = 0; i < members.length; i++) {
      obj[members[i]._id] = members[i]
    }

    for (var i = 0; i < near.length; i++) {
      if (obj[near[i]]) {
        nearArray.push(obj[near[i]])
        delete obj[near[i]]
      }
    }
    for (var i = 0; i < far.length; i++) {
      if (obj[far[i]]) {
        farArray.push(obj[near[i]])
        delete obj[far[i]]
      }
    }
    //obj contains missing members
    var data = ['missing']
    for (var key in obj) {
      data.push(obj[key])
    }
    data.push('far')
    data.push(...farArray)
    data.push('near')
    data.push(...nearArray)
    return data
  }
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={{backgroundColor: '#FFFFFF', height: heightPercentageToDP(80), width: widthPercentageToDP(80), borderRadius: 8}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <Text style={{color: '#000000', fontSize: 28, fontFamily: 'sofia pro regular'}}>
              Summary
            </Text>
          </View>
          <FlatList
            style={{marginLeft: widthPercentageToDP(10)}}
            data={this.getFlatListData()}
            renderItem={({item}) => <SummaryItem data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity>

          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class SummaryItem extends Component {
  render() {
    if (this.props.data.name) {
      const imageWidth = widthPercentageToDP(12)
      return(
        <View flexDirection="row" justifyContent="flex-start" alignItems="center" marginTop={8} marginBottom={8} width={widthPercentageToDP(80)}>
          <Image source={{uri: this.props.data.profilePicture}} style={{width: imageWidth, height: imageWidth, borderRadius: imageWidth/2}}/>
          <View>
            <Text style={{color: getUserState()._id === this.props.data._id ? '#527AFF' : '#000000', fontSize: 16, fontFamily: 'sofia pro regular'}}>
              {getUserState()._id === this.props.data._id ? "   " + this.props.data.name + " (you)" : "   " + this.props.data.name}
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={{color: '#828282', fontSize: 16, fontFamily: 'sofia pro regular', marginTop: 20}}>
            {this.props.data}
          </Text>
        </View>
      )
    }
  }
}