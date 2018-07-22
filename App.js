import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ');

exports.partyDataContext;
exports.splashReauthenticateStatus;

import LoginScreen from './src/Login/Login'
import SplashScreen from './src/Splash/Splash'
import JoinPartyScreen from './src/JoinParty/JoinParty'
import ScanCodeScreen from './src/JoinParty/ScanCode'
import SignUpScreen from './src/Login/SignUp'

import MainScreen from './src/Dashboard/Main'
import PeopleScreen from './src/Dashboard/PeopleScreen'

import Api from './src/Api'

import Socket from './src/Socket'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    }

    exports.setPartyStateDirectly = (data) => {
      this.setState(data);
    }

    exports.getPartyState = () => {
      return this.state.partyData;
    }
  
  }

  componentWillMount = async () => {  
    // Check if user is in a group
    // If user isn't in a group, go to login page
    // Otherwise, go to dashboard

    let initialRoute;

    let res = await Api.reauthenticate();
    var userJson;
    
    exports.splashReauthenticateStatus = res.status;

    if (res.status === 401){    // No account associated with session
      initialRoute = 'Login'
    }else if (res.status === 201){  // Logged in and has a party
      let res = await Api.getParty();
      var json = await res.json();

      let userRes = await Api.getUser()
      userJson = await userRes.json()

      initialRoute = 'Main'

      this.setState({
        userData: userJson
      })

    }else if (res.status === 200) {   // Logged in and does not have a party
      initialRoute = 'JoinParty'

      let userRes = await Api.getUser()
      userJson = await userRes.json()

      this.setState({
        userData: userJson
      })
    }

    console.log(this.state)
    this.RootStack = createStackNavigator({
      Splash: SplashScreen,
      Login: LoginScreen,
      JoinParty: JoinPartyScreen,
      JoinPartyScanCode: ScanCodeScreen,
      SignUp: SignUpScreen,
      Main: MainScreen,
      People: PeopleScreen
    },
    {
      initialRouteName: initialRoute,
      headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    })

    if (res.status === 201){
      this.setState({
        initialized: true,
        partyData: json
      })
    } else {
      this.setState({
        initialized: true
      })
    }
    
  }

  setPartyState = async () => {
    let res = await Api.getParty()
    let json = await res.json()
    if (res.status === 200) {
      this.setState({
        partyData: json,
      })
    }
  }

  setUserState = async () => {
    let res = await Api.getUser()
    let json = await res.json()
    if (res.status === 200) {
      this.setState({
        userData: json,
      })
    }
  }

  render() {
    return  this.state.initialized ? <this.RootStack screenProps = {{setUserState: this.setUserState, userData: this.state.userData, setPartyState: this.setPartyState, partyData: this.state.partyData}}/> : <SplashScreen /> 
  }
}
class Splash_ extends Component {
  render() {
    return <SplashScreen />
  }
}
