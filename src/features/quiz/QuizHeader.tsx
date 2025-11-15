import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, rightImage, home }: any) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                {!home && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                )}

                <Text style={styles.title}>{title ?? "Back"}</Text>
            </View>

            {rightImage && (
                <View>
                    <Image
                        source={
                            rightImage ?? require("../../assets/images/imoji/animoji.png")
                        }
                        style={styles.rightImage}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        height: 50,
        width: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 10,
    },

    rightImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
    },
});

export default Header;
