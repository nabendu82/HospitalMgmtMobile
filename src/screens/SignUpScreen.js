import React, { Component } from "react";
import { View, SafeAreaView, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import { connect } from 'react-redux';
import FormTextInput from "../components/FormTextInput";
import imageLogo from "../../assets/icon.png";
import { Dropdown } from "react-native-material-dropdown";
import { Button } from "react-native-elements";
import { isValidEmail } from "../utils";
import { registerUser } from '../actions/user';
import Toast, { DURATION } from "react-native-easy-toast";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      isDoctor: "",
      role: "",
      regId: "",
      errorObj: {
        name: false,
        mobile: false,
        email: false,
        password: false,
        confirmPassword: false,
        role: false
      },
      isFormValid: false
    };
  }
  handleNameChange = name => {
    this.setState({ name });
  };
  handleMobileChange = mobile => {
    if (/^\d+$/.test(mobile.toString())) {
      this.setState({ mobile });
    }
  };
  handleEmailChange = email => {
    this.setState({ email });
  };
  handlePasswordChange = password => {
    this.setState({ password });
  };
  handleRoleChange = role => {
    console.log("role", role);
  };
  handleSignUp = () => {
    this.ifFormValid()
      .then(res => {
        const { name, email, role, password } = this.state;
        let obj = {
          name,
          email,
          password,
          avatar: role === "Yes" ? "Doctor" : "NotDoctor"
        };
        console.log("form verified:--------- ", obj);
        this.props.registerUser('users', obj, this);

      })
      .catch(err => {
        console.log("error in validating form", err);
        console.log("errorObj", this.state.errorObj);
      });
  };
  ifFormValid = () => {
    return new Promise((resolve, reject) => {
      const {
        errorObj,
        name,
        mobile,
        password,
        confirmPassword,
        email,
        role
      } = this.state;
      errorObj.name = !name ? true : false;
      errorObj.mobile = !mobile ? true : false;
      if (mobile && (mobile.length <= 10 && mobile.length > 6)) {
        errorObj.mobile = false;
      } else {
        errorObj.mobile = true;
      }
      errorObj.email = !email ? true : false;
      errorObj.email = !(email && isValidEmail(email));
      errorObj.password = !password ? true : false;
      errorObj.confirmPassword = !confirmPassword ? true : false;
      errorObj.role = !role ? true : false;
      if (password && confirmPassword) {
        if (
          password.length === confirmPassword.length &&
          password === confirmPassword
        ) {
          errorObj.password = false;
          errorObj.confirmPassword = false;
        } else {
          errorObj.password = true;
          errorObj.confirmPassword = true;
        }
      }
      this.setState(
        {
          errorObj
        },
        () => {
          const { errorObj } = this.state;
          if (
            !errorObj.name &&
            !errorObj.mobile &&
            !errorObj.password &&
            !errorObj.confirmPassword &&
            !errorObj.role &&
            !errorObj.email
          ) {
            resolve(true);
          }
          reject(false);
        }
      );
    });
  };
  onInputChange = (value, key) => {
    this.setState({ [key]: value });
  };
  render() {
    let data = [
      {
        value: "Yes"
      },
      {
        value: "No"
      }
    ];
    const { name, mobile, email, password, confirmPassword, role, errorObj } = this.state;
    console.log("name render ---- ", errorObj.name);
    return (
      <View style={styles.container}>
          <Image source={imageLogo} style={styles.logo} />
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}
            >
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
            <ScrollView>
            <FormTextInput
              style={errorObj.name ? styles.errorClass : {}}
              autoCapitalize="none"
              value={name}
              onChangeText={this.handleNameChange}
              placeholder={"Name"}
              autoCorrect={false}
            />
            <FormTextInput
              style={errorObj.mobile ? styles.errorClass : {}}
              autoCapitalize="none"
              value={mobile}
              keyboardType={"numeric"}
              maxLength={10}
              onChangeText={e => this.handleMobileChange(e)}
              placeholder={"Mobile"}
            />
            <FormTextInput
              style={errorObj.email ? styles.errorClass : {}}
              autoCapitalize="none"
              value={email}
              onChangeText={this.handleEmailChange}
              placeholder={"Email"}
            />
            <Dropdown
              baseColor={errorObj.role ? "red" : "grey"}
              label="Are you a Doctor ?"
              data={data}
              value={role}
              onChangeText={role => this.onInputChange(role, "role")}
            />
            <FormTextInput
              style={errorObj.password ? styles.errorClass : {}}
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onValueChange={this.handleRoleChange}
              onChangeText={password =>
                this.onInputChange(password, "password")
              }
              placeholder={"Password"}
            />
            <FormTextInput
              style={errorObj.confirmPassword ? styles.errorClass : {}}
              autoCapitalize="none"
              secureTextEntry={true}
              value={confirmPassword}
              onValueChange={this.handleRoleChange}
              onChangeText={confirmPassword =>
                this.onInputChange(confirmPassword, "confirmPassword")
              }
              placeholder={"Confirm Password"}
            />
            <Button
              onPress={this.handleSignUp}
              title="Register"
              buttonStyle={styles.registerBtn}
              accessibilityLabel="Register"
            />
        </ScrollView>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  errorClass: {
    borderBottomColor: 'red',
    borderBottomWidth: 2
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  formContainer: {
    flex: 2,
    // justifyContent: "flex-start",
    width: "80%",
    // backgroundColor: 'yellow'
  },
  registerBtn: {
    backgroundColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});

const mapStateToProps = (state) =>{
  const { isLoading } = state.userReducer;
  return {
    isLoading
  }
} 
export default connect(mapStateToProps, { registerUser })(SignUpScreen);