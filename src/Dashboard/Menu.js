import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Animated, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Cookie from 'react-native-cookies';

import { setPartyStateDirectly, getPartyState, getUserState } from '../../App'
import { getParty } from '../Api';
import QRCode from 'react-native-qrcode';

console.log(Cookie.get("https://api.protecc.us"));

import { Mapbox } from "../../App";
import Api from '../Api'

export default class MainDashboard extends Component {
  constructor(props){
    super(props)

    const { navigate } = this.props.navigator;
    this.navigate = navigate; 

    this.state = {
      slidingProgress: new Animated.Value(widthPercentageToDP(-100)),
      partyCodeOpacity: new Animated.Value(0)
    }

    this.isAdmin = false;
    let guardians = getPartyState().guardians
    
    for (var i = 0; i < guardians.length; i++){
      if (guardians[i]._id.toString() == getUserState()._id.toString()){
        this.isAdmin = true
      } 
    }
  }

  componentDidMount() {
    Animated.timing(this.state.slidingProgress, {
      toValue: 0,
      duration: 200
    }).start()
  }

  hideMenu = () => {
    Animated.timing(this.state.slidingProgress, {
      toValue: widthPercentageToDP(-100),
      duration: 200
    }).start()

    // Propagate the hide menu event up *after* the animation is complete
    setTimeout(this.props.hideMenuCallback, 200);
  }

  slideOut = () => {
    
  }

  onPressPartyCodeButton = () => {
    Animated.timing(this.state.partyCodeOpacity, {
      toValue: 1,
      duration: 200
    }).start()
  }

  render() {
    return <Animated.View style = {{position: "absolute", top: 0, left: this.state.slidingProgress, width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", backgroundColor: "white", zIndex: 10000}}>
    <Icon name="close" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {this.hideMenu()}}/>
    <Animated.View style={{position: 'absolute', top: 40, right: 60, backgroundColor: '#527AFF', borderRadius: 8, opacity: this.state.partyCodeOpacity}}>
      <Text style={{color: '#FFF', fontSize: 40, fontFamily: "sofia pro regular", marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5}}>
        {getPartyState().roomCode}
      </Text>
    </Animated.View>
    <Animated.View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <QRCode
        value={getPartyState().roomCode}
        size={200}
        bgColor='purple'
        fgColor='white'/>
    </Animated.View>

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}} onPress={this.onPressPartyCodeButton}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "#527aff"}}>party code</Text>
    </TouchableOpacity>

    { this.isAdmin &&
      <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}  onPress = {() => {
        console.log(this.props.navigator.state);
        if (this.props.navigator.state.routeName === 'Main'){
          this.props.initiateHeadCount();  
        }else{
          this.navigate("Main", {"headcount" : true})
        }
        
      }}>
        <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>headcount</Text>
      </TouchableOpacity>}

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}} onPress = {() => {
      this.navigate("People");
    }}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>people</Text>
    </TouchableOpacity>

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>chat</Text>
    </TouchableOpacity>

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>settings</Text>
    </TouchableOpacity>

    </Animated.View>
  }
}