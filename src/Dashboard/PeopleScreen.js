import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../Api'
import { widthPercentageToDP, heightPercentageToDP } from '../scaling';
import Mapbox from '@mapbox/react-native-mapbox-gl';

const guardians = [
  {
    name: 'g1',
    profilePicture: 'https://dsys32.nyc3.digitaloceanspaces.com/protecc/1e74f277415dbdc8b1ab9485c238f106',
  },
  {
    name: 'g2',
    profilePicture: 'https://dsys32.nyc3.digitaloceanspaces.com/protecc/1e74f277415dbdc8b1ab9485c238f106',
  }
]

const members = [
  {
    name: 'm1',
    profilePicture: 'https://dsys32.nyc3.digitaloceanspaces.com/protecc/default.png',
  },
  {
    name: 'm2',
    profilePicture: 'https://dsys32.nyc3.digitaloceanspaces.com/protecc/default.png',
  }
]


export default class PeopleScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popUpMember: undefined
    }
  }
  componentDidMount() {
    api.getParty().then((res) => {
      console.log(res.data)
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

  render() {
    var data = ["guardians"]
    data.push(...guardians)
    data.push("members")
    data.push(...members)
    return(
      <View style={{width: "100%", height: "100%", flexDirection: "column", backgroundColor: '#FFFFFF'}}>
        <Icon name="menu" size={30} color="#000" style = {{position: "absolute", top: 30 + 10, left: 30 + 10, zIndex: 1000}} onPress = {() => {console.log("PRESSED!"); this.showMenu()}}/>
        <View style={{position: 'absolute', left: 30 + 10, top: 80}}>
          <Text style={{color: '#000000', fontSize: 40, fontFamily: 'sofia pro regular'}}>
            people
          </Text>
          <FlatList 
            data={data}
            renderItem={({item}) => <PeopleItem data={item} onPress={this.onPersonPress}/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {
          this.state.popUpMember !== undefined &&
          <PopUp onExitPopUp={this.onExitPopUp} popUpMember={this.state.popUpMember}/>
        }
      </View>
    )
  }
}

class PopUp extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handleOuterPress = () => {
    this.props.onExitPopUp()
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={this.handleOuterPress}>
        <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: "#0005", width: '100%', height: '100%'}}>
          <TouchableWithoutFeedback>
          <View style={{width: widthPercentageToDP(70), height: heightPercentageToDP(55), backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: 'center'}}>
            <Text style={{color: '#000000', fontSize: 22, fontFamily: 'sofia pro regular', marginTop: 15, marginBottom: 15}}>
              {this.props.popUpMember.name}
            </Text>
            <View style={{backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', width: widthPercentageToDP(25), height: widthPercentageToDP(25), borderRadius: widthPercentageToDP(25)/2, zIndex: 1}}>
              <Image source={{uri: this.props.popUpMember.profilePicture}} style={{width: widthPercentageToDP(22), height: widthPercentageToDP(22), borderRadius: widthPercentageToDP(22)/2}}/>
            </View>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Light}
              zoomLevel={15}
              centerCoordinate={[3, 3]}
              style={{width: "100%", flex: 1, marginTop: -1 * widthPercentageToDP(23)/2, zIndex: 0}}
            >
            </Mapbox.MapView>
            <View style={{flexDirection: 'row', height: heightPercentageToDP(5), width: '100%'}}>
              <TouchableHighlight style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: '#527AFF', borderBottomLeftRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    promote
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: '#F05056', borderBottomRightRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    kick out
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </View>
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
              <Text style={{color: '#000000', fontSize: 16, fontFamily: 'sofia pro regular'}}>
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