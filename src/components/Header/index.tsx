import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
type HeaderProps = {
    title?: string;
    rightImage?: any;
};

const Header: React.FC<HeaderProps> = ({ title = "Back", rightImage }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Left Section */}
            <View style={styles.leftSection}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={22} color="black" />
                </TouchableOpacity>

                <Text style={styles.titleText}>{title}</Text>
            </View>

            {/* Right Image */}
            {rightImage && (
                <Image
                    style={styles.rightImage}
                    source={
                        typeof rightImage === "number"
                            ? rightImage
                            : { uri: rightImage }
                    }
                    resizeMode="cover"
                />
            )}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 48, // mt-12 (12 * 4)
        padding: 16, // p-4
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        height: 50,
        width: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // for Android shadow
    },
    titleText: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 8,
        color: "#000",
    },
    rightImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
    },
});
