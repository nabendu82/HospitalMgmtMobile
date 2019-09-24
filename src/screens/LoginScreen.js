import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import { Button } from "react-native-elements";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../../assets/icon.png";
import { connect } from 'react-redux';
import { login } from '../actions/login';
import LoadingScreen from '../components/LoadingScreen';
import Toast, { DURATION } from "react-native-easy-toast";
import { isValidEmail } from "../utils";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      // email: "hemant@gmail.com",
      // password: "hemant",
      email: "nabendu.biswas@gmail.com",
      password: "123456",
      errorObj: {
        email: false,
        password: false
      }
    };
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleLoginPress = () => {
    let that = this;
    const { email, password, errorObj } = this.state;
    if (email && password && isValidEmail(email)) {
      errorObj.email = false;
      errorObj.password = false;
      this.setState({
        errorObj
      }, () => {
        this.props.login(email, password, that);
      })
    } else {
      if (!email || !isValidEmail(email)) {
        errorObj.email = true;
      } else {
        errorObj.email = false;
      }
      if (!password) {
        errorObj.password = true;
      } else {
        errorObj.password = false;
      }
      this.setState({
        errorObj
      });
    }
  };

  render() {
    const { email, password, errorObj } = this.state;
    const { loading } = this.props;
    if(loading){
      return <LoadingScreen />
    }
    
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          style={{ backgroundColor: "red" }}
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "white" }}
        />
        <Image source={imageLogo} style={styles.logo} />
        <KeyboardAvoidingView
          style={styles.form}
          behavior="padding"
          enabled
        >
          <FormTextInput
            style={errorObj.email ? styles.errorClass : {}}
            autoCapitalize="none"
            value={email}
            onChangeText={this.handleEmailChange}
            placeholder={"Enter Email"}
          />
          <FormTextInput
            style={errorObj.password ? styles.errorClass : {}}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={this.handlePasswordChange}
            placeholder={"Password"}
          />
          <Button
            onPress={this.handleLoginPress}
            title="Login"
            buttonStyle={styles.loginBtn}
            accessibilityLabel="Login"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ForgotPassword")
              }
            >
              <Text style={styles.forgotPassText}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.signUpText}>New User ? Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // backgroundColor: 'yellow',
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    width: "80%"
  },
  loginBtn: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  signUpText: {
    padding: 5,
    fontSize: 15,
    color: "blue"
  },
  forgotPassText: {
    padding: 5,
    fontSize: 15,
    color: "red",
  },
  errorClass: {
    borderBottomColor: "red",
    borderBottomWidth: 2
  }
});

const mapStateToProps = state => {
  const { token, user, loading } = state.loginReducer;
  return {
    token,
    user,
    loading
  }
}

export default connect(mapStateToProps, { login })(LoginScreen);