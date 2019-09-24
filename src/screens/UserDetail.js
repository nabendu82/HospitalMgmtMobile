import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform
  // Button
} from "react-native";
import { connect } from "react-redux";
import { getUserDetail, updateUserDetail } from "../actions/user";
import { TextField } from "react-native-material-textfield";
import CustomButton from "../components/CustomButton";
import Toast, { DURATION } from "react-native-easy-toast";
import { Dropdown } from "react-native-material-dropdown";
import CustomDateTimePicker from "../components/CustomDateTimePicker";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.id) ||
        "",
      selectedUser: {
        name: "",
        email: "",
        role: "",
      },
      errorObj: {
        name: false,
        email: false,
        role: false,
      },
      mode:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.mode) ||
        "view"
    };
    this.role = [
      {
        value: "Admin"
      },
      {
        value: "Ops"
      },
      {
        value: "Normal"
      }
    ];
  }
  componentWillMount() {
    const { id } =
      (this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params) ||
      "";
    if (id) {
      this.props.getUserDetail(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("userDetail:------", nextProps);
    const { userDetail } = nextProps;
    let selectedUser = this.state.selectedUser;
    if (Object.keys(userDetail).length) {
      selectedUser = userDetail;
      this.setState({ selectedUser });
    }
  }
  onInputChange = (value, key) => {
    const { selectedUser } = this.state;
    selectedUser[key] = value;
    this.setState({ selectedUser });
  };
  onUpdate = () => {
    console.log("update called");
    const { selectedUser, selectedUserId } = this.state;
    this.props.updateUserDetail(selectedUserId, selectedUser, this);
  };
  cancel = () => {
    this.props.navigation.goBack();
  };
  render() {
    const {
      name,
      email,
      role,
      errorObj
    } = this.state.selectedUser;
    const { mode } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.parentContainer}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
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
            <View style={styles.formContainer}>
              <TextField
                label="Name"
                autoCapitalize="none"
                value={name}
                disabled={false}
                onChangeText={name => this.onInputChange(name, "name")}
                labelPadding={8}
              />
              <TextField
                label="Email"
                autoCapitalize="none"
                value={email}
                disabled={false}
                onChangeText={email => this.onInputChange(email, "email")}
                labelPadding={8}
              />
              <Dropdown
                // baseColor={errorObj.patientstatus ? "red" : "grey"}
                label="Select Role"
                data={this.role}
                onChangeText={role => this.onInputChange(role, "role")}
                value={role}
              />
              <View style={styles.submitBtn}>
                <CustomButton
                  onPress={mode === "view" ? () => {} : this.onUpdate}
                  title="Update"
                  buttonStyle={mode === "view" ? styles.disabledBtn : {}}
                  accessibilityLabel="Update User"
                />
                <CustomButton
                  onPress={this.cancel}
                  title="Cancel"
                  buttonStyle={{
                    backgroundColor: "red",
                    marginTop: 20
                  }}
                  accessibilityLabel="Cancel"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    backgroundColor: "white",
    padding: 10
  },
  submitBtn: {
    marginTop: 10
  },
  btnTextStyle: {
    color: "white"
  },
  disabledBtn: {
    backgroundColor: "#f6f7f9"
  }
});
const mapStateToProps = state => {
  const {
    isLoading,
    isError,
    userDetail,
    errorDetail
  } = state.userReducer;
  return {
    isLoading,
    isError,
    userDetail,
    errorDetail
  };
};
export default connect(
  mapStateToProps,
  { getUserDetail, updateUserDetail }
)(UserDetail);
