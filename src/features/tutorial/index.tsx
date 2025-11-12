import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { colors } from "../../assets/lib";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import Header from "./Header";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Index: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <ImageBackground
            source={require("../../assets/images/bg/greenshadow.png")}
            resizeMode="cover"
            style={styles.background}
        >
            {/* Replace your Header component if needed */}
            <View style={styles.header}>
                <Header elementNo={1} />
                {/* <Text style={styles.headerText}>Header Placeholder</Text> */}
            </View>

            <View style={styles.content}>
                <Image
                    style={styles.tutorialImage}
                    source={require("../../assets/images/tutorial/1.png")}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Welcome to Your {"Family's"} Well-being Companion!
                    </Text>
                    <Text style={styles.description}>
                        ZenFamy helps you nurture your {"child's"} emotional intelligence
                        through personalized stories, reflective journaling, and engaging
                        activities.
                    </Text>
                </View>

                <Button
                    name="Get Started"
                    textColor="#fff"
                    bgColor={colors.primaryButton}
                    onclick={() => navigation.navigate("TutorialStep1")} // Replace with your RN CLI route
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 16,
        height: 60,
        justifyContent: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    tutorialImage: {
        marginTop: 80,
        width: 250,
        height: 250,
        resizeMode: "contain",
    },
    textContainer: {
        marginVertical: 24,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 13,
        color: "#414651",
        textAlign: "center",
        marginTop: 8,
        paddingBottom: 40,
    },
});

export default Index;
