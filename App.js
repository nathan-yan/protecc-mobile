/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ');
exports.Mapbox = Mapbox;

exports.partyDataContext;
exports.splashReauthenticateStatus;

import LoginScreen from './src/Login/Login'
import SplashScreen from './src/Splash/Splash'
import JoinPartyScreen from './src/JoinParty/JoinParty'
import ScanCodeScreen from './src/JoinParty/ScanCode'
import SignUpScreen from './src/Login/SignUp'

import MainScreen from './src/Dashboard/Main'

import Api from './src/Api'

import Socket from './src/Socket'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    }
  }

  componentWillMount = async () => {  
    // Check if user is in a group
    // If user isn't in a group, go to login page
    // Otherwise, go to dashboard

    let initialRoute;

    let res = await Api.reauthenticate();
    
    exports.splashReauthenticateStatus = res.status;

    if (res.status === 401){    // No account associated with session
      initialRoute = 'Login'
    }else if (res.status === 201){  // Logged in and has a party
      let res = await Api.getParty();
      var json = await res.json();

      initialRoute = 'Main'

    }else if (res.status === 200) {   // Logged in and does not have a party
      initialRoute = 'JoinParty'
    }

    this.RootStack = createStackNavigator({
      Splash: SplashScreen,
      Login: LoginScreen,
      JoinParty: JoinPartyScreen,
      JoinPartyScanCode: ScanCodeScreen,
      SignUp: SignUpScreen,
      Main: MainScreen
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
    }
    
  }

  render() {
    console.log(this.state.partyData);
    return  this.state.initialized ? <this.RootStack screenProps = {this.state.partyData}/> : <SplashScreen /> 
  }
}
class Splash_ extends Component {
  render() {
    return <SplashScreen />
  }
}
