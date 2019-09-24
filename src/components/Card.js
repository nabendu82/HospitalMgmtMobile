import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Swipeout from "react-native-swipeout";


const Card = ({ item, editItem, deleteItem, viewItem, isDisabled }) => {
  let swipeBtns = [
    {
      // text: "Delete",
      component: (
        <View style={styles.deleteSwipeView}>
          <MaterialIcons
            style={styles.deleteIcon}
            name="delete-forever"
            size={50}
            color="white"
          />
        </View>
      ),
      backgroundColor: "#ff7e02",
      underlayColor: "#ff7e02",
      type: "delete",
      onPress: () => {
        deleteItem(item._id);
      }
    }
  ];
  return (
    <Swipeout
      right={swipeBtns}
      autoClose={true}
      backgroundColor="transparent"
      disabled={isDisabled ? isDisabled : false}
    >
      <View style={[{ height: true ? 81 : "auto" }, styles.cardContainer]}>
        <View style={styles.headingContainer}>
          <View style={styles.headingTextContainer}>
            <Text allowFontScaling={false} style={[styles.typeText]}>
              {item.name || ""}
            </Text>
            <Text allowFontScaling={false} style={styles.typeText}>
              {item.hospital || ""}
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "flex-end", padding: 3 }}
            onPress={() => editItem(item._id)}
          >
            <MaterialIcons name="edit" style={styles.iconStyle} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={{ fontSize: 15, color: "#000" }}
            allowFontScaling={false}
            numberOfLines={true ? 1 : null}
          >
            {item.patientstatus}
          </Text>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "flex-end", padding: 2 }}
            onPress={() => viewItem(item._id)}
          >
            <Entypo name="eye" style={styles.iconStyle} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  unreadBorder: {
    borderLeftColor: "#78B9E7",
    borderLeftWidth: 2
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5
  },
  headingContainer: {
    marginBottom: 16,
    height: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    width: 25,
    height: 25
  },
  headingTextContainer: {
    // flex: 7,
    // flexDirection: "row"
  },
  typeText: {
    fontSize: 17,
    color: "#000"
  },
  iconStyle: {},
  deleteIcon: {
    alignSelf: "center"
  },
  deleteSwipeView: {
    flex: 1, 
    justifyContent:"center", 
    alignContent:"center"
  }
});

export default Card;
