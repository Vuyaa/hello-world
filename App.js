import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput,Button } from 'react-native';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
 }

 alertMyText (input = []) {
  Alert.alert(input.text);
}

 render() {
   return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
</NavigationContainer>
   );
 }
}