import styles            from './styles.js'
import ajax              from './helpers/ajaxAdapter.js'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  MapView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ListView
} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


var Search =React.createClass({
  getInitialState: function() {
    return {
      text: '',
      search:false
    }
  },

  onSubmit: function(){
    console.log(this.state)

  },

  render: function(){
    return (
      <View style={{marginTop: 25}}>
      <TextInput style={{margin: 10}}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        blurOnSubmit={true}
        onBlur={this.onSubmit()}
      />
      <MapView
        style={{height: 200, flex:1}}
        showsUserLocation={true}
        followUserLocation={true}      />
      </View>

  );
  }
})

export default Search
