import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Header from "../../components/Header/";
import { colors } from "../../assets/lib";

const ComingSoonScreen = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            style={styles.bg}
            resizeMode="cover"
        >
            <Header title="Feature Coming Soon" />
            <View style={styles.container}>
                <Text style={styles.title}>🚀 Coming Soon!</Text>
                <Text style={styles.subtitle}>
                    We're working hard to bring this feature to you. Stay tuned for
                    updates!
                </Text>
                <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconText}>⌛</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.primaryButton,
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 32,
    },
    iconPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#e0f7f4",
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        fontSize: 48,
        color: colors.primaryButton,
    },
});

export default ComingSoonScreen;
