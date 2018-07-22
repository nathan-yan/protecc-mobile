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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partyData: {}
    }

    
  }

  initialize = async () => {  
    // Check if user is in a group
    // If user isn't in a group, go to login page
    // Otherwise, go to dashboard

    let res = await Api.reauthenticate();
    
    exports.splashReauthenticateStatus = res.status;

    if (res.status === 401){    // No account associated with session
    }else if (res.status === 201){  // Logged in and has a party
      let res = await Api.getParty();
      let json = await res.json();

      exports.partyDataContext = json;

    }else if (res.status === 200) {   // Logged in and does not have a party
    }
  }

  render() {
    this.initialize() 
    return <RootStack/>
  }
}
class Splash_ extends Component {
  render() {
    return <SplashScreen />
  }
}

const RootStack = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
  JoinParty: JoinPartyScreen,
  JoinPartyScanCode: ScanCodeScreen,
  SignUp: SignUpScreen,
  Main: MainScreen,
  People: PeopleScreen
},
{
  initialRouteName: 'Splash',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
