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

import LoginScreen from './src/Login/Login'
import SplashScreen from './src/Splash/Splash'
import JoinPartyScreen from './src/JoinParty/JoinParty'
import ScanCodeScreen from './src/JoinParty/ScanCode'
import SignUpScreen from './src/Login/SignUp'

import MainScreen from './src/Dashboard/Main'

export default class App extends Component {
  render() {
    return <RootStack/>
  }
}


const RootStack = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
  JoinParty: JoinPartyScreen,
  JoinPartyScanCode: ScanCodeScreen,
  SignUp: SignUpScreen,

  Main: MainScreen
},
{
  initialRouteName: 'Splash',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
