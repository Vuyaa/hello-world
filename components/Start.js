import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

//Define background colors
const backgroundColors = {
    black: { backgroundColor: '#090c08' },
    purple: { backgroundColor: '#474056' },
    grey: { backgroundColor: '#8a95a5' },
    green: { backgroundColor: '#b9c6ae' }
  };


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state= {name: "", color:""}; // Define props to pass them to the child components
    }

    render(){
        const { black, purple, grey, green } = backgroundColors;   //Define background colors in render function
        return (
            <View style={styles.container}>                     
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={[styles.container, styles.image]}
        >
          <Text style={styles.title}>App Title</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.nameBox}
              onChangeText={(name) => this.setState({ name })}    //Using name prop to update state to the new name
              value={this.state.name}
              placeholder='Enter your Name' />
            <View>
              <Text style={styles.colorText}>Choose your Background:</Text>
              <View style={styles.colorWrapper}>
                <TouchableOpacity style={[styles.color, black]}
                  onPress={() =>
                    this.setState({ color: black.backgroundColor })  //Using backgroundColor prop to choose to use it in the chat Screen
                  }
                />
                <TouchableOpacity style={[styles.color, purple]}
                  onPress={() =>
                    this.setState({ color: purple.backgroundColor }) //Using backgroundColor prop to choose to use it in the chat Screen
                  }
                />
                <TouchableOpacity style={[styles.color, grey]}
                  onPress={() =>
                    this.setState({ color: grey.backgroundColor }) //Using backgroundColor prop to choose to use it in the chat Screen
                  }
                />
                <TouchableOpacity style={[styles.color, green]}
                  onPress={() =>
                    this.setState({ color: green.backgroundColor }) //Using backgroundColor prop to choose to use it in the chat Screen
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.nameBox, styles.chatBox]}
              onPress={() =>
                this.props.navigation.navigate('Chat',
                  {
                    name: this.state.name,                      //Passing props to the Chat component
                    color: this.state.color                     //Passing props to the Chat component
                  })
              }
            >
              <Text
                style={[styles.colorText, styles.chatBoxText]}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

//Design from the project brief

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#fff',
      marginTop: 60,
    },
    inputBox: {
      backgroundColor: "#fff",
      width: "88%",
      alignItems: "center",
      height: "44%",
      justifyContent: 'space-evenly'
    },
    
    nameBox: {  
      alignSelf:'center',
      height: 38,
      width: '88%',
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 2,
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      opacity: 50
      
    },
      colorText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100
      },
      colorWrapper: {
        flexDirection: 'row'
      },
      color: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10
      },
      chatBox: {
        backgroundColor: '#757083',
        justifyContent: 'center'
      },
      chatBoxText: {
        color: '#fff',
        fontWeight: '600'
      }
  })