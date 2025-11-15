import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
    title?: string;
    rightImage?: any; // Can be a local require() or remote URI
    home?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, rightImage, home }) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleText}>{title ?? "Back"}</Text>
            </View>

            {rightImage && (
                <View>
                    <Image
                        source={rightImage ?? require("../../assets/images/imoji/animoji.png")}
                        style={styles.avatar}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 48, // mt-12
        padding: 16,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontSize: 22,
        fontWeight: "600",
        marginLeft: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
    },
});

export default Header;
