import React from "react";
import { View, StyleSheet } from "react-native";
import ChildrenScroller from "../../home/ChildrenScroller";
import { colors } from "../../../assets/lib";

const Story = () => {
  return (
    <View style={styles.container}>
      <ChildrenScroller colors={colors} />
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 16,
    justifyContent: "flex-start",
    gap: 16, // works on newer RN versions; if not, use marginRight on children
  },
  addButtonWrapper: {
    alignItems: "center",
    marginRight: 16,
  },
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 4,
  },
});
