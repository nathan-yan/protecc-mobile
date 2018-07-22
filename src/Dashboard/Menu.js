import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Animated, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button } from '../Component'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Cookie from 'react-native-cookies';


import { Mapbox } from "../../App";
import Api from '../Api'

export default class MainDashboard extends Component {
  constructor(props){
    super(props)

    const { navigate } = this.props.navigator;
    this.navigate = navigate; 

    this.state = {
      slidingProgress: new Animated.Value(widthPercentageToDP(-100))
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

  render() {
    return <Animated.View style = {{position: "absolute", top: 0, left: this.state.slidingProgress, width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", backgroundColor: "white", zIndex: 10000}}>
    <Icon name="close" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {this.hideMenu()}}/>

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "#527aff"}}>party code</Text>
    </TouchableOpacity>

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}  onPress = {() => {
      if (this.props.navigator.state.routeName === 'main'){
        this.props.initiateHeadCount();  
      }else{
        this.navigate("Main", {"headcount" : true})
      }
      
    }}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>headcount</Text>
    </TouchableOpacity>

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