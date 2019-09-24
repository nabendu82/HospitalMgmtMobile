import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

class FormTextInput extends Component {
  render() {
    // We define our own custom style for the TextInput, but
    // we still want to allow the developer to supply its
    // own additional style if needed.
    // To do so, we extract the "style" prop from all the
    // other props to prevent it to override our own custom
    // style.
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={"#0000ff"}
        // Add the externally specified style to our own
        // custom one
        style={[styles.textInput, style]}
        // ...and then spread all the other props
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#c0c0c0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

export default FormTextInput;
