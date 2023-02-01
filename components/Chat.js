import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default class Chat extends React.Component {

    componentDidMount(){
        let name = this.props.route.params.name; // OR ...        
        // let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });       //Using props passed on from the Start component
    }

    render() {
        let color = this.props.route.params.color;              //Using the color prop passed on from the Start component
        return (
            <View style={[styles.container, { backgroundColor: color }]}>
            <Text>Hello World!</Text>
          </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })