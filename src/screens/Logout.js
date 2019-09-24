import React from 'react';
import { View, Text, Alert, TouchableOpacity } from "react-native";

const Logout = (props) => {
    logout = () => {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
            )
    }
    return (
      <View style={{flex: 1, marginTop: 100}}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
}

export default Logout;