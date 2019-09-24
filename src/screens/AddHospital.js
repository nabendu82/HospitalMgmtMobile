import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import CustomButton from "../components/CustomButton";
import { connect } from "react-redux";
import { addHospital } from "../actions/hospital";
import { TextField } from "react-native-material-textfield";
import Header from "../components/Header";
import { isValidEmail } from "../utils";
import Toast, { DURATION } from "react-native-easy-toast";


class AddHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      area: "",
      city: "",
      country: "",
      email: "",
      errorObj: {
        name: false,
        mobile: false,
        area: false,
        city: false,
        country: false,
        email: false,
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    const { hospitalAdded, isError, isLoading, errorDetail } = nextProps;
    if(isError){
      this.refs.toast.show("Something went wrong. Please try after sometime.");
    }
    if(hospitalAdded){
      this.refs.toast.show("Successfully Added.");
      this.resetState();
    }
  }
  resetState = () => {
    this.setState({
      name: "",
      mobile: "",
      area: "",
      city: "",
      country: "",
      email: "",
      errorObj: {
        name: false,
        mobile: false,
        area: false,
        city: false,
        country: false,
        email: false
      }
    });
  }
  onInputChange = (value, key) => {
    this.setState({ [key]: value });
  };
  addHospital = () => {
    this.ifFormValid()
    .then((res) => {
      const { name,mobile,area,city, country, email } = this.state;
      let obj = {name,mobile,area,city,country, email};
      this.props.addHospital("hospitals", obj, this);
    })
    .catch((err) => {
      this.refs.toast.show("Please fill all the required fields");
    })
  };
  cancel = () => {
    this.props.navigation &&
      this.props.navigation.navigate &&
      this.props.navigation.navigate("Home");
  }
  ifFormValid = () => {
    return new Promise((resolve, reject) => {
      const { errorObj, name, mobile, city, email } = this.state;
    errorObj.name = !name ? true : false;
    errorObj.mobile = !mobile ? true : false;
    errorObj.mobile = (mobile && (mobile.length > 10 || mobile.length< 6)) ? true : false;
    errorObj.city = !city ? true : false;
    errorObj.email = !email ? true : false;
    errorObj.email = !(email && isValidEmail(email));
    this.setState({
      errorObj
    }, () => {
      const { errorObj } = this.state;
      if(!errorObj.name && !errorObj.mobile && !errorObj.city && !errorObj.email){
        resolve(true);
      }
      reject(false);
    })
    })
  }
  render() {
    const { name, mobile, area, city, country, email, errorObj } = this.state;
    return (
      <View style={styles.mainContainer}>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <Header title="Add Hospital" {...this.props} />
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
        <ScrollView>
            <TextField
              label="* Name"
              autoCapitalize="none"
              error={errorObj.name ? "Required" : ""}
              value={name}
              onChangeText={name => this.onInputChange(name, "name")}
              labelPadding={8}
            />
            <TextField
              label="* Mobile"
              error={errorObj.mobile ? "Required" : ""}
              value={mobile}
              keyboardType={"numeric"}
              maxLength={10}
              characterRestriction={10}
              onChangeText={mobile => this.onInputChange(mobile, "mobile")}
              labelPadding={8}
            />
            <TextField
              label="Area"
              autoCapitalize="none"
              value={area}
              onChangeText={area => this.onInputChange(area, "area")}
              labelPadding={8}
            />
            <TextField
              label="* City"
              autoCapitalize="none"
              error={errorObj.city ? "Required" : ""}
              value={city}
              onChangeText={city => this.onInputChange(city, "city")}
              labelPadding={8}
            />
            <TextField
              label="Country"
              autoCapitalize="none"
              value={country}
              onChangeText={country =>
                this.onInputChange(country, "country")
              }
              labelPadding={8}
            />
            <TextField
              label="* Email"
              autoCapitalize="none"
              error={errorObj.email ? "Required" : ""}
              value={email}
              onChangeText={email => this.onInputChange(email, "email")}
              labelPadding={8}
            />
            <View style={styles.btnSection}>
              <CustomButton
                onPress={this.addHospital}
                title="Add Hospital"
                accessibilityLabel="Add Hospital"
              />
              <CustomButton
                onPress={this.cancel}
                title="Cancel"
                buttonStyle={{ backgroundColor: "red", marginTop: 20 }}
                accessibilityLabel="Cancel"
              />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start"
  },
  subContainer: {
    // flex: 1,
    paddingTop: 10,
    // width: "80%",
    // backgroundColor: "yellow",
    justifyContent: "flex-start",
    margin: 10
  },
  rowItem: {
    marginTop: 10
  },
  btnSection: {
    // flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  errorClass: {
    borderBottomColor: "red",
    borderBottomWidth: 2
  }
});
const mapStateToProps = state => {
  const {
    isLoading,
    isError,
    hospitalAdded,
    errorDetail
  } = state.hospitalReducer;

  return {
    isLoading,
    isError,
    hospitalAdded,
    errorDetail
  };
};
export default connect(
  mapStateToProps,
  { addHospital }
)(AddHospital);
