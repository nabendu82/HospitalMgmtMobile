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
import { patientList } from "../constants";
import Card from "../components/Card";
import { connect } from "react-redux";
import { getAllUsers } from "../actions/user";
import LoadingScreen from "../components/LoadingScreen";
import { Entypo } from "@expo/vector-icons";
import Header from "../components/Header";
import { debounce, filterByValue } from "../utils";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      isLoading: true,
      userList: [],
      filteredList: []
    };
  }
  componentDidMount() {
    // this.props.getAllPatients();
    this.props.getAllUsers();
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, userList } = nextProps;
    if (userList && userList.length) {
      this.setState({
        isLoading: false,
        userList,
        filteredList: userList
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
    const { term, userList } = this.state;
    let filteredList = this.state.filteredList;
    if (term && term.trim() && term.trim().length > 2) {
      filteredList = filterByValue(userList, term);
      this.setState({
        filteredList
      });
    } else {
      if (term.length <= 2) {
        this.setState({
          filteredList: userList
        });
      }
    }
  }, 500);
  onTermSubmit = () => {
    this.handleSearchEvent();
  };

  editItem = id => {
    this.props.navigation.navigate("UserDetail", {
      id,
      title: "Edit User",
      mode: "edit"
    });
  };
  viewItem = id => {
    this.props.navigation.navigate("UserDetail", {
      id,
      title: "View User",
      mode: "view"
    });
  };
  // deleteItem = id => {
  //   console.log("delete ", id);
  //   // this.props.deleteUser(id, this);
  // };
  render() {
    const { term, isLoading, userList, filteredList } = this.state;
    if (isLoading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Header title="User List" {...this.props} />
          <View style={styles.searchBarArea}>
            <SearchBar
              term={term}
              onTermChange={this.onTermChange}
              onTermSubmit={this.onTermSubmit}
            />
          </View>
          <ScrollView style={styles.listSection}>
            {filteredList.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  editItem={this.editItem}
                  viewItem={this.viewItem}
                  isDisabled={true}
                  // deleteItem={this.deleteItem}
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
  const { isLoading, isError, userList, errorDetail } = state.userReducer;
  return {
    isLoading,
    isError,
    userList,
    errorDetail
  };
};

export default connect(
  mapStateToProps,
  { getAllUsers }
)(EmployeeList);
