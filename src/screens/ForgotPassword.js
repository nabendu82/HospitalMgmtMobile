import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../../assets/icon.png";
import { connect } from "react-redux";
import { resetPassword } from "../actions/login";
import LoadingScreen from "../components/LoadingScreen";
import Toast, { DURATION } from "react-native-easy-toast";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorObj: {
        email: false,
        password: false,
        confirmPassword: false
      }
    };
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };
  handleConfirmPasswordChange = confirmPassword => {
    this.setState({ confirmPassword });
  };

  handleResetPress = () => {
    let that = this;
    const { email, password, confirmPassword, errorObj } = this.state;
    if (email && password && confirmPassword && this.isValidEmail(email) && confirmPassword === password) {
      errorObj.email = false;
      errorObj.password = false;
      errorObj.confirmPassword = false;
      this.setState(
        {
          errorObj
        },
        () => {
          this.props.resetPassword(email, password, that);
        }
      );
    } else {
      if (!email || !this.isValidEmail(email)) {
        errorObj.email = true;
      } else {
        errorObj.email = false;
      }
      if (!password) {
        errorObj.password = true;
      } else {
        errorObj.password = false;
      }
      if(!confirmPassword) {
          errorObj.confirmPassword = true;
      } else {
          errorObj.confirmPassword = false;
      }
      console.log("password EQUALITY", password && confirmPassword && password !== confirmPassword);
      if(password && confirmPassword && password !== confirmPassword){
          errorObj.password = true;
          errorObj.confirmPassword = true;
          that.refs.toast.show('Password and Confirm Password didn\'t match.');
      } else {
          if(password && confirmPassword && password.toString().trim(' ').length && confirmPassword.toString().trim(' ').length){
              errorObj.password = false;
              errorObj.confirmPassword = false;
          } else {
              errorObj.password = true;
              errorObj.confirmPassword = true;
          }
      }
      console.log("err obj ", errorObj);
      this.setState({
        errorObj
      });
    }
  };

  isValidEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    const { email, password, confirmPassword, errorObj } = this.state;
    const { loading } = this.props;
    if (loading) {
      return <LoadingScreen />;
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
          <FormTextInput
            style={errorObj.confirmPassword ? styles.errorClass : {}}
            autoCapitalize="none"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={this.handleConfirmPasswordChange}
            placeholder={"Confirm Password"}
          />
          <Button
            onPress={this.handleResetPress}
            title="Reset"
            buttonStyle={styles.resetBtn}
            accessibilityLabel="Reset Password"
          />
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.signUpBtn}>New User ? Sign up</Text>
          </TouchableOpacity> */}
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
  resetBtn: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  signUpBtn: {
    padding: 5,
    fontSize: 15,
    color: "blue"
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
  };
};

export default connect(
  mapStateToProps,
  { resetPassword }
)(ForgotPassword);
