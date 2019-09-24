import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import SearchBar from "../components/SearchBar";
import api from "../api";
import { getHospitalList } from "../actions/hospital";
import Card from "../components/Card";
import { connect } from "react-redux";
import { getAllPatients } from "../actions/patient";
import LoadingScreen from "../components/LoadingScreen";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";
import { debounce, filterByValue } from "../utils";

class HospitalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      isLoading: true,
      hospitalList: [],
      filteredList: []
    };
  }
  componentDidMount() {
    this.props.getHospitalList(this);
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, hospitalList } = nextProps;
    console.log("list recieved", hospitalList);
    if (hospitalList && hospitalList.length) {
      this.setState({
        isLoading: false,
        hospitalList,
        filteredList: hospitalList
      });
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
    const { term, hospitalList } = this.state;
    let filteredList = this.state.filteredList;
    if (term && term.trim() && term.trim().length > 2) {
      filteredList = filterByValue(hospitalList, term);
      this.setState({
        filteredList
      });
    } else {
      if (term.length <= 2) {
        this.setState({
          filteredList: hospitalList
        });
      }
    }
  }, 500);
  onTermSubmit = () => {
    console.log("filter here");
    this.handleSearchEvent();
  };

  editItem = id => {
    this.props.navigation.navigate("PatientDetail", {
      id,
      title: "Edit Patient"
    });
  };
  render() {
    const { term, isLoading, filteredList } = this.state;
    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Header title="Hospital List" {...this.props} />
          <View style={styles.searchBarArea}>
            <SearchBar
              term={term}
              onTermChange={this.onTermChange}
              onTermSubmit={this.onTermSubmit}
            />
          </View>
          <ScrollView style={styles.listSection}>
            {filteredList.map((item, index) => {
              return <Card key={index} item={item} editItem={this.editItem} />;
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
    backgroundColor: "#ffffff"
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
    paddingTop: 20
    // flex: 1,
    // marginTop: 40
  }
});

const mapStateToProps = state => {
  const { isLoading, isError, hospitalList, errorDetail } = state.hospitalReducer;
  return {
    isLoading,
    isError,
    hospitalList,
    errorDetail
  };
};

export default connect(
  mapStateToProps,
  { getHospitalList }
)(HospitalList);
