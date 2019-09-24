import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Header = (props) => {
    return (
      <View style={styles.headerArea}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Entypo name="menu" size={40} />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{props.title || ''}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  headerArea: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ff7e02",
    // headerTitleStyle: {
    //   ...Platform.select({
    //     ios: { fontFamily: "Arial" },
    //     android: { fontFamily: "Roboto" }
    //   })
    // }
  },
  headerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
});

export default Header;