
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { registerPatient } from "../actions/patient";
import { getHospitalList } from "../actions/hospital";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import Header from "../components/Header";
// import { Button } from "react-native-elements";
import CustomButton from "../components/CustomButton";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import Toast, { DURATION } from "react-native-easy-toast";
import ButtonSpinner from "../components/ButtonSpinner";

class PatientRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      age: "",
      gender: "",
      speciality: "",
      hospital: "",
      doctor: "",
      nationality: "",
      date: "",
      hospitalList: [],
      selectedHospital: "",
      errorObj: {
        name: false,
        mobile: false,
        age: false,
        gender: false,
        speciality: false,
        hospital: false,
        doctor: false,
        nationality: false,
        date: false
      }
    };
    this.genderData = [
      {
        value: "Male"
      },
      {
        value: "Female"
      },
      {
        value: "Others"
      }
    ];
  }
  componentWillMount() {
      this.props.getHospitalList(this);
  }
  componentWillReceiveProps(nextProps) {
    const { hospitalList, isPatientRegistrationDone } = nextProps;
    if (hospitalList && hospitalList.length) {
      let modifiedHospitalList = hospitalList;
      modifiedHospitalList = modifiedHospitalList.map(function(el) {
        var o = Object.assign({}, el);
        o.value = el.name;
        return o;
      });
      this.setState({
        hospitalList: modifiedHospitalList
      });
    }
    if (isPatientRegistrationDone) {
        this.resetState();
    }
  }
  resetState = () => {
    this.setState({
      name: "",
      mobile: "",
      age: "",
      gender: "",
      speciality: "",
      hospital: "",
      doctor: "",
      nationality: "",
      date: "",
      selectedHospital: "",
      errorObj: {
        name: false,
        mobile: false,
        age: false,
        gender: false,
        speciality: false,
        hospital: false,
        doctor: false,
        nationality: false,
        date: false
      }
    });
  }
  onInputChange = (value, key) => {
    this.setState({ [key] : value });
  };
  onRegister = () => {
    console.log("update called");
    this.isFormValid()
      .then(res => {
        const { name, mobile, age, gender, speciality, selectedHospital, doctor, nationality, date } = this.state;
        let obj = {
          name: name,
          mobile: mobile,
          age: age,
          gender: gender,
          speciality: speciality,
          hospital: selectedHospital,
          doctor: doctor,
          nationality: nationality,
          date: date
        };
        this.props.registerPatient("patients", obj, this);
      })
      .catch(err => {
        this.refs.toast.show("Please fill all the required fields");
      });
  };
  cancel = () => {
      this.props.navigation.navigate("Home");
  }
  isFormValid = () => {
      return new Promise((resolve, reject) => {
          const {name, mobile, age, errorObj } = this.state;
          errorObj.name = !name ? true : false;
          errorObj.mobile = !mobile ? true : false;
          if(mobile){
              errorObj.mobile = (mobile && (mobile.toString().length > 10 || mobile.toString().length< 6)) ? true : false;
          }
          errorObj.age = !age ? true : false;
          this.setState({
              errorObj
          }, () => {
                const { errorObj } = this.state;
                if(!errorObj.name && !errorObj.mobile && !errorObj.age){
                    resolve(true);
                }
                reject(false);
          })
      })
  }
  render() {
    const {
      name,
      mobile,
      age,
      gender,
      speciality,
      hospital,
      doctor,
      nationality,
      date,
      hospitalList,
      selectedHospital,
      errorObj
    } = this.state;
    const { isRegistering } = this.props;
    console.log("list rece", selectedHospital);
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
                error={errorObj.name ? "Required" : ""}
                value={name}
                disabled={false}
                onChangeText={name => this.onInputChange(name, "name")}
                labelPadding={8}
              />
              <TextField
                label="Mobile"
                autoCapitalize="none"
                error={errorObj.mobile ? "Required" : ""}
                value={mobile.toString()}
                disabled={false}
                keyboardType={"numeric"}
                maxLength={10}
                onChangeText={mobile =>
                  this.onInputChange(mobile, "mobile")
                }
                labelPadding={8}
              />
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    alignSelf: "flex-start",
                    flex: 1,
                    marginRight: 5
                  }}
                >
                  <TextField
                    label="Age"
                    autoCapitalize="none"
                    error={errorObj.age ? "Required" : ""}
                    value={age.toString()}
                    keyboardType={"numeric"}
                    maxLength={10}
                    disabled={false}
                    onChangeText={age => this.onInputChange(age, "age")}
                    labelPadding={8}
                  />
                </View>
                <View
                  style={{ alignSelf: "flex-end", flex: 1, marginLeft: 5 }}
                >
                  <Dropdown
                    baseColor={errorObj.gender ? "red" : "grey"}
                    label="Gender"
                    data={this.genderData}
                    onChangeText={gender =>
                      this.onInputChange(gender, "gender")
                    }
                    value={gender}
                  />
                </View>
              </View>
              <TextField
                label="Speciality"
                value={speciality}
                disabled={false}
                onChangeText={speciality =>
                  this.onInputChange(speciality, "speciality")
                }
                labelPadding={8}
              />
              <Dropdown
                baseColor={errorObj.selectedHospital ? "red" : "grey"}
                label="Select Hospital"
                data={hospitalList}
                onChangeText={selectedHospital =>
                  this.onInputChange(selectedHospital, "selectedHospital")
                }
                value={selectedHospital}
              />
              <TextField
                label="Doctor"
                value={doctor}
                disabled={false}
                onChangeText={doctor =>
                  this.onInputChange(doctor, "doctor")
                }
                labelPadding={8}
              />
              <TextField
                label="Nationality"
                value={nationality}
                disabled={false}
                onChangeText={nationality =>
                  this.onInputChange(nationality, "nationality")
                }
                labelPadding={8}
              />
              <CustomDateTimePicker
                value={date}
                handleDatePicked={date =>
                  this.onInputChange(date.toString(), "date")
                }
              />
              {isRegistering ? (
                <ButtonSpinner defaultLoading={isRegistering} />
              ) : (
                <CustomButton
                  onPress={this.onRegister}
                  title="Register Patient"
                  accessibilityLabel="Register Patient"
                />
              )}

              {!isRegistering && (
                <CustomButton
                  onPress={this.cancel}
                  title="Cancel"
                  buttonStyle={{ backgroundColor: "red", marginTop: 20 }}
                  accessibilityLabel="Cancel"
                />
              )}
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
    // backgroundColor: "yellow"
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    backgroundColor: "white",
    // width: '80%',
    padding: 10
  },
  submitBtn: {
    backgroundColor: "#202f9f",
    marginTop: 10
  },
  btnTextStyle: {
    color: "white"
  }
});
const mapStateToProps = state => {
  const {
    isLoading,
    isError,
    patientDetail,
    errorDetail,
    isRegistering,
    isPatientRegistrationDone
  } = state.patientReducer;
  const { hospitalList } = state.hospitalReducer;
  return {
    isLoading,
    isError,
    patientDetail,
    errorDetail,
    hospitalList,
    isRegistering,
    isPatientRegistrationDone
  };
};
export default connect(
  mapStateToProps,
  { registerPatient, getHospitalList }
)(PatientRegistration);