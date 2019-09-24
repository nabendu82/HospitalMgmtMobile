import React from "react";
import { StyleSheet, Text } from "react-native";
import SpinnerButton from "react-native-spinner-button";

const ButtonSpinner = (props) => {
    return (
      <SpinnerButton
        buttonStyle={styles.buttonStyle}
        isLoading={props.defaultLoading || true}
        indicatorCount={10}
        spinnerType={"UIActivityIndicator"}
      >
        <Text style={styles.buttonText}>Default Or Ball SpinnerButton</Text>
      </SpinnerButton>
    );
}
const styles = StyleSheet.create({
  defaultButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ff7e02"
  },
  buttonStyle: {
    backgroundColor: "#ff7e02"
  },
  buttonText: {
    color: "white"
  }
});

export default ButtonSpinner;