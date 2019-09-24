import React, { Component } from "react";
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text, Alert, AsyncStorage, StatusBar } from "react-native";
import { DrawerItems } from "react-navigation";
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { removeUserToken } from "../../actions/login";

class CustomDrawer extends Component {
  constructor(props){
    super(props);
  }
  logoutConfirm = () => {
    Alert.alert(
      "Logout",
      "Are you sure, you want to Logout ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.logout() }
      ],
      { cancelable: false }
    );
  };
  logout = () => {
    console.log('logout');
    this.props.removeUserToken(this);
    this.props.navigation.navigate('LoginScreen');
  }
  render(){
    const { user } = this.props;
    return(
      <ScrollView style={styles.drawerMenu}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={{ flex: 1, justifyContent: "center"}}>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "#ff7e02"
            }}
          >
            <Feather
              style={{ alignSelf: "flex-start" }}
              name="user"
              color='#ffffff'
              size={30}
            />
            <Text style={{ alignSelf: "center", paddingLeft: 30, fontSize: 15, fontWeight: 'bold' }}>
              {`${user.name} `}
            </Text>
          </View>
          <View>
            <DrawerItems
              activeBackgroundColor="#dcdcdc"
              activeTintColor="#dcdcdc"
              activeTintColor="white"
              iconContainerStyle=""
              useNativeAnimations={true}
              {...this.props}
              onItemPress={({ route, focused }) => {
                if(!focused) {
                  if(route.routeName === 'Logout'){
                    this.logoutConfirm();
                  } else {
                    setTimeout(() => {              
                      this.props.navigation.navigate(route.routeName)
                    }, 0)
                  }
                }
                this.props.navigation.navigate('DrawerClose');
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  drawerMenu: {
    flex: 1,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  sideMenuContainer: {
    //   flex: 1,
    //   flexDirection: 'row'
  }
});

const mapStateToProps = (state) => {
  const { user } = state.loginReducer;
  return {
    user
  };
}

export default connect(mapStateToProps, { removeUserToken })(CustomDrawer);
