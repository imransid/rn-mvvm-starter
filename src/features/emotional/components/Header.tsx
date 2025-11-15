import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../assets/lib";

const Header = ({ title, home }: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.titleText}>{title ?? "Back"}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Emotional")}
          style={[
            styles.iconButton,
            { backgroundColor: home ? colors.primaryButton : "white" },
          ]}
        >
          <Feather name="align-justify" size={24} color={home ? "white" : "black"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EmotionalSchedule")}
          style={[
            styles.iconButton,
            { backgroundColor: !home ? colors.primaryButton : "white" },
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={!home ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 48,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 7,
    color: "#000",
  },
  rightWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 4,
    borderRadius: 999,
    alignItems: "center",
  },
  iconButton: {
    height: 42,
    width: 42,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
});
