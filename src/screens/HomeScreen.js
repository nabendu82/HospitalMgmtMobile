import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, Linking } from "react-native";
import SearchBar from '../components/SearchBar';
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Header from '../components/Header';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  dialCall = number => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  render() {
    const { user } = this.props;
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="yellow"
          translucent={true}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Header title="Home" {...this.props} />
          <View style={styles.cardSection}>
            <TouchableOpacity
              style={styles.cardArea}
              onPress={() =>
                this.props.navigation.navigate("PatientRegistration")
              }
            >
              <Text style={styles.cardText}>Patient Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardArea}
              onPress={() => this.props.navigation.navigate("MyPatients")}
            >
              <Text style={styles.cardText}>Patient List</Text>
            </TouchableOpacity>
            {user && user.role && user.role === "Admin" ? (
              <TouchableOpacity
                style={styles.cardArea}
                onPress={() => this.props.navigation.navigate("PatientList")}
              >
                <Text style={styles.cardText}>All Patient List</Text>
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
          {/* Linking.openURL(`tel:${phoneNumber}`) */}
          <TouchableOpacity
            style={styles.footerView}
            onPress={() => {
              this.dialCall(`+918796543210`);
            }}
          >
            <View style={styles.footerCard}>
              <View style={styles.leftSec}>
                <FontAwesome
                  name="question-circle"
                  color={"#fda504"}
                  style={styles.iconStyle}
                  size={35}
                />
              </View>
              <View style={styles.rightSec}>
                <View>
                  <Text style={styles.mainTextStyle}>Need help?</Text>
                </View>
                <View>
                  <Text>Get in touch with your Account</Text>
                </View>
                <View>
                  <Text>Manager.</Text>
                </View>
                <View>
                  <Text>(or) Call:- +918796543210</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ff7e02"
  },
  headerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    // backgroundColor: "#ff7e02",
    // backgroundColor: "yellow",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 24) : 0
  },
  cardSection: {
    flex: 5,
    padding: 10,
    marginVertical: 80,
    backgroundColor: "#ffffff"
  },
  cardText: {
    fontSize: 18,
    alignSelf: "center"
  },
  cardArea: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 25,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center"
  },
  footerCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center"
    // marginBottom: 10
    // justifyContent: 'space-evenly'
  },
  iconStyle: {},
  leftSec: {
    alignContent: "center",
    padding: 15,
    alignSelf: "center"
  },
  rightSec: {
    //   backgroundColor: 'yellow'
    alignSelf: "flex-start"
  },
  mainTextStyle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  footerView: {
    flex: 2,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "flex-start"
  }
});

const mapStateToProps = (state) => {
  const { user } = state.loginReducer;
  return {
    user
  }
}

export default connect(mapStateToProps, {})(HomeScreen);