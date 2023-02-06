import { async } from 'q';
import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import propTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import { InputToolbar } from 'react-native-gifted-chat';


//defining firebase from firestore
const firebase = require('firebase');
require('firebase/firestore');



//Define essential props in an class based component
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        avatar: '',
        name: '',
      },
    };
        
    //config if satisfied, load(fetch) collection from firebase
        if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyC0ggYcmEyESEEWDCpfkamm7_XonXus72k",
              authDomain: "chatapp-d5fe5.firebaseapp.com",
              projectId: "chatapp-d5fe5",
              storageBucket: "chatapp-d5fe5.appspot.com",
              messagingSenderId: "720872207807",
              appId: "1:720872207807:web:577e61596ac125648cdd0a"
            })
        }
        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    //getting messages saved on users Async Local storage
    async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };

      componentDidMount() {
        // Set the name property to be included in the navigation bar
        let name = this.props.route.params.name;  
        this.getMessages();
        this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(
      this.onCollectionUpdate
    );

    //authenticate user to sign anonymously, if found in database, set state based on what in database is
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {
      if (!user) {
      await firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy('createdAt', 'desc')
        .onSnapshot(this.onCollectionUpdate);
    });

    //checking weather the user is online, and based in that setting the state
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
      } else {
        this.setState({
          isConnected: false,
        });
      }
    });

  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  //On send, add message to database, and append new massage to previos messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.saveMessages();
    });
  }

  //save object to state
  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  //saving massages into our Async Local storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  //deleting messages from users Async Local storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
      });
    });
    this.setState({
      messages,
    });
  };
    

    //Bubble styling imported from gifted chat library
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#000',
            },
            left: {
              backgroundColor: '#fff',
            },
          }}
        />
      );
    }

    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return(
          <InputToolbar
          {...props}
          />
        );
      }
    }


      render() {
        // Set the color property as background color for the chat screen
        let color = this.props.route.params.color;
        return (
          
          <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              renderInputToolbar={this.renderInputToolbar.bind(this)}
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              user={{
                _id: this.state.uid,
                avatar: 'https://placeimg.com/140/140/any',
              }}
            />
            {Platform.OS === 'android' ? (
              <KeyboardAvoidingView behavior="height" />
            ) : null}
          </View>
        );
      }
    }

//To be able to use KeyboardAvoidingView component we have to set flex to 1
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

//Using PropTypes is a usefull way to discover bugs by expecting a certain value-type from the defiened props
//Setting the Name and the Color props to expect string type
Chat.propTypes = {
  name: propTypes.string,
  color: propTypes.string,
  user: propTypes.object,
  _id: propTypes.string,
}