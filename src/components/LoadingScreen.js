import React, { Component } from "react";
import { SafeAreaView, Text, StyleSheet, View, ActivityIndicator } from "react-native";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <SafeAreaView style={styles.safeAreaParent}>
          <ActivityIndicator style={styles.iconStyle} size="large" color="#ff7e02" />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaParent: {
    backgroundColor: "#ffffff"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  iconStyle: {
    flex: 1
  }
});
