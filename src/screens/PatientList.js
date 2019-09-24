import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform
} from "react-native";
import SearchBar from "../components/SearchBar";
import api from "../api";
import { patientList } from "../constants";
import Card from "../components/Card";
import { connect } from "react-redux";
import { getAllPatients, deletePatient, getPatientDetail } from "../actions/patient";
import LoadingScreen from "../components/LoadingScreen";
import { Entypo } from '@expo/vector-icons';
import Header from '../components/Header';
import { debounce, filterByValue } from "../utils";
import Toast, { DURATION } from "react-native-easy-toast";

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      isLoading: true,
      patientList: [],
      filteredList: []
    };
  }
  componentDidMount() {
    this.props.getAllPatients(this);
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, patientList } = nextProps;
    if (patientList && patientList.length) {
      this.setState({
        isLoading: false,
        patientList,
        filteredList: patientList
      });
    } else {
      this.setState({
        isLoading: false
      })
    }
  }
  onTermChange = event => {
    const { text } = event.nativeEvent;
    this.setState(
      {
        term: text
      },
      () => {
        this.handleSearchEvent();
      }
    );
  };
  handleSearchEvent = debounce(() => {
    const { term, patientList } = this.state;
    let filteredList = this.state.filteredList;
    if (term && term.trim() && term.trim().length > 2) {
      filteredList = filterByValue(patientList, term);
      this.setState({
        filteredList
      });
    } else {
      if (term.length <= 2) {
        this.setState({
          filteredList: patientList
        });
      }
    }
  }, 500);
  onTermSubmit = () => {
    this.handleSearchEvent();
  };

  editItem = id => {
    this.props.navigation.navigate("PatientDetail", {
      id,
      title: "Edit Patient",
      mode: "edit"
    });
  };
  deleteItem = id => {
    console.log("delete ", id);
    this.props.deletePatient(id, this);
  };
  viewItem = id => {
    console.log("view:- ", id);
    // this.props.getPatientDetail(id);
    this.props.navigation.navigate("PatientDetail", {
      id,
      title: "View Patient",
      mode: "view"
    });
  };
  render() {
    const { term, isLoading, patientList, filteredList } = this.state;
    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Header title="Patient List" {...this.props} />
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
          <View style={styles.searchBarArea}>
            <SearchBar
              term={term}
              onTermChange={this.onTermChange}
              onTermSubmit={this.onTermSubmit}
            />
          </View>
          <ScrollView style={styles.listSection}>
            {filteredList && !filteredList.length && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  paddingTop: 20
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 17,
                    fontWeight: "bold"
                  }}
                >{`'0' items found `}</Text>
              </View>
            )}
            {filteredList.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  editItem={this.editItem}
                  viewItem={this.viewItem}
                  deleteItem={this.deleteItem}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listSection: {
    marginTop: 20,
    height: Dimensions.get("window").height - 180
  },
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: '#ffffff'
  },
  headerArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ff7e02"
  },
  headerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  },
  searchBarArea: {
    // backgroundColor: 'yellow',
    paddingTop: 20,
    // flex: 1,
    // marginTop: 40
  }
});

const mapStateToProps = (state) => {
  const { isLoading, isError, patientList, errorDetail } = state.patientReducer;
  return {
    isLoading,
    isError,
    patientList,
    errorDetail
  };
};

export default connect(
  mapStateToProps,
  { getAllPatients, deletePatient, getPatientDetail }
)(PatientList);
