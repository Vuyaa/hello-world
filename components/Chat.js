import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: [],    //Setting messages state to an empty array
        }
    }



    componentDidMount() {
        this.setState({
            messages: [      //Then we populate this array with message objects 
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                 },
                 {
                  _id: 2,
                  text: 'This is a system message',
                  createdAt: new Date(),
                  system: true,
                 },
              ]
        })
    }

    //Bubble styling imported from gifted chat library
    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#000'
              }
            }}
          />
        )
      }

      
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

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