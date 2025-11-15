import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../assets/lib";

interface ProgressProps {
    totalQuestions: number;
    currentIndex: number;
}

const QuizProgress = ({ totalQuestions, currentIndex }: ProgressProps) => {
    return (
        <View style={styles.progressRow}>
            {/* Progress bars */}
            <View style={styles.progressBarContainer}>
                {Array.from({ length: totalQuestions }).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.progressItem,
                            {
                                backgroundColor:
                                    index < currentIndex + 1
                                        ? colors.primaryTextColor // completed
                                        : "#fff", // not completed
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Current question number */}
            <Text style={styles.progressText}>
                {currentIndex + 1}/{totalQuestions}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    progressBarContainer: {
        flexDirection: "row",
        flex: 1,
        gap: 4, // spacing between bars
    },
    progressItem: {
        flex: 1,
        height: 6,
        borderRadius: 3,
    },
    progressText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: "500",
        color: "#000",
    },
});

export default QuizProgress;
