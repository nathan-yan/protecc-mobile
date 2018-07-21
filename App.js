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
export default class App extends Component {
  render() {
    return <RootStack/>
  }
}

const RootStack = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
},
{
  initialRouteName: 'Splash',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
