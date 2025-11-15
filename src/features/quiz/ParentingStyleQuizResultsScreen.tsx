/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import HalfCircleProgress from "./HalfCircleProgressBar";
import Header from "./CustomHeaderResult";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../app/store";

const ParentingStyleQuizResultsScreen = () => {
    const navigation = useNavigation<any>();
    const result_state = useSelector((state: RootState) => state.root.quiz.result);

    const onPressButton = () => {
        console.log("Explore Recommendations Pressed");
        navigation.navigate("Treasures"); // replace with your screen name
    };



    console.log('  {result_state?.results?.[0]?.suggestion}', result_state.results[0])

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <Header title="" home={false} />

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {/* Header */}
                <View style={styles.notificationHeader}>
                    <Image
                        source={require("../../assets/images/login/notifi.png")}
                        style={styles.notificationImage}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.notificationText}>
                            Here’s what I’ve learned to better support you
                        </Text>
                    </View>
                </View>

                {/* Results Title */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.resultsTitle}>
                        Your Results: Parenting Style Quiz
                    </Text>
                    <Text style={{ paddingVertical: 8 }}>Completed on June 15, 2023</Text>
                </View>

                {/* Progress Card */}
                <View style={{ marginBottom: 20 }}>
                    <View style={styles.progressCard}>
                        <Text style={styles.progressCardTitle}>Great Progress!</Text>
                        <Text style={styles.progressCardText}>
                            You have a strong foundation in open communication and emotional
                            awareness. {"Let's"} explore your strengths and growth areas!
                        </Text>
                        <HalfCircleProgress progress={result_state.results[0]?.score / 100} />
                    </View>
                </View>

                {/* Interpretation */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Interpretation</Text>
                    <View style={styles.card}>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={styles.cardText}>{result_state.results[0]?.interpretation}</Text>
                        </View>
                    </View>
                </View>

                {/* Suggestion */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Suggestion</Text>
                    <View style={styles.card}>
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={styles.cardText}>{result_state.results[0]?.suggestion}</Text>
                        </View>
                    </View>
                </View>

                {/* Buttons */}
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Save Results</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressButton} style={styles.button}>
                        <Text style={styles.buttonText}>Explore Recommendations</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    notificationHeader: {
        backgroundColor: "#1E3A8A", // estonBlue_bg color
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    notificationImage: {
        width: 60,
        height: 60,
    },
    notificationText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
        width: "80%",
    },
    resultsTitle: {
        fontSize: 30,
        fontWeight: "600",
    },
    progressCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
    },
    progressCardTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    progressCardText: {
        fontSize: 14,
        color: "#4B5563",
        marginVertical: 8,
        lineHeight: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: "#4B5563",
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        borderColor: "#ddd",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
});

export default ParentingStyleQuizResultsScreen;
