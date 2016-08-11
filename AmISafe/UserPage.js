import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TabBarIOS, MapView, TextInput,ScrollView, TouchableOpacity, Image, ListView } from 'react-native';
import {Container, Content, InputGroup, Input, Icon} from 'native-base';
// import Login from './Login.js'
class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state= {
    };
  }

  render(){
    return(
    <View>
      <InputGroup borderType="rounded" >
        <Input style={{color: '#00b497'}} placeholder='Name' />
      </InputGroup>
      <InputGroup borderType="rounded" >
        <Input style={{color: '#00b497'}} placeholder='Email' />
      </InputGroup>
      <InputGroup borderType="rounded" >
        <Input style={{color: '#00b497'}} placeholder='Password' secureTextEntry={true} />
      </InputGroup>

    </View>
    )
  }
}

export default UserPage
