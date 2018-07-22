import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Animated, TouchableOpacity, ViewPagerAndroid } from 'react-native'
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
import { NavigationActions, StackActions } from 'react-navigation'; 

export default class MainDashboard extends Component {
  constructor(props){
    super(props)

    const { navigate } = this.props.navigator;
    this.navigate = navigate; 

    this.state = {
      slidingProgress: new Animated.Value(widthPercentageToDP(-100)),
      partyCodeOpacity: new Animated.Value(0),
      showingQRCode: false
    }

    this.isAdmin = false;
    let guardians = getPartyState().guardians
    
    for (var i = 0; i < guardians.length; i++){
      if (guardians[i]._id == getUserState()._id){
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
    var val = this.state.showingQRCode ? 0 : 1
    Animated.timing(this.state.partyCodeOpacity, {
      toValue: val,
      duration: 300
    }).start(() => {
      this.setState((prevState) => ({
        showingQRCode: !prevState.showingQRCode
      }));
    })
  }

  logout = () => {
    Api.logout().then((res) => {
      if (res.status === 200) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigator.dispatch(resetAction);
      }
    })
  }

  render() {
    return <Animated.View style = {{position: "absolute", top: 0, left: this.state.slidingProgress, width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", backgroundColor: "white", zIndex: 10000}}>
    <Icon name="close" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {this.hideMenu()}}/>

    <ViewPagerAndroid
    initialPage={0} style = {{flex: 1}}>
    <View key="1" style = {{flex: 1, flexDirection:"column", justifyContent: "center"}}>
    <Text style = {{position: "absolute", bottom: 15, left:0, width: "100%", textAlign:"center", fontFamily: "sofia pro regular", fontSize: 15, color: "#ccc"}}>swipe left to view join code</Text>
    
    <Animated.View style={{position: 'absolute', top: 20, right: 60, backgroundColor: '#527AFF', paddingLeft: 8, paddingRight: 8, borderRadius: 8, opacity: this.state.partyCodeOpacity}}>
    
  </Animated.View>

  { this.isAdmin &&
    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}  onPress = {() => {
      console.log(this.props.navigator.state);
      if (this.props.navigator.state.routeName === 'Main'){
        Api.initiateHeadcount();
        fetch(BASE_URL + "/api/party/headcount", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }).then((res)=>{
          console.log(res);
          console.log("\n\n\nn\n\n\dsofjsiodjfosjfj")
        }).catch((err)=>{
          console.log(err)
        })
        this.props.initiateHeadCount();  
      }else{
        Api.initiateHeadcount();
        this.navigate("Main", {"headcount" : true})
      }
      
    }}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: "black"}}>headcount</Text>
    </TouchableOpacity>}

    <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}} onPress = {() => {
      this.navigate("Main"); setTimeout(() => this.props.hideMenuCallback(), 350)
    }}>
      <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: this.props.currentScreen === "map" ? '#527AFF' : "black"}}>map</Text>
    </TouchableOpacity>

  <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}} onPress = {() => {
      this.navigate("People"); setTimeout(() => this.props.hideMenuCallback(), 350);
    }}>
    <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: this.props.currentScreen === "people" ? '#527AFF' : "black"}}>people</Text>
  </TouchableOpacity>

  <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}}>
    <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: this.props.currentScreen === "chat" ? '#527AFF' : "black"}}>chat</Text>
  </TouchableOpacity>

  <TouchableOpacity style = {{marginTop: 10, marginLeft: 40}} onPress={this.logout}>
    <Text style = {{fontFamily: "sofia pro regular", fontSize: 40, color: this.props.currentScreen === "settings" ? '#527AFF' : "black"}}>logout</Text>
  </TouchableOpacity>

    </View>
    <View  key="2" style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
    
    <Text style={{color: '#000', fontSize: 40, fontFamily: "sofia pro regular", marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5}}>
    {getPartyState().roomCode}
  </Text>

    <QRCode
    value={getPartyState().roomCode}
    size={200}
    bgColor='black'
    fgColor='white'/>
    
    </View>
  </ViewPagerAndroid>

   

    </Animated.View>
  }
}