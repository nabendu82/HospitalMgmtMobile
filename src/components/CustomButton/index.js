import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "./Button.component.style.js";

class CustomButton extends Component {
  render() {
    return (
        <Button
          buttonStyle={styles.btnDefaultStyle}
          {...this.props}
        />
    );
  }
}

export default CustomButton;