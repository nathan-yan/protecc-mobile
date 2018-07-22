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

Mapbox.setAccessToken("pk.eyJ1IjoibmF0aGFuY3lhbiIsImEiOiJjamp3M3JsZnkwbGN5M3dwYXdxajh1Z3ZkIn0.sgDMA2v-LkmMEwJEUQtRvQ");

export default class Summary extends Component {
  constructor(props){
    super(props)

    this.state ={};

    /*
    this.averageLons = [];
    this.averageLats = [];
    this.radii = [];

    for (var c = 0; c < this.props.clusters.length; c++){
      let avgLon = 0;
      let avgLat = 0;

      this.props.clusters[c].map((index) => {
        avgLon += this.props.members[index].location.lon
        avgLat += this.props.members[index].location.lat
      })

      avgLon /= this.props.clusters[c].length;
      avgLat /= this.props.clusters[c].length;
    
      let maxRadii = 0;
      this.props.clusters[c].map((index) => {
        let dist = (Math.max(Math.abs(this.props.members[index].location.lon - avgLon), Math.abs(this.props.members[index].location.lat - avgLat)));
      
        if (dist > maxRadii){
          maxRadii = dist;
        }
      });

      console.log(this.radii);

      this.radii.push(maxRadii);
      this.averageLons.push(avgLon);
      this.averageLats.push(avgLat);
    }

    this.mapRef = React.createRef();*/
  }

  renderAnnotations = () => {
    /*let annotations = this.props.clusters.map((cluster, i) => {
      // TODO: add this.state.coordinates.longitude, this.state.coordinates.latitude for your own location

      let append = '';
      console.log(this.mapRef);

      return <Mapbox.PointAnnotation anchor = {{x:0.5, y:0.5}} id = {"cluster-" + i} coordinate = {[this.averageLons[i], this.averageLats[i]]} key = {"cluster-" + i}>
      <View style = {{justifyContent: "center"}}>
        <View style = {{borderRadius: 50, width: 100, height: 100, backgroundColor: "#f05056"}} />
      </View>
      </Mapbox.PointAnnotation>
    })

    return annotations
*/

    let far = this.props.far.map((people, i) => {
      return <Mapbox.PointAnnotation anchor = {{x:0.5, y:0.5}} id = {"far-" + i} coordinate = {[people.location.lon, people.location.lat]} key = {"far-" + i}>
      <View style = {{justifyContent: "center"}}>
        <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#8042f4"}} />
      </View>
      </Mapbox.PointAnnotation>
    })

    let near = this.props.far.map((people, i) => {
      return <Mapbox.PointAnnotation anchor = {{x:0.5, y:0.5}} id = {"near-" + i} coordinate = {[people.location.lon, people.location.lat]} key = {"near-" + i}>
      <View style = {{justifyContent: "center"}}>
        <View style = {{borderRadius: 50, width: 10, height: 10, backgroundColor: "#41f489"}} />
      </View>
      </Mapbox.PointAnnotation>
    })

    let points = far.concat(near);
    return points
  }

  render() {
    
  var mapView = <Mapbox.MapView
      ref = {(map)=>this.mapRef = map}
      styleURL={Mapbox.StyleURL.Light}
      zoomLevel={15}
      centerCoordinate={this.props.center}
      style={{width: "100%", height: "100%"}}
      >
        {this.renderAnnotations()}            
    </Mapbox.MapView>
    return mapView
  }
}