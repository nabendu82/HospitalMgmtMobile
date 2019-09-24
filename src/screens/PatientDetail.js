import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { getPatientDetail, updatePatientDetail } from "../actions/patient";
import { TextField } from "react-native-material-textfield";
import CustomButton from "../components/CustomButton";
import Toast, { DURATION } from "react-native-easy-toast";
import { Dropdown } from "react-native-material-dropdown";
import CustomDateTimePicker from "../components/CustomDateTimePicker";


class PatientDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
          selectedPatientId:
            (this.props.navigation &&
              this.props.navigation.state &&
              this.props.navigation.state.params &&
              this.props.navigation.state.params.id) ||
            "",
          selectedPatient: {
            name: "",
            mobile: "",
            age: "",
            gender: "",
            doctor: "",
            nationality: "",
            speciality: "",
            date: "",
            patientstatus: ""
          },
          errorObj: {
            name: false,
            mobile: false,
            age: false,
            gender: false,
            date: false
          },
          mode:
            (this.props.navigation &&
              this.props.navigation.state &&
              this.props.navigation.state.params &&
              this.props.navigation.state.params.mode) ||
            "view"
        };
        this.patientStatus = [
          {
            value: "Submitted"
          },
          {
            value: "Ref to Hospital"
          },
          {
            value: "Hospital Accepted"
          },
          {
            value: "Hospital Rejected"
          },
          {
            value: "OP Under Treatment"
          },
          {
            value: "OP Treatment Done"
          },
          {
            value: "IP Under Treatment"
          },
          {
            value: "IP Treatment Done"
          },
          {
            value: "Discharged"
          },
          {
            value: "Points in Progress"
          },
          {
            value: "Claim Now"
          },
          {
            value: "Points Redeemed"
          }
        ];
    }
    componentWillMount(){
        const { id } = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params || '';
        if(id){
            this.props.getPatientDetail(id);
        }
    }
    componentWillReceiveProps(nextProps){
        const { patientDetail } = nextProps;
        let selectedPatient = this.state.selectedPatient;
        if(Object.keys(patientDetail).length){
          selectedPatient = patientDetail;
          this.setState({selectedPatient});
        }
    }
    onInputChange = (value, key) => {
        const { selectedPatient } = this.state;
        selectedPatient[key] = value;
        this.setState({selectedPatient});
    }
    onUpdate = () => {
        console.log('update called');
        const { selectedPatient, selectedPatientId } = this.state;
        this.props.updatePatientDetail(selectedPatientId, selectedPatient, this);
    }
    cancel = () => {
      this.props.navigation.goBack();
    }
    render(){
        const { name, mobile, age, gender, doctor, nationality, speciality, date, patientstatus, errorObj } = this.state.selectedPatient
        const { mode } = this.state;
        console.log('mode', mode)
        // console.log('name',name, 'mobile', mobile, 'age',age, 'gender',gender, 'doctor',doctor, 'nationality', nationality, 'speciality',speciality, "patientstatus",patientstatus)
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
                    label="Mobile"
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
                        flex: 1,
                        alignSelf: "flex-start",
                        marginRight: 5
                      }}
                    >
                      <TextField
                        label="Age"
                        value={age}
                        disabled={false}
                        onChangeText={age => this.onInputChange(age, "age")}
                        labelPadding={8}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: "flex-end",
                        marginLeft: 5
                      }}
                    >
                      <TextField
                        label="Gender"
                        value={gender}
                        disabled={false}
                        onChangeText={gender =>
                          this.onInputChange(gender, "gender")
                        }
                        labelPadding={8}
                      />
                    </View>
                  </View>
                  <TextField
                    label="Doctor"
                    value={doctor}
                    disabled={false}
                    onChangeText={doctor =>
                      this.onInputChange(doctor, "doctor")
                    }
                    labelPadding={8}
                  />
                  <Dropdown
                    // baseColor={errorObj.patientstatus ? "red" : "grey"}
                    label="Select Patient Status"
                    data={this.patientStatus}
                    onChangeText={patientstatus =>
                      this.onInputChange(patientstatus, "patientstatus")
                    }
                    value={patientstatus}
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
                  <TextField
                    label="Speciality"
                    value={speciality}
                    disabled={false}
                    onChangeText={speciality =>
                      this.onInputChange(speciality, "speciality")
                    }
                    labelPadding={8}
                  />
                  <CustomDateTimePicker
                    value={date}
                    handleDatePicked={date =>
                      this.onInputChange(date.toString(), "date")
                    }
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
    backgroundColor: "#f6f7f9",
  }
});
const mapStateToProps = state => {
  const { isLoading, isError, patientDetail, errorDetail } = state.patientReducer;
  return {
    isLoading,
    isError,
    patientDetail,
    errorDetail
  };
};
export default connect(mapStateToProps, { getPatientDetail, updatePatientDetail })(PatientDetail);