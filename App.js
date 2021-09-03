import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/Details';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component{
render(){
  return (
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}
}
const appStackNavigator= createStackNavigator({
  Home : {
    screen : HomeScreen,
    navigationOptions : {headersShown:false}
  },
  Details : {
    screen : DetailsScreen
  }
},{
  initialRouteName: "Home"
});
const AppContainer= createAppContainer(appStackNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
