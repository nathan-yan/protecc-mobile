import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableHighlight, TouchableWithoutFeedback, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../Api'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { setPartyStateDirectly, getPartyState, getUserState } from '../../App'

import Menu from './Menu'

export default class PeopleScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popUpMember: undefined,
      showingMenu: false,
    }
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

  onPersonPress = (member) => {
    this.setState({
      popUpMember: member
    })
  }

  onExitPopUp = () => {
    this.setState({
      popUpMember: undefined
    })
  }

  getFlatListData = (partyData) => {
    const allMembers = partyData.members
    const guardians = partyData.guardians
    var holder = {}
    for (var i = 0; i < allMembers.length; i++) {
      holder[allMembers[i]._id] = allMembers[i]
    }
    for (var i = 0; i < guardians.length; i++) {
      if (holder[guardians[i]._id]) {
        delete holder[guardians[i]._id]
      }
    }
    var regularMembers = []
    for (var key in holder) {
      regularMembers.push(holder[key])
    }

    var data = ["guardians"]
    data.push(...guardians)
    data.push("members")
    data.push(...regularMembers)

    return data
  }

  isAdmin = () => {
    let guardians = getPartyState().guardians
    for (var i = 0; i < guardians.length; i++){
      if (guardians[i]._id == getUserState()._id){
        return true
      } 
    }
    return false
  }

  render() {
    return(
      <View style={{width: "100%", height: "100%", flexDirection: "column", backgroundColor: '#FFFFFF'}}>
        <Icon name="menu" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {this.showMenu()}}/>
        <View style={{position: 'absolute', left: 30 + 10, top: 80}}>
          <Text style={{color: '#000000', fontSize: 40, fontFamily: 'sofia pro regular'}}>
            people
          </Text>
          <FlatList 
            data={this.getFlatListData(this.props.screenProps.partyData)}
            renderItem={({item}) => <PeopleItem data={item} onPress={this.onPersonPress}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {
          this.state.popUpMember !== undefined &&
          <PopUp onExitPopUp={this.onExitPopUp} popUpMember={this.state.popUpMember} isAdmin={this.isAdmin()}/>
        }
        { this.state.showingMenu && 
         
         <Menu currentScreen="people" hideMenuCallback = {this.hideMenu} navigator = {this.props.navigation} initiateHeadCount = {this.initiateHeadCount}/>
       }
      </View>
    )
  }
}

class PopUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 300
    }).start()
  }

  handleOuterPress = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 300
    }).start(() => {
      this.props.onExitPopUp()
    })
  }
  
  getUserLocation = () => {
    let member = getPartyState().members.find((val) => {
      return val._id === this.props.popUpMember._id
    })

    return member.location
  }

  render() {
    var location = this.getUserLocation()
    return(
      <TouchableWithoutFeedback onPress={this.handleOuterPress}>
        <Animated.View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "#0009", width: '100%', height: '100%', opacity: this.state.opacity}}>
          <TouchableWithoutFeedback>
          <View style={{width: widthPercentageToDP(70), height: heightPercentageToDP(55), backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: 'center', elevation: 5}}>
            <Text style={{color: '#000000', fontSize: 22, fontFamily: 'sofia pro regular', marginTop: 15, marginBottom: 15}}>
              {this.props.popUpMember.name}
            </Text>
            <View style={{backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', width: widthPercentageToDP(25), height: widthPercentageToDP(25), borderRadius: widthPercentageToDP(25)/2, zIndex: 1}}>
              <Image source={{uri: this.props.popUpMember.profilePicture === '' ? 'https://dsys32.nyc3.digitaloceanspaces.com/protecc/default.png' : this.props.popUpMember.profilePicture}} style={{width: widthPercentageToDP(22), height: widthPercentageToDP(22), borderRadius: widthPercentageToDP(22)/2}}/>
            </View>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Light}
              zoomLevel={15}
              centerCoordinate={[location.lon, location.lat]}
              style={{width: "100%", flex: 1, marginTop: -1 * widthPercentageToDP(23)/2, zIndex: 0}}
            >
              <Mapbox.PointAnnotation id="userPoint" key="userPoint"  coordinate={[location.lon, location.lat]}> 
                <View style = {{justifyContent: "center"}}>
                  <View style = {{borderRadius: 5, padding: 10, paddingTop: 1, paddingBottom: 5, marginBottom: 2, backgroundColor: "#f05056"}}>
                    <Text style = {{fontFamily: "sofia pro regular", color: "white", fontSize: 20}}>{this.props.popUpMember.name}
                    </Text>
                  </View>
                  
                  <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#f05056"}} />
                </View>
              </Mapbox.PointAnnotation>
            </Mapbox.MapView>
            { this.props.isAdmin &&
            <View style={{flexDirection: 'row', height: heightPercentageToDP(5), width: '100%'}}>
              <TouchableHighlight style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: '#527AFF', borderBottomLeftRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', fontFamily: 'sofia pro regular', fontSize: 16}}>
                    promote
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{flex: 1}} >
                <View style={{flex: 1, backgroundColor: '#F05056', borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: '#fff', fontFamily: 'sofia pro regular', fontSize: 16}}>
                    kick out
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            }
          </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

class PeopleItem extends Component {
  render() {
    if (this.props.data.name) {
      const imageWidth = widthPercentageToDP(12)
      return(
        <TouchableHighlight onPress={() => this.props.onPress(this.props.data)} underlayColor="#ddd">
          <View flexDirection="row" justifyContent="flex-start" alignItems="center" marginTop={8} marginBottom={8} width={widthPercentageToDP(80)}>
            <Image source={{uri: this.props.data.profilePicture}} style={{width: imageWidth, height: imageWidth, borderRadius: imageWidth/2}}/>
            <View>
              <Text style={{color: getUserState()._id === this.props.data._id ? '#527AFF' : '#000000', fontSize: 16, fontFamily: 'sofia pro regular'}}>
                {"   " + this.props.data.name}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
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