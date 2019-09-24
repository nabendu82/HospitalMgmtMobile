import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { connect } from "react-redux";
import { getUserToken } from "../actions/login";

class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
      console.log('props in did mount:- ', this.props.token.token)
    this.props
      .getUserToken()
      .then(() => {
        this.props.navigation.navigate(
          this.props.token.token ? "App" : "Auth"
        );
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = (state) => {
    const { token } = state.loginReducer;
    return { token };
}

const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
