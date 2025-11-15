import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Quiz = () => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { borderRadius: 22 }]}>
            {/* Status */}
            <View style={styles.statusWrapper}>
                <View style={styles.statusBox}>
                    <Text style={styles.statusText}>In Progress</Text>
                </View>
            </View>

            {/* Title & Progress */}
            <View>
                <Text style={styles.title}>Understanding Your Child's Strengths</Text>
                <Text style={styles.subText}>Resume from Question 5</Text>

                <View style={styles.progressBarBg}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>

            <View style={{ height: 30 }} />

            {/* Button */}
            <View style={styles.buttonWrapper}>
                <View style={styles.buttonUnderlay} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("QuizHome" as never)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>View All Quizzes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Quiz;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },

    statusWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingBottom: 10,
    },

    statusBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: "#1aa7a93d",
        borderWidth: 1,
        borderColor: "#D5D7DA",
        borderRadius: 50,
    },

    statusText: {
        fontSize: 14,
        color: "#1AA7A9",
    },

    title: {
        fontSize: 18,
        color: "#0A0D12",
        fontWeight: "500",
        marginBottom: 10,
    },

    subText: {
        color: "#697077",
        marginBottom: 10,
    },

    progressBarBg: {
        height: 6,
        backgroundColor: "#D1D1D1",
        borderRadius: 50,
        overflow: "hidden",
    },

    progressBarFill: {
        width: "50%",
        height: "100%",
        backgroundColor: "#1AA7A9",
        borderRadius: 50,
    },

    buttonWrapper: {
        width: "100%",
        maxWidth: 400,
        position: "relative",
    },

    buttonUnderlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        backgroundColor: "#EB796D",
        borderRadius: 35,
    },

    button: {
        backgroundColor: "#F4978E",
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 35,
        alignItems: "center",
        position: "relative",
        top: -4,
        width: "100%",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.3,
    },
});
