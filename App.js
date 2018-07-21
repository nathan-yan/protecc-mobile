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
import SignUpScreen from './src/Login/SignUp'

export default class App extends Component {
  render() {
    return <RootStack/>
  }
}

const RootStack = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
