import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');

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





      componentDidMount() {
        // Set the name property to be included in the navigation bar
        let name = this.props.route.params.name;
    
        this.setState({
          messages: [
            {
              _id: 2,
              text: `${name} has entered the chat`,
              createdAt: new Date(),
              system: true,
            },
          ],
        });

        this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(
      this.onCollectionUpdate
    );

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
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
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

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
            user: data.user,
          });
        });
        this.setState({ messages });
    };
    

    //Bubble styling imported from gifted chat library
    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: 'blue'
              }
            }}
          />
        )
      };


    render() {
        //let color = this.props.route.params.color;              //Using the color prop passed on from the Start component
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        return (
                // Using GiftedChat library creating the UI for the app and wrapping it inside of a View to make use of the KeyboardAvoidingView
            <View style={styles.container}>
                <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
            //  <View style={[styles.container, { backgroundColor: color }]}>
            //  <Text>Hello World!</Text>
            //  </View>
        );
    };
}

//To be able to use KeyboardAvoidingView component we have to set flex to 1
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})