import React, { Component } from 'react';
import { View, StyleSheet, Animated, Image, Text, TextInput, TouchableOpacity, TouchableHighlight,TouchableWithoutFeedback, Alert } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling'
import { Button, Button2 } from '../Component'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Cookie from 'react-native-cookies';

import Mapbox from '@mapbox/react-native-mapbox-gl';
import Api from '../Api'
import Menu from './Menu'
import { setPartyStateDirectly, getPartyState, getUserState } from '../../App'

import Summary from './Summary'

Mapbox.setAccessToken("pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ");

export default class MainDashboard extends Component {
  constructor(props){
    super(props)
    
    const headcount = this.props.navigation.getParam('headcount', false);
    
    this.state = {
      coordinates: {
        longitude: 0,
        latitude: 0,
        initLongitude: null, 
        initLatitude: null
      },
      initiator: false,
      showingMenu: false,
      headcount: headcount,
      headcountStatus: {
        near: [], 
        responses: [],
        nearBar: new Animated.Value(0),
        farBar: new Animated.Value(0),
      },
      showingSummary: false 
    }

    this.headcount={};

    this.mapRef; 
    if (this.props.screenProps.partyData.headcount.near.length > 0 || this.props.screenProps.partyData.headcount.far.length > 0 || this.props.screenProps.partyData.headcount.unresponsive.length > 0){
      this.state.showingMenu = false
      this.state.headcount = true
    }

    exports.headcountResponse = (type, response) => {
      let headcountStatus = this.state.headcountStatus;
      headcountStatus[type].push(response);
      
      let totalMembers = this.props.screenProps.partyData.members.length;
      Animated.timing(this.state.headcountStatus.farBar, {
        toValue: widthPercentageToDP(100 / totalMembers * (headcountStatus.responses.length + headcountStatus.near.length)) * 0.6,
        duration: 300
      }).start()

      this.setState({
        headcountStatus: headcountStatus
      })
    }

    exports.setNear = (responses) => {
      let headcountStatus = this.state.headcountStatus;
      headcountStatus.near = responses;

      let totalMembers = this.props.screenProps.partyData.members.length;
      Animated.timing(this.state.headcountStatus.nearBar, {
        toValue: widthPercentageToDP(100 / totalMembers * headcountStatus.near.length) * 0.6,
        duration: 300
      }).start()

      this.setState({
        headcountStatus: headcountStatus
      })
    }

    this.isAdmin = false;
    let guardians = getPartyState().guardians
    
    for (var i = 0; i < guardians.length; i++){
      if (guardians[i]._id == getUserState()._id){
        this.isAdmin = true
      } 
    }

    exports.initiateHeadCount_ = () => {
      var initiator = false;
      if (this.state.headcount ){
        // You're the initiator
        initiator = true 
      }
      this.setState({
        showingMenu: false,
        headcount: true,
        initiator: initiator
      })
    }

    exports.endHeadcount = () => {
      this.setState({
        headcount: false
      })
    }
  }

  componentDidMount () {
    if (this.props.screenProps.partyData.headcount.near != [] || this.props.screenProps.partyData.headcount.far != [] || this.props.screenProps.partyData.headcount.unresponsive != []){
      this.setState({
        showingMenu: false,
        headcount: true
      })
    }
  }

  initiateHeadCount = () => {
    var initiator = false;
    if (this.state.headcount){
      // You're the initiator
      initiator = true 
    }
    this.setState({
      showingMenu: false,
      headcount: true,
      initiator: true
    })
  }

  updateLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: this.state.coordinates.initLongitude,
          initLatitude: this.state.coordinates.initLatitude,
        }
      })
    });
  }

  resetHeadcount = () => {
    Animated.timing(this.state.headcountStatus.farBar, {
      toValue: 0,
      duration: 10
    }).start()

    Animated.timing(this.state.headcountStatus.nearBar, {
      toValue: 0,
      duration: 10
    }).start()

    let headcountStatus = this.state.headcountStatus;
    headcountStatus.responses = []
    headcountStatus.near = []  
    headcountStatus.farBar = new Animated.Value(0);
    headcountStatus.nearBar = new Animated.Value(0);
    this.setState({
      headcountStatus: headcountStatus
    })
  }

  updateLocationSetInit = async () => {
    navigator.geolocation.getCurrentPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);



      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: longitude,
          initLatitude: latitude
        }
      });
    });
  }

  goToLocation = () => {
    this.mapRef.setCamera({
      centerCoordinate: [this.state.coordinates.longitude, this.state.coordinates.latitude],
    });
  }
  
  renderAnnotations = () => {
    let partyData = this.props.screenProps.partyData;
    let annotations = partyData.members.map((member, i) => {
      // TODO: add this.state.coordinates.longitude, this.state.coordinates.latitude for your own location

      let append = '';
      if (member._id === this.props.screenProps.userData._id) {
        append = ' (You)'
      }

      if (!member.location) return;
      return <Mapbox.PointAnnotation anchor = {{x:0.0, y:1}} id = {"member-" + i} coordinate = {[member.location.lon, member.location.lat]} key = {"member-" + i}>
      <View style = {{justifyContent: "center"}}>
        <View style = {{borderRadius: 5, padding: 10, paddingTop: 1, paddingBottom: 5, marginBottom: 2, backgroundColor: "#f05056"}}>
          <Text style = {{fontFamily: "sofia pro regular", color: "white", fontSize: 20}}>{member.name + append}
          </Text>
        </View>
        
        <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#f05056"}} />
      </View>
      </Mapbox.PointAnnotation>
    })

    return annotations

  }

  async componentDidMount() {
    setInterval(this.updateLocation, 5000);
    const { navigate } = this.props.navigation;
  
    this.updateLocationSetInit();

    navigator.geolocation.watchPosition(async (res) => {
      let longitude = res.coords.longitude;
      let latitude = res.coords.latitude;

      let res_ = await Api.updateLocation(latitude, longitude);

      this.setState({
        coordinates: {
          longitude: longitude,
          latitude: latitude,
          initLongitude: this.state.coordinates.initLongitude,
          initLatitude: this.state.coordinates.initLatitude,
        }
      })
    }, {
      enableHighAccuracy: true,
      distanceFilter: 5
    });


  }

  showMenu = () => {
    this.setState({
      showingMenu: true
    })
  }

  hideMenu = () => {
      this.setState({
        showingMenu: false
      })
    }    
  handleDoneHeadcount = () => {
    Api.stopHeadcount();
    this.setState({
      headcount: false
    })
  }

 
  submitResponse = () => {
    Api.respondHeadcount() 
  }

  showSummary = () => {
    console.log(this.state);
    this.headcount.far = this.state.headcountStatus.responses.slice();
    this.headcount.near = this.state.headcountStatus.near.slice();

    this.setState({
      showingSummary: true 
    })
  }

  notNear = () => {
    var nearIds = this.state.headcountStatus.near.slice();

    console.log('MY OWN ID ' + this.props.screenProps.userData._id);
    return nearIds.includes(this.props.screenProps.userData._id);
  }
  
  render() {
    let partyData = this.props.screenProps.partyData;
    console.log(this.state.initiator);
    return (
      
      <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: '#527AFF'}}>
         <Icon name="menu" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1}} onPress = {() => {this.showMenu()}}/>

        <TouchableOpacity style = {{position: "absolute", top: 100, left: 30, borderRadius: 50, width: 50, height: 50, justifyContent: "center", alignItems: "center",  backgroundColor: "#fffb", zIndex: 1}} onPress = {() => {
          this.goToLocation()
        }}>
            <Icon name="my-location" size={30} color= "#555" />
        </TouchableOpacity>
      

        <Mapbox.MapView
            ref = {(map) => this.mapRef = map}
            styleURL={Mapbox.StyleURL.Light}
            zoomLevel={15}
            centerCoordinate={[this.state.coordinates.initLongitude || 0, this.state.coordinates.initLatitude || 0]}
            style={{width: "100%", height: "100%"}}
            >
              {this.renderAnnotations()}            
           </Mapbox.MapView>
        { this.state.showingMenu && 
         
          <Menu currentScreen="map" hideMenuCallback = {this.hideMenu} navigator = {this.props.navigation} initiateHeadCount = {this.initiateHeadCount}/>
        }

        
        { (this.state.headcount && this.state.initiator) &&
        // show progress if headcount and is initiator
          <TouchableWithoutFeedback onPress={this.handleOuterPress}>
        <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "#0009", width: '100%', height: '100%', zIndex: 2}}>
          <TouchableWithoutFeedback>
          <View style={{width: widthPercentageToDP(80), height: heightPercentageToDP(35), backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: 'center', elevation: 5}}>
            <Text style={{color: '#000000', fontSize: 22, fontFamily: 'sofia pro regular', marginTop: 15, marginBottom: 15}}>
              doing a head count...
            </Text>
            <View style={{backgroundColor: '#FFFFFF', justifyContent: 'center', width: widthPercentageToDP(60), height: widthPercentageToDP(25), borderRadius: widthPercentageToDP(25)/2, zIndex: 2}}>
              <View id_ = 'progress-total' style = {{position: "absolute", width: "100%", height: 25, borderRadius: 50, backgroundColor: "white", borderColor: "black", borderWidth: 3}}/>
              <Animated.View id_ = 'progress-responded' style = {{position: "absolute", width: this.state.headcountStatus.farBar, height: 25, borderRadius: 50, backgroundColor: "#9B51E0", borderColor: "transparent", borderWidth: 3}}/>
              <Animated.View id_ = 'progress-near' style = {{position: "absolute", width: this.state.headcountStatus.nearBar, height: 25, borderRadius: 50, backgroundColor: "#1CE170", borderColor: "transparent", borderWidth: 3}}/>
              
              <View style = {{position: "absolute", width: "100%", left: 0, top: 40, marginTop: 20, height: 25, borderRadius: 50, borderColor: "transparent", borderWidth: 3, justifyContent: "flex-end", flexDirection:"row"}}>
                <Text style = {{color: '#1ce170', fontSize: 12, fontFamily: 'sofia pro regular', flex: 1}}>{this.state.headcountStatus.near.length} near you</Text>
                <Text style = {{color: '#000', fontSize: 12, fontFamily: 'sofia pro regular', flex: 2, alignSelf:"flex-end", textAlign:"right"}}>{this.state.headcountStatus.responses.length} others responded</Text>
              </View>
              
            </View>
            <View
              styleURL={Mapbox.StyleURL.Light}
              zoomLevel={15}
              centerCoordinate={[3, 3]}
              style={{width: "100%", flex: 1, marginTop: -1 * widthPercentageToDP(23)/2, zIndex: 0}}
            >
            </View>
            <View style={{flexDirection: 'row', height: heightPercentageToDP(5), width: '100%'}}>
              <TouchableHighlight style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: '#527aff', borderBottomRightRadius: 8, borderBottomLeftRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', fontFamily: 'sofia pro regular', fontSize: 16}} onPress = {() => {
                    this.handleDoneHeadcount(); this.showSummary(); this.resetHeadcount();
                  }}>
                    done
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
        }

        { (!this.state.initiator && this.state.headcount && this.notNear()) &&
        // headcount and not initiator, show im alive
          <TouchableWithoutFeedback onPress={this.handleOuterPress}>
        <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "#0009", width: '100%', height: '100%', zIndex: 2}}>
          <TouchableWithoutFeedback>
          <View style={{width: widthPercentageToDP(80), height: heightPercentageToDP(45), backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: 'center', elevation: 5}}>
            <Text style={{color: '#000000', fontSize: 22, fontFamily: 'sofia pro regular', marginTop: 15, marginBottom: 0}}>
              doing a head count...
            </Text>
            <View style={{backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems:"center", width: widthPercentageToDP(60), borderRadius: widthPercentageToDP(25)/2, zIndex: 2}}>
              <Button2 text = "i'm ok!" onPress = {() => {
                Api.respondHeadcount(); this.setState({headcount: false})
              }}></Button2>
              
            </View>
            <View style = {{padding: 10}}>
              <Text style={{color: '#000000', fontSize: 17, textAlign: "center", fontFamily: 'sofia pro regular', marginTop: 15, marginBottom: 15}}>
                let your guardian know you're there, even if you're not with your group!
              </Text>
            </View>
            <View
              styleURL={Mapbox.StyleURL.Light}
              zoomLevel={15}
              centerCoordinate={[3, 3]}
              style={{width: "100%", flex: 1, marginTop: -1 * widthPercentageToDP(23)/2, zIndex: 0}}
            >
            </View>
           
          </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
        }


              </View>
    )
  }
}

/*
{this.state.showingSummary && <View style = {{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
        <Summary far = {this.headcount.far} near = {this.headcount.near} center = {[this.state.coordinates.initLongitude || 0, this.state.coordinates.initLatitude || 0]}></Summary>
      </View>}
        
*/