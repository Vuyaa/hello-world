import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput,Button } from 'react-native';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import propTypes from "prop-types";
import CustomActions from './components/CustomActions';



const Stack = createStackNavigator();


export default class App extends Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
 }

 alertMyText (input = []) {
  Alert.alert(input.text);
}

renderCustomActions = (props) => {
  return <CustomActions {...props} />;
};


//The NavigationContainer is responsible for managing your app state and linking your top-level navigator to the app environment.
//Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.
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

//Using PropTypes is a usefull way to discover bugs by expecting a certain value-type from the defiened props
//Setting the Name and the Color props to expect string type
App.propTypes = {
  name: propTypes.string,
  color: propTypes.string,
  user: propTypes.object,
  _id: propTypes.string,
}