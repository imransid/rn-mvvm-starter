import React from "react";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import Button from "../../components/Button"; // RN CLI path
import Header from "./Header"; // RN CLI path
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";
import { colors } from "../../assets/lib";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Tutorial4: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <Header elementNo={4} />

            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/tutorial/4.png")}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Discover Insights & Get Recommendations
                    </Text>
                    <Text style={styles.description}>
                        Engage with fun quizzes to learn more about your {"child's"} development and receive personalized recommendations for activities and content.
                    </Text>
                </View>

                <Button
                    name="Next"
                    textColor="#fff"
                    bgColor={colors.primaryButton}
                    onclick={() => navigation.navigate("TutorialStep4")} // Adjust navigation route as needed
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    image: {
        marginTop: 80,
        width: 250,
        height: 250,
    },
    textContainer: {
        marginVertical: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#414651",
        textAlign: "center",
        marginTop: 8,
    },
});

export default Tutorial4;
