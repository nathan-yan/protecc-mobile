/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './src/Login/Login'
import SplashScreen from './src/Splash/Splash'
import JoinPartyScreen from './src/JoinParty/JoinParty'
import ScanCodeScreen from './scr/JoinParty/ScanCode'

export default class App extends Component {
  render() {
    return <RootStack/>
  }
}

const RootStack = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
  JoinParty: JoinPartyScreen,
  JoinPartyScanCode: ScanCodeScreen
},
{
  initialRouteName: 'JoinParty',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
