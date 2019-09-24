import React, { Component } from "react";
import { View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextField } from "react-native-material-textfield";

export default class CustomDateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.props.handleDatePicked(date);
    this.hideDateTimePicker();
  };

  render() {
    const { value } = this.props;
    return (
      <>
        <TextField
          label="Select Date"
          value={value.toString()}
          // disabled={false}
          onFocus={this.showDateTimePicker}
          labelPadding={8}
        />
        <DateTimePicker
          mode={"datetime"}
          is24Hour={false}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}
